const axios = require("axios");

const HF_API_KEY = "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"; // ضع مفتاحك هنا

async function generateStory() {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        inputs:
          "Write a fun and imaginative children's story about a young girl named Lily who discovers a hidden portal in her backyard, leading to a magical world full of talking animals and adventures.",
      },
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
      }
    );

    console.log("📖 AI Generated Story:", response.data);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

generateStory();
