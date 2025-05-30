// require("dotenv").config(); // قم بتحميل المتغيرات البيئية مرة واحدة
// const express = require("express");
// const fs = require("fs");
// //const cors = require("cors");
// const axios = require("axios");
// const path = require("path");
// const sharp = require("sharp");
// const { v4: uuidv4 } = require("uuid");
// const cors = require("cors");
// const nodemailer = require("nodemailer"); ////جديد
// // app.use(cors({ origin: "*" }));
// // app.use(
// //   cors({
// //     origin: "http://localhost:5004", // أو دومينك الفعلي
// //   })
// // );

// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const firestore = admin.firestore();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/images", express.static(path.join(__dirname, "images")));

// app.use(
//   cors({
//     origin: "http://localhost:5173", // اسم دومين الfrontend عندك
//     credentials: true, // لو تستخدم كوكيز أو توكنات مع الطلب
//   })
// );
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // إيميلك
//     pass: process.env.EMAIL_PASS, // كلمة المرور أو app password
//   },
// }); //جديد

// const DATA_FOLDER = "data";
// const IMAGE_FOLDER = "images";
// if (!fs.existsSync(DATA_FOLDER)) fs.mkdirSync(DATA_FOLDER);
// if (!fs.existsSync(IMAGE_FOLDER)) fs.mkdirSync(IMAGE_FOLDER);

// const getStoryFilePath = (storyId) => `${DATA_FOLDER}/story_${storyId}.json`;
// const getImagePath = (userId, index) =>
//   `${IMAGE_FOLDER}/user_${userId}_img${index}.png`;

// // اختبار الاتصال بـ OpenAI API عند بدء السيرفر
// async function testOpenAIConnection() {
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4",
//         messages: [{ role: "system", content: "Test connection" }],
//       },
//       { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
//     );
//     console.log("✅ Successfully connected to OpenAI API");
//   } catch (error) {
//     console.error("❌ Failed to connect to OpenAI API", error);
//   }
// }

// // ✅ Middleware لفحص Firebase ID Token
// async function authenticateFirebaseToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized: No token provided" });
//   }

//   const idToken = authHeader.split(" ")[1];

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error("❌ Firebase token verification failed:", error);
//     res.status(401).json({ error: "Unauthorized: Invalid token" });
//   }
// }

// if (!process.env.OPENAI_API_KEY) {
//   console.error("❌ OpenAI API Key is missing!");
//   process.exit(1);
// }

// async function generateStory(prompt) {
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4",
//         messages: [{ role: "system", content: prompt }],
//       },
//       { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("❌ Error generating story:", error);
//     return null;
//   }
// }

// async function generateImages(adjustedStory, userId, storyId, character) {
//   const imageUrls = [];

//   for (let i = 0; i < adjustedStory.length; i++) {
//     try {
//       const imagePrompt = `A children's book illustration of ${character.characterName}, who has ${character.skinTone} skin and ${character.hairColor} hair. The scene represents: "${adjustedStory[i]}"`;
//       console.log("📷 Generating image for:", imagePrompt);

//       const response = await axios.post(
//         "https://api.openai.com/v1/images/generations",
//         {
//           prompt: imagePrompt,
//           n: 1,
//           size: "1024x1024",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           },
//         }
//       );

//       const imageUrl = response.data.data[0].url;
//       console.log("🌐 Image URL:", imageUrl);

//       // 🧱 تحديد المسار الكامل لتخزين الصورة
//       const imageDir = path.join(__dirname, "images", userId, storyId);
//       fs.mkdirSync(imageDir, { recursive: true });

//       const imageFileName = `img${i}.png`;
//       const imagePath = path.join(imageDir, imageFileName);

//       console.log("💾 Saving image to:", imagePath);

//       const imageBuffer = await axios.get(imageUrl, {
//         responseType: "arraybuffer",
//       });

//       await sharp(imageBuffer.data).toFile(imagePath);

//       imageUrls.push(`/images/${userId}/${storyId}/${imageFileName}`);
//     } catch (error) {
//       console.error(`❌ Error generating image for page ${i + 1}:`, error);
//       imageUrls.push(null);
//     }
//   }

//   return imageUrls;
// }

// function adjustStoryWithSmartRewriting(story, numPages) {
//   let words = story.split(/\s+/);
//   let totalWords = words.length;

//   let minWordsPerPage = 30;
//   let maxWordsPerPage = 50;
//   let minTotalWords = numPages * minWordsPerPage;
//   let maxTotalWords = numPages * maxWordsPerPage;

//   if (totalWords > maxTotalWords) {
//     console.log("🔻 Reducing the story length...");
//     let sentences = story.match(/[^.!?]+[.!?]/g) || [story];
//     let importantSentences = sentences.filter((s, i) => i % 2 === 0);
//     words = importantSentences.join(" ").split(/\s+/);
//     totalWords = words.length;
//   }

//   if (totalWords < minTotalWords) {
//     console.log("🔺 Extending the story with extra details...");
//     let extraDetails = [
//       "The air smelled of adventure.",
//       "The waves danced gently under the moonlight.",
//       "A mysterious glow shimmered in the distance.",
//       "The sound of the wind whispered secrets of the past.",
//     ];
//     while (totalWords < minTotalWords) {
//       words.push(extraDetails[Math.floor(Math.random() * extraDetails.length)]);
//       totalWords = words.length;
//     }
//   }

//   let wordsPerPage = Math.ceil(totalWords / numPages);
//   let pages = [];
//   let start = 0;

//   for (let i = 0; i < numPages; i++) {
//     let end = start + wordsPerPage;
//     let pageText = words.slice(start, end).join(" ");
//     pages.push(`Page ${i + 1}:\n${pageText}`);
//     //pages.push(pageText);

//     start = end;
//   }

//   return pages;
// }
// // مسار جديد لاستقبال طلب الطباعة وإرسال الإيميل
// app.post("/send-print-email", authenticateFirebaseToken, async (req, res) => {
//   const userId = req.user.uid;
//   const { storiesToPrint } = req.body; // مفروض يجيك مصفوفة القصص أو النصوص المطلوبة للطباعة

//   if (
//     !storiesToPrint ||
//     !Array.isArray(storiesToPrint) ||
//     storiesToPrint.length === 0
//   ) {
//     return res.status(400).json({ error: "Missing or empty storiesToPrint" });
//   }

//   try {
//     // تكوين نص الإيميل
//     const currentTime = new Date().toLocaleString();
//     let emailBody = `Print request received at ${currentTime}\n\nStories to print:\n\n`;

//     storiesToPrint.forEach((story, idx) => {
//       emailBody += `Story ${idx + 1}:\nTitle: ${
//         story.title
//       }\nContent:\n${story.generatedStory.join("\n")}\n\n`;
//     });

//     // إعداد بيانات الإيميل
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // ترسل لنفسك أو أي إيميل تريده
//       subject: `Print Request from User ${userId} at ${currentTime}`,
//       text: emailBody,
//     };

//     // إرسال الإيميل
//     await transporter.sendMail(mailOptions);

//     res.json({ message: "Print email sent successfully" });
//   } catch (error) {
//     console.error("❌ Failed to send print email:", error);
//     res.status(500).json({ error: "Failed to send print email" });
//   }
// });
// app.get("/test-image", async (req, res) => {
//   try {
//     const prompt = "A cute cartoon elephant flying with balloons in the sky";

//     const response = await axios.post(
//       "https://api.openai.com/v1/images/generations",
//       {
//         prompt: prompt,
//         n: 1,
//         size: "512x512",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     const imageUrl = response.data.data[0].url;
//     console.log("🌐 Image URL:", imageUrl);

//     // تحميل الصورة
//     const imageBuffer = await axios.get(imageUrl, {
//       responseType: "arraybuffer",
//     });

//     // حفظها في مجلد images
//     const testImagePath = path.join(__dirname, "images", "test_image.png");
//     fs.writeFileSync(testImagePath, imageBuffer.data);

//     res.json({ success: true, imageUrl: `/images/test_image.png` });
//   } catch (error) {
//     console.error(
//       "❌ Test image generation failed:",
//       error.response?.data || error.message
//     );
//     res.status(500).json({
//       error: "Image generation failed",
//       details: error.response?.data || error.message,
//     });
//   }
// });

// // ✅ تعديل هذا المسار لاستخدام userId من التوكن
// app.post("/generate-story", authenticateFirebaseToken, async (req, res) => {
//   const {
//     title,
//     dedication,
//     recipient,
//     character,
//     storyDescription,
//     numPages,
//   } = req.body;

//   const userId = req.user.uid; // ✅ استخدم uid من التوكن

//   if (
//     !userId ||
//     !title ||
//     !dedication ||
//     !recipient ||
//     !character ||
//     !storyDescription ||
//     !numPages
//   ) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     console.log("✨ Generating story for:", title);

//     const prompt = `Write a ${numPages}-page children's story titled '${title}', dedicated to '${dedication}'.
// The story is for '${recipient.name}', who is a '${recipient.relationship}' and is '${recipient.age}' years old.
// Occasion: '${recipient.occasion}'. The story follows a character named '${character.characterName}', who is
// '${character.age}' years old with '${character.skinTone}' skin, '${character.hairColor}' hair, and wears '${character.accessories}'.
// Story description: '${storyDescription}'.

// ⚠️ IMPORTANT: Each page should contain no more than 40 words. The text should be simple, clear, and engaging.
// Each sentence should describe a visual scene, such as a landscape or a character's action, that can be illustrated easily.
// The text should be short enough to leave space for an image, and the sentences should flow smoothly between pages.
// Avoid repeating the title or dedication in the text, and start the story immediately.`;

//     const generatedStory = await generateStory(prompt);
//     if (!generatedStory)
//       return res.status(500).json({ error: "Failed to generate story" });

//     const adjustedStory = adjustStoryWithSmartRewriting(
//       generatedStory,
//       numPages
//     );
//     const storyId = uuidv4();
//     const imageUrls = await generateImages(
//       adjustedStory,
//       userId,
//       storyId,
//       character
//     );
//     //const imageUrls = await generateImages(storyParts, userId, storyId, character);
//     // const imageUrls = await generateImages(adjustedStory, userId, storyId, character);

//     // const storyId = uuidv4();
//     const filePath = getStoryFilePath(storyId);

//     const userData = {
//       storyId,
//       userId,
//       title,
//       dedication,
//       recipient,
//       character,
//       storyDescription,
//       numPages,
//       generatedStory: adjustedStory,
//       imageUrls,
//       timestamp: new Date().toISOString(),
//     };

//     fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

//     await firestore
//       .collection("users")
//       .doc(userId)
//       .collection("stories")
//       .doc(storyId)
//       .set(userData);

//     res.json(userData);
//   } catch (error) {
//     console.error("❌ Error during story generation:", error);
//     res.status(500).json({ error: "Failed to generate story" });
//   }
// });

// app.listen(5004, () => {
//   console.log("🚀 Server running on port 5004");
//   testOpenAIConnection();
// });
////////////////////////////////////////////////
require("dotenv").config(); // قم بتحميل المتغيرات البيئية مرة واحدة
const express = require("express");
const fs = require("fs");
//const cors = require("cors");
const axios = require("axios");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const nodemailer = require("nodemailer"); ////جديد
// app.use(cors({ origin: "*" }));
// app.use(
//   cors({
//     origin: "http://localhost:5004", // أو دومينك الفعلي
//   })
// );

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
console.log("Using service account:", serviceAccount.client_email);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cors({
    origin: "http://localhost:5173", // اسم دومين الfrontend عندك
    credentials: true, // لو تستخدم كوكيز أو توكنات مع الطلب
  })
);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // إيميلك
    pass: process.env.EMAIL_PASS, // كلمة المرور أو app password
  },
}); //جديد

const DATA_FOLDER = "data";
const IMAGE_FOLDER = "images";
if (!fs.existsSync(DATA_FOLDER)) fs.mkdirSync(DATA_FOLDER);
if (!fs.existsSync(IMAGE_FOLDER)) fs.mkdirSync(IMAGE_FOLDER);

const getStoryFilePath = (storyId) => `${DATA_FOLDER}/story_${storyId}.json`;
const getImagePath = (userId, index) =>
  `${IMAGE_FOLDER}/user_${userId}_img${index}.png`;

// اختبار الاتصال بـ OpenAI API عند بدء السيرفر
async function testOpenAIConnection() {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: "Test connection" }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    console.log("✅ Successfully connected to OpenAI API");
  } catch (error) {
    console.error("❌ Failed to connect to OpenAI API", error);
  }
}

// ✅ Middleware لفحص Firebase ID Token
async function authenticateFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("❌ Firebase token verification failed:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OpenAI API Key is missing!");
  process.exit(1);
}

async function generateStory(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error generating story:", error);
    return null;
  }
}

async function generateImages(adjustedStory, userId, storyId, character) {
  const imageUrls = [];

  for (let i = 0; i < adjustedStory.length; i++) {
    try {
      const imagePrompt = `A children's book illustration of ${character.characterName}, who has ${character.skinTone} skin and ${character.hairColor} hair. The scene represents: "${adjustedStory[i]}"`;
      console.log("📷 Generating image for:", imagePrompt);

      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: imagePrompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const imageUrl = response.data.data[0].url;
      console.log("🌐 Image URL:", imageUrl);

      // 🧱 تحديد المسار الكامل لتخزين الصورة
      const imageDir = path.join(__dirname, "images", userId, storyId);
      fs.mkdirSync(imageDir, { recursive: true });

      const imageFileName = `img${i}.png`;
      const imagePath = path.join(imageDir, imageFileName);

      console.log("💾 Saving image to:", imagePath);

      const imageBuffer = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      await sharp(imageBuffer.data).toFile(imagePath);

      imageUrls.push(`/images/${userId}/${storyId}/${imageFileName}`);
    } catch (error) {
      console.error(`❌ Error generating image for page ${i + 1}:`, error);
      imageUrls.push(null);
    }
  }

  return imageUrls;
}

// function adjustStoryWithSmartRewriting(story, numPages) {
//   let words = story.split(/\s+/);
//   let totalWords = words.length;

//   let minWordsPerPage = 30;
//   let maxWordsPerPage = 50;
//   let minTotalWords = numPages * minWordsPerPage;
//   let maxTotalWords = numPages * maxWordsPerPage;

//   if (totalWords > maxTotalWords) {
//     console.log("🔻 Reducing the story length...");
//     let sentences = story.match(/[^.!?]+[.!?]/g) || [story];
//     let importantSentences = sentences.filter((s, i) => i % 2 === 0);
//     words = importantSentences.join(" ").split(/\s+/);
//     totalWords = words.length;
//   }

//   if (totalWords < minTotalWords) {
//     console.log("🔺 Extending the story with extra details...");
//     let extraDetails = [
//       "The air smelled of adventure.",
//       "The waves danced gently under the moonlight.",
//       "A mysterious glow shimmered in the distance.",
//       "The sound of the wind whispered secrets of the past.",
//     ];
//     while (totalWords < minTotalWords) {
//       words.push(extraDetails[Math.floor(Math.random() * extraDetails.length)]);
//       totalWords = words.length;
//     }
//   }

//   let wordsPerPage = Math.ceil(totalWords / numPages);
//   let pages = [];
//   let start = 0;

//   for (let i = 0; i < numPages; i++) {
//     let end = start + wordsPerPage;
//     let pageText = words.slice(start, end).join(" ");
//     //pages.push(`Page ${i + 1}:\n${pageText}`);
//     pages.push(pageText);

//     start = end;
//   }

//   return pages;
// }

// function adjustStoryWithSmartRewriting(story, numPages) {
//   // أولاً، ننظف النص من أي "Page X:" أو رموز غير مرغوبة
//   story = story
//     .replace(/Page \d+:/gi, "")
//     .replace(/\n/g, " ")
//     .trim();

//   let words = story.split(/\s+/);
//   let totalWords = words.length;

//   let minWordsPerPage = 25;
//   let maxWordsPerPage = 35;
//   let wordsPerPage = Math.min(
//     maxWordsPerPage,
//     Math.ceil(totalWords / numPages)
//   );

//   let pages = [];
//   let start = 0;

//   for (let i = 0; i < numPages; i++) {
//     let end = start + wordsPerPage;
//     if (end > totalWords) end = totalWords;

//     // نأخذ الكلمات ونحولها لنص صفحة
//     let pageText = words.slice(start, end).join(" ");

//     // نزيل المسافات الزائدة
//     pageText = pageText.trim();

//     pages.push(pageText);

//     start = end;
//     if (start >= totalWords) break;
//   }

//   return pages;
// }

function adjustStoryWithSmartRewriting(fullStory, numPages) {
  // تنظيف أولي
  fullStory = fullStory
    .replace(/Page \d+:/gi, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = fullStory.split(" ");
  const totalWords = words.length;
  const avgWordsPerPage = 38; // متوسط معقول للصفحة
  const expectedMinWords = numPages * avgWordsPerPage * 0.9;

  if (totalWords < expectedMinWords) {
    throw new Error(
      `Generated story is too short (${totalWords} words). Expected at least ${expectedMinWords} words.`
    );
  }

  const chunkSize = Math.ceil(totalWords / numPages);
  const storyParts = [];

  for (let i = 0; i < totalWords; i += chunkSize) {
    const chunk = words
      .slice(i, i + chunkSize)
      .join(" ")
      .trim();
    storyParts.push(chunk);
  }

  // إذا كان عدد الصفحات الناتج أقل من المطلوب (بسبب قلة الكلمات)، نضيف صفحات فاضية
  while (storyParts.length < numPages) {
    storyParts.push("");
  }

  // إذا كان عدد الصفحات الناتج أكثر من المطلوب، ندمج الصفحات الأخيرة
  while (storyParts.length > numPages) {
    const last = storyParts.pop();
    storyParts[storyParts.length - 1] += " " + last;
  }

  return storyParts;
}

// مسار جديد لاستقبال طلب الطباعة وإرسال الإيميل
app.post("/send-print-email", authenticateFirebaseToken, async (req, res) => {
  const userId = req.user.uid;
  const { storiesToPrint } = req.body; // مفروض يجيك مصفوفة القصص أو النصوص المطلوبة للطباعة

  if (
    !storiesToPrint ||
    !Array.isArray(storiesToPrint) ||
    storiesToPrint.length === 0
  ) {
    return res.status(400).json({ error: "Missing or empty storiesToPrint" });
  }

  try {
    // تكوين نص الإيميل
    const currentTime = new Date().toLocaleString();
    let emailBody = `Print request received at ${currentTime}\n\nStories to print:\n\n`;

    storiesToPrint.forEach((story, idx) => {
      emailBody += `Story ${idx + 1}:\nTitle: ${
        story.title
      }\nContent:\n${story.generatedStory.join("\n")}\n\n`;
    });

    // إعداد بيانات الإيميل
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // ترسل لنفسك أو أي إيميل تريده
      subject: `Print Request from User ${userId} at ${currentTime}`,
      text: emailBody,
    };

    // إرسال الإيميل
    await transporter.sendMail(mailOptions);

    res.json({ message: "Print email sent successfully" });
  } catch (error) {
    console.error("❌ Failed to send print email:", error);
    res.status(500).json({ error: "Failed to send print email" });
  }
});
app.get("/test-image", async (req, res) => {
  try {
    const prompt = "A cute cartoon elephant flying with balloons in the sky";

    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    console.log("🌐 Image URL:", imageUrl);

    // تحميل الصورة
    const imageBuffer = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // حفظها في مجلد images
    const testImagePath = path.join(__dirname, "images", "test_image.png");
    fs.writeFileSync(testImagePath, imageBuffer.data);

    res.json({ success: true, imageUrl: `/images/test_image.png` });
  } catch (error) {
    console.error(
      "❌ Test image generation failed:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Image generation failed",
      details: error.response?.data || error.message,
    });
  }
});

// ✅ تعديل هذا المسار لاستخدام userId من التوكن
app.post("/generate-story", authenticateFirebaseToken, async (req, res) => {
  const {
    title,
    dedication,
    recipient,
    character,
    storyDescription,
    numPages,
  } = req.body;

  const userId = req.user.uid; // ✅ استخدم uid من التوكن

  if (
    !userId ||
    !title ||
    !dedication ||
    !recipient ||
    !character ||
    !storyDescription ||
    !numPages
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("✨ Generating story for:", title);

    //     const prompt = `Write a ${numPages}-page children's story titled '${title}', dedicated to '${dedication}'.
    // The story is for '${recipient.name}', who is a '${recipient.relationship}' and is '${recipient.age}' years old.
    // Occasion: '${recipient.occasion}'. The story follows a character named '${character.characterName}', who is
    // '${character.age}' years old with '${character.skinTone}' skin, '${character.hairColor}' hair, and wears '${character.accessories}'.
    // Story description: '${storyDescription}'.

    // ⚠️ IMPORTANT: Each page should contain no more than 40 words. The text should be simple, clear, and engaging.
    // Each sentence should describe a visual scene, such as a landscape or a character's action, that can be illustrated easily.
    // The text should be short enough to leave space for an image, and the sentences should flow smoothly between pages.
    // Avoid repeating the title or dedication in the text, and start the story immediately.`;
    //     const prompt = `Write a ${numPages}-page children's story titled '${title}', dedicated to '${dedication}'.
    // The story is for '${recipient.name}', who is a '${recipient.relationship}' and is '${recipient.age}' years old.
    // Occasion: '${recipient.occasion}'. The story follows a character named '${character.characterName}', who is
    // '${character.age}' years old with '${character.skinTone}' skin, '${character.hairColor}' hair, and wears '${character.accessories}'.
    // Story description: '${storyDescription}'.

    // ⚠️ IMPORTANT: Do NOT add page numbers or labels like "Page 1" in the text.
    // Each page should contain a short, clear, and engaging paragraph with no more than 35 words.
    // The sentences should flow smoothly from one page to the next without breaks or numbering.
    // Write the story in a continuous style suitable for a children's book, ready to be split into pages.`;

    //     const prompt = `Write a children's story titled '${title}', dedicated to '${dedication}'.
    // The story is for '${recipient.name}', who is a '${recipient.relationship}' and is '${recipient.age}' years old.
    // Occasion: '${recipient.occasion}'. The story follows a character named '${character.characterName}', who is
    // '${character.age}' years old with '${character.skinTone}' skin, '${character.hairColor}' hair, and wears '${character.accessories}'.
    // Story description: '${storyDescription}'.

    // ⚠️ IMPORTANT:
    // - The story must have a clear **beginning, middle, and end**, and must feel **complete and satisfying**, even if short.
    // - The story should be written in a continuous style, without page numbers or labels like "Page 1".
    // - Each page should contain no more than 35 words.
    // - Keep the language simple and engaging.
    // - Adjust pacing to fit within ${numPages} pages, summarizing where needed, but ensure the story has a proper ending.`;

    //     const prompt = `Write a ${numPages}-page children's story titled '${title}', dedicated to '${dedication}'.
    // The story is for '${recipient.name}', who is a '${recipient.relationship}' and is '${recipient.age}' years old.
    // Occasion: '${recipient.occasion}'. The story follows a character named '${character.characterName}', who is
    // '${character.age}' years old with '${character.skinTone}' skin, '${character.hairColor}' hair, and wears '${character.accessories}'.
    // Story description: '${storyDescription}'.

    // ⚠️ IMPORTANT:
    // - Do NOT include any labels like "Page 1", "Page 2", or similar.
    // - The story should be a continuous narrative, later split into ${numPages} pages.
    // - Each page should contain around 35–40 words.
    // - Use simple, clear, and engaging language suitable for young children.
    // - Make sure the story has a **beginning, middle, and a satisfying ending**, even if it's short.
    // - Adjust the pacing to fit the number of pages, summarizing or focusing only on key scenes.
    // - Avoid repeating the title or dedication in the story text.
    // - Begin the story immediately, no need to introduce it as a book.`;

    const wordsPerPage = 38; // معدل الكلمات لكل صفحة
    const totalWords = wordsPerPage * numPages;

    const prompt = `Write a children's story titled '${title}', dedicated to '${dedication}'.
The story is for '${recipient.name}', who is a '${recipient.relationship}' and is '${recipient.age}' years old.
Occasion: '${recipient.occasion}'. The story follows a character named '${character.characterName}', who is
'${character.age}' years old with '${character.skinTone}' skin, '${character.hairColor}' hair, and wears '${character.accessories}'.
Story description: '${storyDescription}'.

⚠️ IMPORTANT:
- The story must be a complete narrative with a beginning, middle, and satisfying ending.
- The total length of the story MUST be around ${totalWords} words, divided across ${numPages} pages.
- Each page should roughly contain ${wordsPerPage} words.
- DO NOT include page numbers.
- Write the story in a continuous paragraph, and I will split it later.
- Use clear, simple, engaging language for young children.
- The story should be complete and feel satisfying, no matter how short.`;

    const generatedStory = await generateStory(prompt);
    if (!generatedStory)
      return res.status(500).json({ error: "Failed to generate story" });

    const adjustedStory = adjustStoryWithSmartRewriting(
      generatedStory,
      numPages
    );
    const storyId = uuidv4();
    const imageUrls = await generateImages(
      adjustedStory,
      userId,
      storyId,
      character
    );
    //const imageUrls = await generateImages(storyParts, userId, storyId, character);
    // const imageUrls = await generateImages(adjustedStory, userId, storyId, character);

    // const storyId = uuidv4();
    const filePath = getStoryFilePath(storyId);

    const userData = {
      storyId,
      userId,
      title,
      dedication,
      recipient,
      character,
      storyDescription,
      numPages,
      generatedStory: adjustedStory,
      imageUrls,
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

    await firestore
      .collection("users")
      .doc(userId)
      .collection("stories")
      .doc(storyId)
      .set(userData);

    res.json(userData);
  } catch (error) {
    console.error("❌ Error during story generation:", error);
    res.status(500).json({ error: "Failed to generate story" });
  }
});

app.listen(5004, () => {
  console.log("🚀 Server running on port 5004");
  testOpenAIConnection();
});
