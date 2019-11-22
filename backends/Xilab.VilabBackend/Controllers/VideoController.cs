using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
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
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
        }
    }
}