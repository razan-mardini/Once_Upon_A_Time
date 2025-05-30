
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
// import p1 from "./assets/books/p1.png";
// import p2 from "./assets/books/p2.png";
// import p3 from "./assets/books/p3.png";
// import p4 from "./assets/books/p4.png";
// import { motion } from "framer-motion";

//const bookImages = [p1, p2, p3, p4];

const BookTitleInput = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Generate or retrieve userId
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = `user_${Date.now()}`;
      localStorage.setItem("userId", userId);
    }
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (savedData.title) {
      setTitle(savedData.title);
    }
  }, []);

  const handleNext = () => {
    const userId = localStorage.getItem("userId");
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    savedData.title = title;
    savedData.userId = userId;
    localStorage.setItem("storyData", JSON.stringify(savedData));
    navigate("/DedicationPage");
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
<div className="relative flex justify-center items-center min-h-screen  overflow-hidden">      {/* {floatingBooks.map((book) => (
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
      {/* <div className="bg-[#e6d5f7] shadow-lg rounded-xl p-8 w-[700px] border border-gray-300 relative z-10"> */}
        <div className="flex justify-center items-center  px-6 py-3 rounded-t-lg">
          
          
          <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r  from-blue-500  bg-purple-700 to-pink-600">Book Title</h1>        </div>
        <p className="text-gray-600 mt-2 text-lg text-center">
          <span className="text-sm">Note: You can always edit the title later.</span>
        </p>
        <div className="mt-6 text-left">
          <label className="text-sm font-bold text-gray-700">Title of Book</label>
          <input
            type="text"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter your book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button 
          onClick={handleNext} 
          disabled={!title.trim()}  
          className={`mt-6 w-full text-white font-bold py-3 rounded-full text-lg transition duration-200 hover:scale-105 ${
            title.trim() 
              ? "bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white font-bold hover:bg-purple-900"
              : "bg-gray-400 cursor-not-allowed"
          }`}>
           NEXT ❯❯
        </button>
      </div>
    </div>
  );
};

export default BookTitleInput;