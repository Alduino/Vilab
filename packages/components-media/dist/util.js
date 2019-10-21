"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMediaListeners(props, ref) {
    return {
        seeking: function (event) {
            if (ref.current === null)
                return;
            var time = ref.current.currentTime / ref.current.duration;
            if (props.onSeek && !props.onSeek(time) !== false)
                event.preventDefault();
        },
        timeupdate: function (event) {
            if (ref.current === null)
                return;
            var time = ref.current.currentTime / ref.current.duration;
            if (props.onSeek && !props.onSeek(time) !== false)
                event.preventDefault();
        },
        play: function (event) {
            if (props.onPlay && !props.onPlay() !== false)
                event.preventDefault();
        },
        pause: function (event) {
            if (props.onPause && !props.onPause() !== false)
                event.preventDefault();
        },
        end: function (event) {
            if (props.onEnd)
                props.onEnd();
        },
        volumeChange: function (event) {
            if (ref.current === null)
                return;
            if (props.onVolumeChange && !props.onVolumeChange(ref.current.volume) !== false)
                event.preventDefault();
        },
        progress: function (event) {
            if (ref.current === null)
                return;
            var progresses = [];
            for (var i = 0; i < ref.current.buffered.length; i++) {
                progresses.push({
                    start: ref.current.buffered.start(i) / ref.current.duration,
                    end: ref.current.buffered.end(i) / ref.current.duration
                });
            }
            if (props.onDataLoaded)
                props.onDataLoaded(progresses);
        }
    };
}
exports.getMediaListeners = getMediaListeners;
function addMediaListeners(props, ref, metadataLoaded) {
    return function () {
        // make typescript happy
        if (ref.current === null)
            return function () { };
        var listeners = getMediaListeners(props, ref);
        for (var listener in listeners) {
            if (!listeners.hasOwnProperty(listener))
                continue;
            ref.current.addEventListener(listener, listeners[listener]);
        }
        ref.current.addEventListener("loadedmetadata", metadataLoaded);
        return function () {
            // make typescript happy
            if (ref.current === null)
                return;
            for (var listener in listeners) {
                if (!listeners.hasOwnProperty(listener))
                    continue;
                ref.current.removeEventListener(listener, listeners[listener]);
            }
            ref.current.removeEventListener("loadedmetadata", metadataLoaded);
        };
    };
}
exports.addMediaListeners = addMediaListeners;
function sizeToString(size) {
    if (typeof size === "string")
        return size;
    return size + "px";
}
exports.sizeToString = sizeToString;
//# sourceMappingURL=util.js.map