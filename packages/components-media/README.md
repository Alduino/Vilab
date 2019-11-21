# `@xilab/components-media`

> React media components

## VideoPlayer

All-in-one video player. Set and forget.

To set the source and subtitles, use the HTML `source` and `track` elements.

### Props

-   `width: string | number`: The width of the video player
-   `height: string | number`: The height of the video player. Note that the size is currently not automatically calculated from the video aspect ratio.

### Example

```tsx
<VideoPlayer width={1280} height={720}>
    <source src="my-video.mp4" />
    <track src="my-video.subtitles.vtt" />
</VideoPlayer>
```
## Audio and Video

These are React components that directly wrap and “reactify” the HTML `audio` and `video` elements.

### Props

-   `time: number`: The current percentage through the media item
-   `volume: number`: The percentage volume for the media item
-   `playing: number`: Specifies whether or not the media item is currently playing. True will play and false will pause.
-   `onSeek(time: number)`: Triggered when the time in the video changes. Parameter is the current percentage through the media item.
-   `onPlay()`: Triggered when the media plays.
-   `onPause()`: Triggered when the media pauses.
-   `onVolumeChange(volume: number)`: Triggered when the volume changes. Parameter is the volume percentage.
-   `onDataLoaded(amounts: DataLoadSection[])`: Triggered when the load amount has changed. Each value in the parameter contains a `start` and `end` key, both of which contain a percentage of the way through the media item.
-   `onDurationLoaded(duration: number)`: Triggered when the media’s length has been found out. Parameter is the duration of the media in seconds.

### Example

Supply source and track files as children using the built-in HTML elements.

```tsx
<Video time={.5} volume={1} playing={true}>
    <source src="my-video.mp4" />
    <track src="my-video.subtitles.vtt" />
</Video>
```

### Remarks

You shouldn’t change the `time` property on this component unless you want to seek the media - the following would make the media stutter, as it will seek it whenever the time changes:

```tsx
const [time, setTime] = useState(0);
// ...
<Video ... time={time} onSeek={setTime} />
```

Instead, you will need to use a different state for the real media time, if you want a seek bar:

```tsx
const [time, setTime] = useState(0);
const [overrideTime, setOverrideTime] = useState(time);

<Video ... time={overrideTime} onSeek={setTime} />
<SeekBar ... currentTime={time} onSeek={val => { setTime(val); setOverrideTime(val); }}
```

## MediaControlPanel

This component includes different controls for media elements, currently including a play/pause button and a volume slider.

### Props

-   `playing: boolean`: Set this to the current playing state of the media

-   `volume: number`: Volume percentage of the media.

    *Remarks*: This value’s range is between -1 and 1. The reason for this is that we can specify when the audio is muted by using a negative value. This makes calculations extremely simple, as we can use `max(0, vol)` to find the real volume, `abs(vol)` to find what volume should be displayed on a slider, and `vol = -vol` to toggle whether audio is muted. Helper methods, `getRealVolume(vol)`, `getDisplayVolume(vol)` and `invertVolumeState(vol)` have been provided also to find these values.

-   `onPlay()`: Triggered when the play button is pressed

-   `onPause()`: Triggered when the pause button is pressed

-   `onVolumeChanged(volume: number)`: Triggered when the volume changes. See the above `volume` dot point for information about the parameter.

### Example

```tsx
const [volume, setVolume] = useState(1);
<MediaControlPanel playing={true} volume={volume} onVolumeChange={setVolume} />
```

### Remarks

This component does not have an internal state, so by default it acts as if it is readonly. Instead the component expects that the parent will listen to its events and set the required properties. This fixes many problems with desynchronisation between components that would happen if we kept our own state, as there is just one source instead of multiple.

## PopupIcon

When the `icon` prop is changed, the new icon will pop up in the centre of this element then fade away.

### Props

-   `icon: ComponentType<StyledIconProps>`: A new StyledIcon to pop up

#### CSS properties

-   `font-size`: Sets the size of the icon

### Remarks

The icon colour is always the current theme’s `shade.grey(Values.xxdark)` and the background is always the theme’s `shade.light` with 50% alpha.

The component by default takes up 100% of its parent element’s width and height, and is a block-level element. Do not change its CSS `position` property to anything other than `relative`, as this will break the component.

## SeekBar

Acts similarly to the form slider component, however it’s targeted towards media and includes support for displaying load sections.

### Props

-   `loadSections: DataLoadSection[]`: A list of sections of the media that have been loaded
-   `duration: number`: The length of the media in seconds
-   `currentTime: number`: The current time through the media, between 0 and 1
-   `onSeek(time: number)`: Triggered when the user seeks through the media. Parameter is the new time, between 0 and 1

#### CSS properties

-   `font-size`: Sets the height of the seek bar
-   `color`: Sets the colour of the dot on the seek bar

### Example

```tsx
const [time, setTime] = useState(0);
const [videoOverrideTime, setVideoOverrideTime] = useState(time);
const [loadTimes, setLoadTimes] = useState<DataLoadSection[]>([]);
const [duration, setDuration] = useState(0);
<Video time={videoOverrideTime} volume={1} onDataLoaded={setLoadTimes} onDurationLoaded={setDuration} />
<SeekBar duration={duration} loadSections={loadTimes} currentTime={time} onSeek={setVideoOverrideTime} />
```

### Remarks

This component does not store its own state, so you will need to listen to its events and update its properties (hooks are recommended) otherwise it will act as if it is readonly.