import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import p1 from "./assets/books/p1.png";
// import p2 from "./assets/books/p2.png";
// import p3 from "./assets/books/p3.png";
// import p4 from "./assets/books/p4.png";

//const bookImages = [p1, p2, p3, p4];

const DedicationPage = () => {
  const [dedication, setDedication] = useState("");
  const [selectedTab, setSelectedTab] = useState("hooray");
  const navigate = useNavigate();

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = `user_${Date.now()}`;
      localStorage.setItem("userId", userId);
    }
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (savedData.dedication) {
      setDedication(savedData.dedication);
    }
  }, []);

  const handleNext = () => {
    const userId = localStorage.getItem("userId");
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    savedData.dedication = dedication;
    savedData.userId = userId;
    localStorage.setItem("storyData", JSON.stringify(savedData));
    navigate("/RecipientInfoPage");
  };

  // const floatingBooks = useMemo(() => {
  //   return Array.from({ length: 12 }).map((_, index) => ({
  //     id: index,
  //     src: bookImages[index % bookImages.length],
  //     left: `${Math.random() * 100}%`,
  //     bottom: `${Math.random() * 30}vh`,
  //     rotate: Math.random() * 360,
  //     duration: Math.random() * 6 + 5,
  //     delay: Math.random() * 3,
  //   }));
  // }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen  overflow-hidden">
      {/* {floatingBooks.map((book) => (
        <motion.img
          key={book.id}
          src={book.src}
          alt={`Floating book ${book.id + 1}`}
          className="absolute w-20 h-auto opacity-70 shadow-lg rounded-lg"
          style={{ left: book.left, bottom: book.bottom }}
          initial={{ y: "100vh", opacity: 0, rotate: book.rotate }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: [0, 20, -20, 0] }}
          transition={{
            duration: book.duration,
            repeat: Infinity,
            delay: book.delay,
          }}
        />
      ))} */}

<div className="shadow-lg rounded-xl p-8 w-[700px] border-2 border-purple-900 relative z-10">  
<h2 className="text-2xl font-bold text-gray-800 text-center">Write your <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500  bg-purple-700 to-pink-600">Dedication</span></h2>
        <p className="text-gray-600 text-center text-sm mt-1">
          Your personal dedication will be featured on the book’s first page forever and it’s free of charge.
        </p>

        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 ${
              selectedTab === "hooray" ? "bg-gray-700 text-white" : "bg-gray-300"
            } rounded-l-lg`}
            onClick={() => setSelectedTab("hooray")}
          >
            Hooray-Inspired Dedications
          </button>
          <button
            className={`px-4 py-2 ${
              selectedTab === "personal" ? "bg-gray-700 text-white" : "bg-gray-300"
            } rounded-r-lg`}
            onClick={() => setSelectedTab("personal")}
          >
            Personal Dedication
          </button>
        </div>

        {selectedTab === "personal" && (
          <p className="text-red-600 text-center mt-2">Click to write your own.</p>
        )}

        <div className="mt-4 bg-blue-200 p-4 rounded-lg shadow-inner text-center">
          <textarea
            className="w-full p-3 border border-gray-400 rounded-lg resize-none h-32 bg-white"
            placeholder="Enter your dedication..."
            value={dedication}
            onChange={(e) => setDedication(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/RecipientInfoPage")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            disabled={!dedication.trim()}
            className={`px-6 py-3 rounded-lg text-white font-bold transition duration-200 hover:scale-105 ${
              dedication.trim()
                ? "bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white hover:bg-purple-900"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            NEXT ❯❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default DedicationPage;
