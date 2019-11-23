using Newtonsoft.Json;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class FfprobeResult
    {
        [JsonProperty("format")] public FfprobeFormat Format { get; set; }
        [JsonProperty("streams")] public FfprobeStream[] Streams { get; set; }
    }
}