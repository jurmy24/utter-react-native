import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import base64 from "react-native-base64";

const handleAudioResponse = async (audioData) => {
    // State to keep track of the currently playing sound
    const [currentSound, setCurrentSound] = useState(null);

      // Convert the audio stream to a base64 string
      const base64Audio = base64.encodeFromByteArray(
        new Uint8Array(audioData.data)
      );

      // Handle the audio stream returned from the server
      const audioFilePath = `${
        FileSystem.documentDirectory
      }${new Date().getTime()}.mp3`;

      await FileSystem.writeAsStringAsync(audioFilePath, base64Audio, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return audioFilePath;
    }

  const playAudio = async (filePath) => {
    try {
      // Set the audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });

      // Creating and playing the sound
      const { sound } = await Audio.Sound.createAsync({ uri: filePath });
      setCurrentSound(sound); // Store the sound object
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          // Audio playback finished
          await sound.unloadAsync();
          await FileSystem.deleteAsync(filePath);

          // Reset to a default audio mode
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true, // or false, depending on your app's needs
            playsInSilentModeIOS: true,
            staysActiveInBackground: true, // or false, based on your preference
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
            // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          });
        }
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const stopAudio = async () => {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
          setCurrentSound(null); // Reset the sound object
        }
      }
    } catch (error) {
      console.error("Error stopping audio:", error);
    }
  };




export default {handleAudioResponse, playAudio, stopAudio}
