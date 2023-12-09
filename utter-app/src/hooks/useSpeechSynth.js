import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import axios from "axios";
import base64 from "react-native-base64";

const useSpeechSynth = () => {
  const synthesizeText = async (text) => {
    try {
      const response = await axios.post(
        "http://130.229.177.235:3000/speech-synthesis/synthesize",
        { text },
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
      const { sound } = await Audio.Sound.createAsync({ uri: filePath });
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          // Audio playback finished
          await sound.unloadAsync();
          await FileSystem.deleteAsync(filePath);
        }
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return { synthesizeText, playAudio };
};

export default useSpeechSynth;
