using System.Text.Json.Serialization;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Xilab.VilabBackend.Models
{
    public class Video
    {
        public static IMongoCollection<Video> GetCollection(IMongoDatabase db) =>
            db.GetCollection<Video>("Videos");

        public static Task<Video> GetVideo(IMongoDatabase db, uint id) =>
            GetCollection(db).Find(vid => vid.Id == id).FirstAsync();
        
        [JsonPropertyName("id")] public uint Id { get; set; }
        [JsonPropertyName("title")] public string Title { get; set; }
        [JsonPropertyName("description")] public string Description { get; set; }
    }
}