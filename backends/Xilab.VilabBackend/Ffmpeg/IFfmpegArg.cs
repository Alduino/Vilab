using System.Collections.Generic;

namespace Xilab.VilabBackend.Ffmpeg
{
    public interface IFfmpegArg
    {
        IEnumerable<string> Generate();
    }
}