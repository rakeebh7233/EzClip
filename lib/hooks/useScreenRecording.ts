import { useState, useRef, useEffect } from "react"
import { createAudioMixer, getMediaStreams, setupRecording } from "../utils";

export const useScreenRecording = () => {
    const [state, setState] = useState<BunnyRecordingState>({
        isRecording: false,
        recordedBlob: null,
        recordedVideoUrl: "",
        recordingDuration: 0
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<ExtendedMediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const handleRecordingStop = () => {
        // const { blob, url }
    }

    const startRecording = async (withMic = true) => {
        try {
            stopRecording();

            const { displayStream, micStream, hasDisplayAudio } = await getMediaStreams(withMic);
            const combinedStream = new MediaStream() as ExtendedMediaStream;

            displayStream
                .getVideoTracks()
                .forEach((track: MediaStreamTrack) => combinedStream.addTrack(track));

            audioContextRef.current = new AudioContext();
            const audioDestination = createAudioMixer(
                audioContextRef.current,
                displayStream,
                micStream,
                hasDisplayAudio
            );

            audioDestination?.stream
                .getAudioTracks()
                .forEach((track: MediaStreamTrack) => combinedStream.addTrack(track));

            combinedStream._originalStreams = [
                displayStream,
                ...(micStream ? [micStream] : [])
            ];
            streamRef.current = combinedStream;

            mediaRecorderRef.current = setupRecording(combinedStream, {
                onDataAvailable: (e) => e.data.size && chunksRef.current.push(e.data),
                onStop: handleRecordingStop
            });

            chunksRef.current = [];
            startTimeRef.current = Date.now();
            mediaRecorderRef.current.start(1000);
            setState((prev) => ({ ...prev, isRecording: true }))
            return true;
        } catch (error) {
            console.error("Recording Error: ", error);
            return false
        }
    };

    const stopRecording = () => { }

    const resetRecording = () => { }
}