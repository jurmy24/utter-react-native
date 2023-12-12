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
    // Check if there is an existing recording
    try {
      // console.log(recording);
      if (recording) {
        // Stop the existing recording
        await stopRecording();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      // const { newRecording } = await Audio.Recording.createAsync(
      //   Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      // );
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setIsRecording(true);
      setRecording(newRecording);
    } catch (error) {
      console.error("(useAudioRecorder) StartRecording: ", error);
    }
  };

  const stopRecording = async () => {
    let uri = null;
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        uri = recording.getURI(); // Get the URI before setting the recording to null
        setRecordedUri(uri); // Save the recorded file's URI
        setRecording(null);
        setIsRecording(false);
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
    }
    return uri; // Return the URI
  };
  return { isRecording, startRecording, stopRecording, recordedUri };
};

export default useAudioRecorder;
