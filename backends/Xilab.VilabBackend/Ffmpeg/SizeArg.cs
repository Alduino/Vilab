using System.Collections.Generic;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class SizeArg : IFfmpegArg
    {
        public int Width;
        public int Height;
        
        public IEnumerable<string> Generate() => new[]
        {
            "-s",
            $"{Width}x{Height}"
        };
    }
}