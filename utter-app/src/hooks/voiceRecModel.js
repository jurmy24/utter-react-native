import { useState, useEffect } from "react";
import { initWhisper, AudioSessionIos } from "whisper.rn";
import { Platform, PermissionsAndroid } from "react-native";

const useVoiceRecModel = () => {
  const [whisperContext, setWhisperContext] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [stopFunction, setStopFunction] = useState(null);

  useEffect(() => {
    if (Platform.OS === "android") {
      // Request record audio permission
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
        title: "Whisper Audio Permission",
        message: "Whisper needs access to your microphone",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      });
    }

    const setupWhisper = async () => {
      const context = await initWhisper({
        filePath: require("utter-app/assets/ggml-tiny.en.bin"),
        coreMLModelAsset:
          Platform.OS === "ios"
            ? {
                filename: "ggml-tiny.en-encoder.mlmodelc",
                assets: [
                  require("utter-app/assets/ggml-tiny.en-encoder.mlmodelc/weights/weight.bin"),
                  require("utter-app/assets/ggml-tiny.en-encoder.mlmodelc/model.mil"),
                  require("utter-app/assets/ggml-tiny.en-encoder.mlmodelc/coremldata.bin"),
                ],
              }
            : undefined,
      });
      setWhisperContext(context);
    };

    setupWhisper();
  }, []);

  const startTranscription = async () => {
    if (!whisperContext) return;

    const options = {
      language: "en",
      realtimeAudioSec: 60,
      realtimeAudioSliceSec: 25,
      audioSessionOnStartIos: Platform.OS === "ios" && {
        category: AudioSessionIos.Category.PlayAndRecord,
        options: [
          AudioSessionIos.CategoryOption.MixWithOthers,
          AudioSessionIos.CategoryOption.AllowBluetooth,
        ],
        mode: AudioSessionIos.Mode.Default,
      },
      audioSessionOnStopIos: Platform.OS === "ios" ? "restore" : undefined,
    };

    try {
      const { stop, subscribe } = await whisperContext.transcribeRealtime(
        options
      );
      setStopFunction(() => stop);

      subscribe((evt) => {
        const { isCapturing, data } = evt;
        setTranscription(data.result);
        setIsCapturing(isCapturing);

        if (!isCapturing) {
          console.log("Finished realtime transcribing");
        }
      });
    } catch (error) {
      console.error("Error starting real-time transcription:", error);
    }
  };

  const stopTranscription = () => {
    if (stopFunction) {
      stopFunction();
      setStopFunction(null);
      setIsCapturing(false);
    } else {
      console.log("No active transcription to stop");
    }
  };

  return { isCapturing, transcription, startTranscription, stopTranscription };
};

export default useVoiceRecModel;
