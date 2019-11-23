using Newtonsoft.Json;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class FfprobeFormatTags
    {
        [JsonProperty("major_brand")] public string MajorBrand { get; set; }
        [JsonProperty("minor_version")] public string MinorVersion { get; set; }
        [JsonProperty("compatible_brands")] public string CompatibleBrands { get; set; }
        [JsonProperty("creation_time")] public string CreationTime { get; set; }
        [JsonProperty("encoder")] public string Encoder { get; set; }
    }
}