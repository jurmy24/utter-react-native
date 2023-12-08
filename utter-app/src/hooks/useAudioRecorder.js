import { useState, useEffect } from "react";
import { Audio } from "expo-av";

const useAudioRecorder = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync(); // Request audio recording permissions
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordedUri(uri); // Save the recorded file's URI
    setRecording(null);
    return uri; // return the uri directly
  };

  return { isRecording, startRecording, stopRecording, recordedUri };
};

export default useAudioRecorder;
