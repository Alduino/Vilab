using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using Xilab.VilabBackend.Ffmpeg;
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

        public static string GenerateVideoPath(string id) => Path.GetFullPath($"Uploads/{id}");

        public static string GenerateVideoDir(string id) => $"{GenerateVideoPath(id)}_res";
        
        public static string GenerateVideoPath(string id, int resolution) =>
            $"{GenerateVideoDir(id)}/{resolution}";
        
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
        [RequestSizeLimit(3_000_000_000)] // 3gb
        public async Task UploadPost(string id)
        {
            var item = UploadItems.First(el => el.Video.IdString == id);
            UploadItems.Remove(item);
            
            // write stream to a file so we can use it with ffmpeg
            var inputPath = GenerateVideoPath(id);
            await using (var fileStream = System.IO.File.Create(inputPath))
            {
                await Request.Body.CopyToAsync(fileStream);
            }

            Directory.CreateDirectory(GenerateVideoDir(id));

            var engine = new FfmpegEngine("bin/ffmpeg");
            
            var inputFile = await engine.GetMedia(inputPath);

            var resolutions = new[]
            {
                inputFile.Info.CalculateSizeFromRatio(360),
                inputFile.Info.CalculateSizeFromRatio(480),
                inputFile.Info.CalculateSizeFromRatio(720),
                inputFile.Info.CalculateSizeFromRatio(1080)
            };

            for (var i = 0; i < resolutions.Length; i++)
            {
                var resolution = resolutions[i];
                
                var outputFile = new MediaInfo
                {
                    Path = GenerateVideoPath(id, resolution.height) + ".mp4",
                    Size = resolution
                };

                await inputFile.ResizeHeight(outputFile, async frame =>
                {
                    var percentageComplete = (i + (float) frame / inputFile.Info.Frames) / resolutions.Length;
                    Console.WriteLine("Progress: {0}", percentageComplete);
                    var dataBuff =
                        Encoding.UTF8.GetBytes(percentageComplete.ToString(CultureInfo.InvariantCulture) + "\n");
                    await Response.Body.WriteAsync(dataBuff);
                    await Response.Body.FlushAsync();
                });
            }

            System.IO.File.Delete(inputPath);
        }
    }
}