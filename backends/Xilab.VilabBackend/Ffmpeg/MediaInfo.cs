namespace Xilab.VilabBackend.Ffmpeg
{
    public struct MediaInfo
    {
        public string Path;
        public int Frames;
        public (int width, int height) Size;
        public (int width, int height) AspectRatio;

        public (int width, int height) CalculateSizeFromRatio(int height) =>
            ((int) ((float) height / AspectRatio.height * AspectRatio.width), height);
    }
}