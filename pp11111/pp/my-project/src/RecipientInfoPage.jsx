
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { motion } from "framer-motion";

const RecipientInfoPage = () => {
  const [recipient, setRecipient] = useState({ name: "", relationship: "", age: "", occasion: "", customOccasion: "" });
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
    if (savedData.recipient) {
      setRecipient(savedData.recipient);
    }
  }, []);

  const handleChange = (e) => {
    setRecipient({ ...recipient, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const userId = localStorage.getItem("userId");
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    savedData.recipient = recipient;
    savedData.userId = userId;
    localStorage.setItem("storyData", JSON.stringify(savedData));
    navigate("/CharacterForm");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen  overflow-hidden">
      {/* {Array.from({ length: 15 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-10 h-14 bg-white opacity-30 rounded-sm shadow-lg"
          style={{ left: `${Math.random() * 100}%`, transform: `rotate(${Math.random() * 30 - 15}deg)` }}
          initial={{ y: "100vh", opacity: 0, rotate: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: Math.random() * 6 + 5, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))} */}
<div className="shadow-lg rounded-xl p-8 w-[700px] border-2 border-purple-900 relative z-10">        <h2 className="text-2xl font-bold text-gray-800 text-center">Who is the  {" "}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500  bg-purple-700 to-pink-600">
          book for?  
            </span></h2>
        <p className="text-gray-600 text-center text-sm mt-1">
          We aim to evaluate the recipient’s reading level. For instance, is the content intended for a toddler or a loved one?
        </p>
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter name..."
            value={recipient.name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Relationship</label>
          <input
            type="text"
            name="relationship"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter relationship..."
            value={recipient.relationship}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter age..."
            value={recipient.age}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Occasion</label>
          <select
            name="occasion"
            className="w-full p-2 border border-black rounded-md mt-1"
            value={recipient.occasion}
            onChange={handleChange}
          >
            <option value="">Select an occasion...</option>
            <option>Birthday</option>
            <option>Christmas</option>
            <option>Valentine’s Day</option>
            <option>Graduation</option>
            <option>First day of school</option>
            <option>Other</option>
          </select>
        </div>
        {recipient.occasion === "Other" && (
          <div className="mt-4">
            <label className="block text-sm font-bold text-gray-700">Custom Occasion</label>
            <input
              type="text"
              name="customOccasion"
              className="w-full p-2 border border-black rounded-md mt-1"
              placeholder="Enter custom occasion..."
              value={recipient.customOccasion}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button onClick={() => navigate("/DedicationPage")} className="bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white font-bold px-6 py-3 rounded-lg text-lg">
          ❮❮ Back
          </button>
          <button onClick={handleNext} className="bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white font-bold px-6 py-3 rounded-lg text-lg">
            NEXT ❯❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientInfoPage;