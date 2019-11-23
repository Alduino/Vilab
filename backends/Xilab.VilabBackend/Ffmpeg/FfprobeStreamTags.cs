using Newtonsoft.Json;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class FfprobeStreamTags
    {
        [JsonProperty("creation_time")] public string CreationTime { get; set; }
        [JsonProperty("language")] public string Language { get; set; }
        [JsonProperty("handler_name")] public string HandlerName { get; set; }
    }
}