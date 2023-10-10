import { PauseCircle, PlayCircle } from "@phosphor-icons/react";
import React from "react";
import WaveSurfer from "wavesurfer.js";

const options = {
  height: 50,
  /** Render each audio channel as a separate waveform */
  splitChannels: undefined,
  /** Stretch the waveform to the full height */
  normalize: true,
  /** The color of the waveform */
  waveColor: "#1100ff",
  /** The color of the progress mask */
  progressColor: "#5f85dd",
  /** The color of the playpack cursor */
  cursorColor: "#4232b8",
  /** The cursor width */
  cursorWidth: 2,
  /** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
  barWidth: 5,
  /** Spacing between bars in pixels */
  barGap: 5,
  /** Rounded borders for bars */
  barRadius: 20,
  /** A vertical scaling factor for the waveform */
  barHeight: 1,
  /** Vertical bar alignment **/
  barAlign: undefined,
  /** Minimum pixels per second of audio (i.e. zoom level) */
  minPxPerSec: 1,
  /** Stretch the waveform to fill the container, true by default */
  fillParent: true,
  /** Whether to show default audio element controls */
  mediaControls: false,
  /** Play the audio on load */
  autoplay: false,
  /** Pass false to disable clicks on the waveform */
  interact: true,
  /** Allow to drag the cursor to seek to a new position */
  dragToSeek: false,
  /** Hide the scrollbar */
  hideScrollbar: false,
  /** Audio rate */
  audioRate: 1,
  /** Automatically scroll the container to keep the current position in viewport */
  autoScroll: true,
  /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
  autoCenter: true,
  /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
  sampleRate: 8000,
  // url: assets.audios.audio1,
};
const AudioSoundMessage = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const playButtonRef = React.useRef<HTMLButtonElement>(null);
  const waveformRef = React.useRef<HTMLDivElement>(null);

  const waveSurfer = React.useRef<WaveSurfer | undefined>();

  React.useEffect(() => {
    if (waveformRef.current) {
      waveSurfer.current = WaveSurfer.create({
        ...options,
        container: waveformRef.current,
        url: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
      });
      waveSurfer.current.on("play", () => {
        setIsPlaying(true);
      });
      waveSurfer.current.on("pause", () => {
        setIsPlaying(false);
      });

      return () => {
        waveSurfer.current?.destroy();
      };
    }
  }, []);

  // set up waveSurfer
  const handlePlayButtonClick = (): void => {
    if (waveSurfer.current) {
      if (isPlaying) {
        waveSurfer.current.pause();
      } else {
        waveSurfer.current.play();
      }
    }
  };
  return (
    <div className="message-void p-2.5 flex flex-col bg-blue-100 gap-2.5 rounded-md">
      <div className="flex gap-2 justify-between items-center">
        <button
          ref={playButtonRef}
          onClick={handlePlayButtonClick}
          className="text-blue-600"
        >
          {isPlaying ? (
            <PauseCircle size={35} weight="fill" />
          ) : (
            <PlayCircle size={35} weight="fill" />
          )}
        </button>
        {/* <PlayCircle size={35} className="text-blue-600" weight="fill" /> */}
        <div className="w-[300px]" ref={waveformRef}></div>
        <p className="text-base font-normal text-blue-600 ">02:41</p>
      </div>
      <h5 className="flex text-base font-normal px-2.5 text-ellipsis overflow-hidden">
        Take my True Love by Te...
      </h5>
      <div className="flex justify-between px-2.5">
        <p className="text-base font-normal text-gray-600">The Limeleter</p>
        <p className="text-base font-normal text-gray-600">8.4MB</p>
      </div>
    </div>
  );
};

export default AudioSoundMessage;
