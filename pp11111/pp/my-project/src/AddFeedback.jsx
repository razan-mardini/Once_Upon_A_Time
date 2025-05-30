// import { useState } from "react";
// import { db } from "./config/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const AddFeedback = () => {
//   const [name, setName] = useState("");
//   const [text, setText] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await addDoc(collection(db, "testimonials"), {
//         name,
//         text,
//         img: `https://picsum.photos/100/100?random=${Date.now()}`, // صورة عشوائية
//         color: "border-green-400 text-green-400", // لون افتراضي مثلا
//       });
//       alert("Feedback submitted successfully!");
//       navigate("/"); // رجعي المستخدم للصفحة الرئيسية أو Testimonial
//     } catch (error) {
//       console.error("Error adding feedback:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6">Leave Your Feedback</h2>
//         <input
//           type="text"
//           placeholder="Your Name"
//           className="border p-2 w-full mb-4 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Your Feedback"
//           className="border p-2 w-full mb-4 rounded"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded w-full">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddFeedback;
// import { useState } from "react";
// import { db } from "./config/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth"; // 👈 إضافي

// const AddFeedback = () => {
//   const [text, setText] = useState("");
//   const navigate = useNavigate();
//   const auth = getAuth(); // 👈 جلب المستخدم الحالي

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user = auth.currentUser; // 👈 المستخدم المسجل حالياً

//     if (!user) {
//       alert("You must be logged in to leave feedback.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "testimonials"), {
//         name: user.displayName || "Anonymous", // 👈 اسم من Firebase Auth
//         uid: user.uid,                         // 👈 ممكن تستخدمه لاحقاً
//         email: user.email,                     // 👈 معلومات إضافية لو حابة
//         text,
//         img: user.photoURL || `https://picsum.photos/100/100?random=${Date.now()}`,
//         color: "border-green-400 text-green-400",
//       });
//       alert("Feedback submitted successfully!");
//       navigate("/");
//     } catch (error) {
//       console.error("Error adding feedback:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6">Leave Your Feedback</h2>

//         <textarea
//           placeholder="Your Feedback"
//           className="border p-2 w-full mb-4 rounded"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded w-full">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddFeedback;
/////////////////زابط
// import { useState } from "react";
// import { db } from "./config/firebase";
// import { collection, addDoc, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";

// const AddFeedback = () => {
//   const [text, setText] = useState("");
//   const navigate = useNavigate();
//   const auth = getAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user = auth.currentUser;

//     if (!user) {
//       alert("You must be logged in to leave feedback.");
//       return;
//     }

//     try {
//       // ✅ جلب بيانات المستخدم الحقيقية من Firestore
//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       let name = "Anonymous";
//       let email = user.email || "";

//       if (userSnap.exists()) {
//         const userData = userSnap.data();
//         name = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
//         email = userData.email || user.email || "";
//       }

//       // ✅ إضافة الفيدباك ببيانات حقيقية
//       await addDoc(collection(db, "testimonials"), {
//         uid: user.uid,
//         name,
//         email,
//         text,
//         img: user.photoURL || `https://picsum.photos/100/100?random=${Date.now()}`,
//         color: "border-green-400 text-green-400",
//       });

//       alert("Feedback submitted successfully!");
//       navigate("/");
//     } catch (error) {
//       console.error("Error adding feedback:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6">Leave Your Feedback</h2>

//         <textarea
//           placeholder="Your Feedback"
//           className="border p-2 w-full mb-4 rounded"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded w-full">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddFeedback;
////////////////زابط
import { useState } from "react";
import { db } from "./config/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const AddFeedback = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to leave feedback.");
      return;
    }

    try {
      // ✅ Get user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let name = "Anonymous";
      let email = user.email || "";

      if (userSnap.exists()) {
        const userData = userSnap.data();
        name = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
        email = userData.email || user.email || "";
      }

      const feedbackData = {
        uid: user.uid,
        name,
        email,
        text,
        img: user.photoURL || `https://picsum.photos/100/100?random=${Date.now()}`,
        color: "border-green-400 text-green-400",
        createdAt: new Date(),
      };

      // ✅ Save in global testimonials
      await addDoc(collection(db, "testimonials"), feedbackData);

      // ✅ Save in user-specific subcollection
      await addDoc(collection(userRef, "feedback"), feedbackData);

      alert("Feedback submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Leave Your Feedback</h2>
        <textarea
          placeholder="Your Feedback"
          className="border p-2 w-full mb-4 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded w-full">
          Submit
        </button>
        <br/>
        <br/>
         <button type="button" onClick={() => navigate("/")} className="bg-purple-500 text-white py-2 px-4 rounded w-full">Back to Home</button>

      </form>
       

    </div>
  );
};

export default AddFeedback;
