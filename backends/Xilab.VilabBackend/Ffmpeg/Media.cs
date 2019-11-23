using System;
using System.Linq;
using System.Threading.Tasks;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class Media
    {
        internal static async Task<Media> Create(FfmpegEngine engine, string path)
        {
            var media = new Media(engine, path);
            await media.Load();
            return media;
        }

        private readonly FfmpegEngine _engine;
        
        public string Path { get; }
        public MediaInfo Info { get; private set; }

        private Media(FfmpegEngine engine, string path)
        {
            _engine = engine;
            Path = path;
        }

        private async Task Load()
        {
            var data = await _engine.LaunchFfprobe(FfmpegEngine.FfprobeShow.Streams, Path);

            if (data.Streams.Length != 2)
            {
                // TODO
                throw new InvalidOperationException("Cannot yet handle media that does not have one audio and one video stream");
            }
            
            var videoStream = data.Streams.First(it => it.CodecType == "video");
            var audioStream = data.Streams.First(it => it.CodecType == "audio");

            var aspectGcd = (int) Util.GreatestCommonDivisor((ulong) videoStream.Width, (ulong) videoStream.Height);
            var aspectRatio = (videoStream.Width / aspectGcd, videoStream.Height / aspectGcd);

            Info = new MediaInfo
            {
                Path = Path,
                Size = (videoStream.Width, videoStream.Height),
                AspectRatio = aspectRatio
            };
        }

        public Task Resize(MediaInfo to) => _engine.LaunchFfmpeg(Path, to.Path, new IFfmpegArg[]
        {
            new SizeArg {Width = to.Size.width, Height = to.Size.height}
        });

        public Task ResizeHeight(MediaInfo to) => _engine.LaunchFfmpeg(Path, to.Path, new IFfmpegArg[]
        {
            new HeightArg {Height = to.Size.height}
        });
    }
}