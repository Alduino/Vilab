namespace Xilab.VilabBackend.Ffmpeg
{
    public static class Util
    {
        public static ulong GreatestCommonDivisor(ulong a, ulong b)
        {
            while (a != 0 && b != 0)
            {
                if (a > b) a %= b;
                else b %= a;
            }

            return a == 0 ? b : a;
        }
    }
}