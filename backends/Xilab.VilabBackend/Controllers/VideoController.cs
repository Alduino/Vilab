using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using MediaToolkit;
using MediaToolkit.Model;
using MediaToolkit.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using Xilab.VilabBackend.Models;

namespace Xilab.VilabBackend.Controllers
{
    [ApiController]
    public class VideoController : ControllerBase
    {
        public struct UploadItem
        {
            [JsonPropertyName("video")] public Video Video { get; set; }
            [JsonPropertyName("uploadUrl")] public string Url => $"/api/video/{Video.Id}/content";
        }

        private static readonly List<UploadItem> UploadItems = new List<UploadItem>();

        public static string GenerateVideoPath(string id) => $"Uploads/{id}";
        
        public static string GenerateVideoPath(string id, int resolution) =>
            $"{GenerateVideoPath(id)}_res/{resolution}";
        
        private readonly ILogger<VideoController> _logger;
        private readonly IDatabaseService _db;

        private string ComputeHash(int id)
        {
            var crypto = new MD5CryptoServiceProvider();
            var source = Encoding.UTF8.GetBytes(id.ToString());
            var hash = crypto.ComputeHash(source);
            return string.Join("", hash.Select(el => el.ToString("x2")));
        }

        public VideoController(ILogger<VideoController> logger, IDatabaseService db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public async Task<Video> Get(string id)
        {
            _logger.LogDebug("Get video from database");
            var video = await Video.GetVideo(_db.Database, ObjectId.Parse(id));
            _logger.LogDebug($"Video is {video.Title}");

            return video;
        }

        [HttpPost]
        [Route("api/[controller]")]
        public UploadItem Post([FromBody] Video video)
        {
            video.Id = ObjectId.GenerateNewId();
            var uploadItem = new UploadItem
            {
                Video = video
            };
            
            UploadItems.Add(uploadItem);
            
            return uploadItem;
        }

        [HttpPost]
        [Route("api/[controller]/{id}/content")]
        public async Task UploadPost(string id)
        {
            var item = UploadItems.First(el => el.Video.IdString == id);
            UploadItems.Remove(item);
            
            // write stream to a file so we can use it with ffmpeg
            var inputPath = GenerateVideoPath(id);
            await using var fileStream = System.IO.File.Create(inputPath);
            await Request.Body.CopyToAsync(fileStream);

            // TODO find this out some other way
            using var engine = new Engine(@"C:\Program Files (x86)\Ffmpeg for Audacity\ffmpeg.exe");
            var inputFile = new MediaFile {Filename = inputPath};

            var resolutions = new Dictionary<int, VideoSize>
            {
                {480, VideoSize.Hd480},
                {720, VideoSize.Hd720},
                {1080, VideoSize.Hd1080}
            };
            
            foreach (var (resolution, videoSize) in resolutions)
            {
                var outputFile = new MediaFile {Filename = GenerateVideoPath(id, resolution) + ".mp4"};
                _logger.LogDebug($"Generating video at {outputFile.Filename}");
                var options = new ConversionOptions
                {
                    VideoSize = videoSize
                };
                engine.Convert(inputFile, outputFile, options);
                _logger.LogInformation($"Done generating {resolution}p video file");
            }
        }
    }
}