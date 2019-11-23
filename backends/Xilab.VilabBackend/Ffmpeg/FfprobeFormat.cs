﻿using Newtonsoft.Json;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class FfprobeFormat
    {
        [JsonProperty("filename")] public string Filename { get; set; }
        [JsonProperty("nb_streams")] public int StreamCount { get; set; }
        [JsonProperty("nb_programs")] public int ProgramCount { get; set; }
        [JsonProperty("format_name")] public string FormatName { get; set; }
        [JsonProperty("format_long_name")] public string FormatLongName { get; set; }
        [JsonProperty("start_time")] public string StartTime { get; set; }
        [JsonProperty("duration")] public string Duration { get; set; }
        [JsonProperty("size")] public string Size { get; set; }
        [JsonProperty("bit_rate")] public string BitRate { get; set; }
        [JsonProperty("probe_score")] public int ProbeScore { get; set; }
        [JsonProperty("tags")] public FfprobeFormatTags Tags { get; set; }
    }
}