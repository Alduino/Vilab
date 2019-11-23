using System.Collections.Generic;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class HeightArg : IFfmpegArg
    {
        public int Height;
        
        public IEnumerable<string> Generate() => new[]
        {
            "-vf",
            $"scale=-2:{Height}"
        };
    }
}