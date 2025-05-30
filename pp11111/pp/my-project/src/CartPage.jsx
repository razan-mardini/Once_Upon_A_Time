
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";


export default function CartPage() {
  const { storyId } = useParams();
  const [cartStories, setCartStories] = useState([]);
  const [otherStories, setOtherStories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const printRefs = useRef({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);

        const snapshot = await getDocs(collection(db, "users", user.uid, "stories"));
        const allStories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const cart = savedCart
          .map((cartStory) => allStories.find((story) => story.id === cartStory.id))
          .filter(Boolean);

        const others = allStories.filter((s) => !cart.some((c) => c.id === s.id));

        setCartStories(cart);
        setOtherStories(others);
      }
    });
  }, []);

  const addToCart = (storyToAdd) => {
    if (!cartStories.find((s) => s.id === storyToAdd.id)) {
      setCartStories((prev) => [...prev, storyToAdd]);
      setOtherStories((prev) => prev.filter((s) => s.id !== storyToAdd.id));
    }
  };

  const removeFromCart = (id) => {
    const removedStory = cartStories.find((s) => s.id === id);
    setCartStories((prev) => prev.filter((s) => s.id !== id));
    setOtherStories((prev) => [...prev, removedStory]);
  };

  
 const downloadSinglePDF = async (story) => {
  const printContainer = document.createElement("div");

  // الغلاف
  printContainer.innerHTML += `
    <div style="page-break-after: always; text-align: center; padding: 100px 20px;">
      <h1 style="font-size: 32px; color: #6b21a8;">${story.title}</h1>
      <img src="${story.cover}" style="width: 300px; height: auto; margin-top: 30px; border-radius: 16px;" />
    </div>
  `;

  // الإهداء
  if (story.dedication) {
    printContainer.innerHTML += `
      <div style="page-break-after: always; padding: 60px 40px; text-align: center;">
        <h2 style="font-size: 18px; color: #9d174d;">${story.dedication}</h2>
      </div>
    `;
  }

  const textArray = story.pages || story.generatedStory || [];

  if (Array.isArray(textArray)) {
    for (let i = 0; i < textArray.length; i++) {
  const pageText = textArray[i] || "";
  const imageUrl = story.imageUrls?.[i];

  if (imageUrl && imageUrl !== "undefined") {
    const imageData = await loadImageLocally(imageUrl);
    printContainer.innerHTML += `
      <div style="page-break-after: always; padding: 40px; text-align: center;">
        <img src="${imageData}" style="width: 300px; height: auto; margin-bottom: 20px;" />
        <p style="white-space: pre-wrap; font-size: 16px; color: #374151;">${pageText}</p>
      </div>
    `;
  } else {
    printContainer.innerHTML += `
      <div style="page-break-after: always; padding: 40px; text-align: center;">
        <p style="white-space: pre-wrap; font-size: 16px; color: #374151;">${pageText}</p>
      </div>
    `;
  }
}

    
  }

  // النهاية
  printContainer.innerHTML += `
    <div style="page-break-after: always; text-align: center; padding: 100px 20px;">
      <h3 style="font-size: 20px; color: #6b7280;">The End</h3>
    </div>
  `;

  const options = {
    margin: 0,
    filename: `${story.title}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(options).from(printContainer).save();
};


//   async function printSingle(storyId) {
//   try {
//     const story = cartStories.find((s) => s.id === storyId);

//     if (!story) {
//       alert("Story not found!");
//       return;
//     }

//     const storiesToPrint = [
//       {
//         title: story.title,
//         generatedStory: story.generatedStory,
//       },
//     ];

//     // const response = await fetch("/send-print-email", {
//     const response = await fetch("http://localhost:5004/send-print-email", {

//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify({ storiesToPrint }),
//     });

//     const text = await response.text();  // نقرأ الرد كنص عادي

//     if (response.ok) {
//       alert("Print request sent successfully! Server response: " + text);
//     } else {
//       alert("Failed to send print request: " + text);
//     }
//   } catch (error) {
//     console.error("Error sending print request:", error);
//     alert("An error occurred while sending the print request.");
//   }
// }
// async function printSingle(storyId) {
//   try {
//     const story = cartStories.find((s) => s.id === storyId);

//     if (!story) {
//       alert("Story not found!");
//       return;
//     }

//     const response = await fetch("http://localhost:5004/send-print-email", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: story.title,        // فقط العنوان
//         userEmail: userEmail,      // الإيميل تبع المستخدم
//       }),
//     });

//     const text = await response.text();

//     if (response.ok) {
//       alert("Print request sent successfully! Server response: " + text);
//     } else {
//       alert("Failed to send print request: " + text);
//     }
//   } catch (error) {
//     console.error("Error sending print request:", error);
//     alert("An error occurred while sending the print request.");
//   }
// }

async function printSingle(storyId) {
  try {
    const story = cartStories.find((s) => s.id === storyId);
    if (!story) {
      alert("Story not found!");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken(); // 🔐 هي أهم سطر

    const response = await fetch("http://localhost:5004/send-print-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 هان بنبعت التوكن
      },
      body: JSON.stringify({
        storiesToPrint: [story],
      }),
    });

    const text = await response.text();

    if (response.ok) {
      alert("Print request sent successfully! Server response: " + text);
    } else {
      alert("Failed to send print request: " + text);
    }
  } catch (error) {
    console.error("Error sending print request:", error);
    alert("An error occurred while sending the print request.");
  }
}

  const loadImageLocally = (imageUrl) => {
  return new Promise((resolve, reject) => {
    fetch(imageUrl, { mode: 'cors' })
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log("✅ Image loaded as base64:", imageUrl);
          resolve(reader.result);
        };
        reader.onerror = (e) => {
          console.error("❌ Error reading image blob:", imageUrl, e);
          resolve("");
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("❌ Failed to fetch image for PDF:", imageUrl, error);
        resolve("");
      });
  });
};



  if (!cartStories.length) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen px-4 py-8 bg-[#fefcff] relative">
      <h1 className="text-2xl font-bold text-purple-600 mb-4">🛒 Your Cart</h1>

      {cartStories.map((story) => (
        <div key={story.id} className="bg-white shadow-md p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-purple-700">{story.title}</h2>
            <button
              onClick={() => removeFromCart(story.id)}
              className="text-red-500 text-sm border border-red-300 px-3 py-1 rounded-full hover:bg-red-50"
            >
              Remove
            </button>
          </div>

          <div ref={(el) => (printRefs.current[story.id] = el)}>
            <img src={story.cover} alt={story.title} className="w-40 h-40 rounded-md mt-4 mb-4" />
            <p className="text-gray-700 whitespace-pre-wrap">{story.content}</p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => downloadSinglePDF(story)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Download
            </button>
            <button
              onClick={() => printSingle(story.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
            >
              Print
            </button>
          </div>
        </div>
      ))}

      <h3 className="text-lg font-semibold mb-2">Add Another Story to Cart:</h3>
      {otherStories.length === 0 ? (
        <p className="text-gray-500">No more stories available to add.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherStories.map((s) => (
            <div key={s.id} className="border p-4 rounded-md shadow-sm bg-purple-50">
              <img src={s.cover} alt={s.title} className="w-20 h-20 rounded mb-2" />
              <p className="font-semibold">{s.title}</p>
              <button
                onClick={() => addToCart(s)}
                className="mt-2 text-sm bg-pink-400 text-white px-3 py-1 rounded-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
            <h2 className="text-lg font-bold text-purple-700 mb-4">📧 Email Simulation</h2>
            <p><strong>To:</strong> library@example.com</p>
            <p><strong>From:</strong> {userEmail}</p>
            <p><strong>Subject:</strong> Print Request</p>
            <div className="mt-4">
              <p className="font-semibold mb-2">Stories to Print:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {cartStories.map((s, i) => (
                  <li key={i}>{s.title} ({s.pages?.length || 0} pages)</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
