using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Bson;
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

        private Task<string> LaunchProcess(string path, string[] args, Action<StreamReader, StreamReader, StreamWriter> cb = null)
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

            cb?.Invoke(process.StandardOutput, process.StandardError, process.StandardInput);

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

        public async Task LaunchFfmpeg(string input, string output, IFfmpegArg[] options, Action<int> progress)
        {
            var progressId = ObjectId.GenerateNewId();
            var progressFile = $"_prog_{progressId}.txt";
            var args = new List<string> {"-v", "error", "-i", Quotify(input), "-progress", progressFile};
            foreach (var arg in options)
            {
                args.AddRange(arg.Generate());
            }

            args.Add(Quotify(output));

            var processWaiter = LaunchProcess(FfmpegPath, args.ToArray());

            // wait until progressFile exists
            await Task.Run(() =>
            {
                while (true)
                {
                    if (File.Exists(progressFile)) return;
                }
            });

            await using (var progressReader = new FileStream(progressFile, FileMode.Open, FileAccess.Read, FileShare.ReadWrite)) {
                using var reader = new StreamReader(progressReader);

                await Task.Run(async () =>
                {
                    while (true)
                    {
                        if (processWaiter.IsCompleted) return;

                        await Task.Delay(200);

                        var line = await reader.ReadLineAsync();
                        if (line == null) continue;
                        if (line.Trim().Length == 0) continue;

                        var eqIdx = line.IndexOf('=');
                        var key = line.Substring(0, eqIdx).Trim();
                        var val = line.Substring(eqIdx + 1).Trim();

                        if (key == "frame") progress?.Invoke(int.Parse(val));
                    }
                });
            }

            File.Delete(progressFile);
        }
    }
}