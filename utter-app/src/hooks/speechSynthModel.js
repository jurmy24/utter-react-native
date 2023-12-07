import AWS from "aws-sdk";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

const useSpeechSynthModel = () => {
  AWS.config.update({
    accessKeyId: "AKIAZPFZDFGGBQA7HYVB",
    secretAccessKey: "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",
    region: "eu-west-3",
  });

  const synthesizeText = async (text) => {
    const Polly = new AWS.Polly();

    const params = {
      Text: text,
      OutputFormat: "mp3",
      Engine: "neural",
      VoiceId: "Joanna", // You can choose different voices
    };

    try {
      const pollyResponse = await Polly.synthesizeSpeech(params).promise();
      const audioFilePath = `${
        FileSystem.documentDirectory
      }${new Date().getTime()}.mp3`;
      await FileSystem.writeAsStringAsync(
        audioFilePath,
        pollyResponse.AudioStream.toString("base64"),
        { encoding: FileSystem.EncodingType.Base64 }
      );

      return audioFilePath;
    } catch (error) {
      console.error("Error synthesizing text with Polly:", error);
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

export default useSpeechSynthModel;
