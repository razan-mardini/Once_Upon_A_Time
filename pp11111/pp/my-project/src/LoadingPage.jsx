
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { getAuth } from "firebase/auth";
// import logo from "../src/assets/website/book-logo.png";
// import { useRef } from "react";

// const LoadingPage = () => {
//   const [progress, setProgress] = useState(0);
//   const [showMessage, setShowMessage] = useState(false);
//   const navigate = useNavigate();
//   const calledRef = useRef(false);

  
// useEffect(() => {
//    // 🟢 يضل ثابت بين الـ renders
//   let interval;

//   const startProgress = () => {
//     interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 95) return prev;
//         return prev + 5;
//       });
//     }, 400);
//   };

//   const generateStory = async () => {
//     if (calledRef.current) return; // 🔒 منع التكرار الفعلي
//     calledRef.current = true;

//     try {
//       const storyData = JSON.parse(localStorage.getItem("storyData")) || {};
//       const user = getAuth().currentUser;
//       if (!user) {
//         alert("You must be logged in");
//         return;
//       }
//       const token = await user.getIdToken();

//       startProgress();

//       await axios.post("http://localhost:5004/generate-story", storyData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       clearInterval(interval);
//       setProgress(100);
//       setTimeout(() => setShowMessage(true), 500);
//     } catch (error) {
//       console.error("Error generating story:", error);
//     }
//   };

//   generateStory();

//   return () => clearInterval(interval);
// }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen overflow-hidden">
//       <div className="bg-[#e6d5f7] shadow-lg rounded-xl p-8 w-[700px] border border-gray-300 relative z-10 text-center">
//         {!showMessage ? (
//           <>
//             <img src={logo} alt="Logo" className="w-32 h-32 mx-auto mb-4" />
//             <motion.div
//               className="text-xl font-semibold text-gray-700"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1 }}
//             >
//               Generating Your Story...
//             </motion.div>
//             <div className="w-full bg-gray-300 rounded-full h-4 mt-6">
//               <motion.div
//                 className="bg-blue-500 h-4 rounded-full"
//                 initial={{ width: "0%" }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 1.2, ease: "linear" }}
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl font-bold text-gray-900">Your Story is Ready!</h2>
//             <p className="text-gray-600 mt-2">Click below to preview your story.</p>
//             <Link to="/DashboardPage">
//               <button className="mt-6 w-full bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white font-bold py-3 rounded-full text-lg hover:bg-purple-900 transition duration-200 hover:scale-105">
//                 PREVIEW ➤
//               </button>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoadingPage;

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { getAuth } from "firebase/auth";
import logo from "../src/assets/website/book-logo.png";

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [storyId, setStoryId] = useState(null); // إضافة state لتخزين storyId
  const navigate = useNavigate();
  const calledRef = useRef(false);
  
  useEffect(() => {
    let interval;

    const startProgress = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + 5;
        });
      }, 400);
    };

    const generateStory = async () => {
      if (calledRef.current) return;
      calledRef.current = true;

      try {
        const storyData = JSON.parse(localStorage.getItem("storyData")) || {};
        const user = getAuth().currentUser;
        if (!user) {
          alert("You must be logged in");
          return;
        }
        const token = await user.getIdToken();

        startProgress();

        const response = await axios.post("http://localhost:5004/generate-story", storyData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        clearInterval(interval);
        setProgress(100);
        setShowMessage(true);

        // هنا نستقبل storyId ونخزنه في state
        setStoryId(response.data.storyId);

      } catch (error) {
        console.error("Error generating story:", error);
      }
    };

    generateStory();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <div className="bg-[#e6d5f7] shadow-lg rounded-xl p-8 w-[700px] border border-gray-300 relative z-10 text-center">
        {!showMessage ? (
          <>
            <img src={logo} alt="Logo" className="w-32 h-32 mx-auto mb-4" />
            <motion.div
              className="text-xl font-semibold text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Generating Your Story...
            </motion.div>
            <div className="w-full bg-gray-300 rounded-full h-4 mt-6">
              <motion.div
                className="bg-blue-500 h-4 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "linear" }}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900">Your Story is Ready!</h2>
            <p className="text-gray-600 mt-2">Click below to preview your story.</p>
            <button
              disabled={!storyId}
              onClick={() => navigate("/DashboardPage", { state: { highlightStoryId: storyId } })}
              className={`mt-6 w-full bg-gradient-to-r from-blue-500 bg-purple-700 to-pink-600 text-white font-bold py-3 rounded-full text-lg hover:bg-purple-900 transition duration-200 hover:scale-105 ${
                !storyId ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              PREVIEW ➤
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
