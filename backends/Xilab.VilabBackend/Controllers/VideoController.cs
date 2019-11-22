using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        
        private readonly ILogger<VideoController> _logger;
        private readonly IDatabaseService _db;

        private readonly List<UploadItem> _uploadItems = new List<UploadItem>();

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
        public async Task<Video> Get(uint id)
        {
            _logger.LogDebug("Get video from database");
            var video = await Video.GetVideo(_db.Database, id);
            _logger.LogDebug($"Video is {video.Title}");

            return video;
        }

        [HttpPost]
        [Route("api/[controller]")]
        public async Task<UploadItem> Post([FromBody] Video video)
        {
            var uploadItem = new UploadItem
            {
                Video = video
            };
            _uploadItems.Add(uploadItem);
            return uploadItem;
        }

        [HttpPost]
        [Route("api/[controller]/{id}/content")]
        public async Task UploadPost(uint id)
        {
            var item = _uploadItems.First(el => el.Video.Id == id);
            _uploadItems.Remove(item);
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            Console.WriteLine(body);
        }
    }
}