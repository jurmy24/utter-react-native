import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import axios from "axios";
import base64 from "react-native-base64";

const useSpeechSynth = (chatbotId) => {
  const synthesizeText = async (text) => {
    try {
      // const response = await axios.post(
      //   "http://192.168.10.152:3000/speech-synthesis/synthesize",
      //   { text },
      //   { responseType: "arraybuffer" }
      // );

      const response = await axios.post(
        "http://192.168.10.152:3000/speech-synthesis/synthesize",
        { chatbotId: chatbotId, message: text },
        { responseType: "arraybuffer" }
      );

      // Convert the audio stream to a base64 string
      const base64Audio = base64.encodeFromByteArray(
        new Uint8Array(response.data)
      );

      // Handle the audio stream returned from the server
      const audioFilePath = `${
        FileSystem.documentDirectory
      }${new Date().getTime()}.mp3`;

      await FileSystem.writeAsStringAsync(audioFilePath, base64Audio, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return audioFilePath;
    } catch (error) {
      console.error("Error requesting text synthesis:", error);
      throw error;
    }
  };

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

  return { synthesizeText, playAudio };
};

export default useSpeechSynth;
