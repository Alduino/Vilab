using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Xilab.VilabBackend.Ffmpeg
{
    public class FfmpegEngine
    {
        [Flags]
        public enum FfprobeShow
        {
            Format,
            Streams,
        }
        
        private readonly string _exeExtension;
        
        public string Directory { get; }
        public string FfmpegPath => Path.GetFullPath(Path.Combine(Directory, "ffmpeg" + _exeExtension));
        public string FfprobePath => Path.GetFullPath(Path.Combine(Directory, "ffprobe" + _exeExtension));

        private string Quotify(string path) => '"' + path.Replace("\"", "\\\"") + '"';

        private Task<string> LaunchProcess(string path, string[] args)
        {
            var process = new Process
            {
                StartInfo =
                {
                    FileName = path,
                    Arguments = string.Join(' ', args),
                    RedirectStandardOutput = true,
                    RedirectStandardInput = true,
                    CreateNoWindow = false
                }
            };
            Console.Write(process.StartInfo.FileName);
            Console.Write(" ");
            Console.WriteLine(process.StartInfo.Arguments);
            process.Start();
            
            return process.StandardOutput.ReadToEndAsync();
        }
        
        public FfmpegEngine(string directory, string exeExtension = ".exe")
        {
            _exeExtension = exeExtension;
            Directory = directory;
        }

        public Task<Media> GetMedia(string path) => Media.Create(this, path);

        public async Task<FfprobeResult> LaunchFfprobe(FfprobeShow show, string file)
        {
            var args = new List<string> {"-v", "error", "-print_format", "json"};
            if (show.HasFlag(FfprobeShow.Format)) args.Add("-show_format");
            if (show.HasFlag(FfprobeShow.Streams)) args.Add("-show_streams");
            args.Add(Quotify(file));

            var result = await LaunchProcess(FfprobePath, args.ToArray());
            return JsonConvert.DeserializeObject<FfprobeResult>(result);
        }

        public async Task LaunchFfmpeg(string input, string output, IFfmpegArg[] options)
        {
            var args = new List<string> {"-v", "error", "-i", Quotify(input)};
            foreach (var arg in options)
            {
                args.AddRange(arg.Generate());
            }
            args.Add(Quotify(output));

            await LaunchProcess(FfmpegPath, args.ToArray());
        }
    }
}