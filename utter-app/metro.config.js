const defaultAssetExts =
  require("metro-config/src/defaults/defaults").assetExts;

module.exports = {
  // ...
  resolver: {
    // ...
    assetExts: [
      ...defaultAssetExts,
      "bin", // whisper.rn: ggml model binary
      "mil", // whisper.rn: CoreML model asset
    ],
  },
};
