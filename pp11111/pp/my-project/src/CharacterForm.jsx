import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { motion } from "framer-motion";

const CharacterForm = () => {
  const [character, setCharacter] = useState({
    mainCharacter: "",
    characterName: "",
    age: "",
    skinTone: "",
    hairColor: "",
    accessories: "",
  });
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
    if (savedData.character) {
      setCharacter(savedData.character);
    }
  }, []);

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const userId = localStorage.getItem("userId");
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    savedData.character = character;
    savedData.userId = userId;
    localStorage.setItem("storyData", JSON.stringify(savedData));
    navigate("/CharacterTraitForm");
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
      {/* <div className="bg-[#e6d5f7] shadow-lg rounded-xl p-8 w-[700px] border border-gray-300 relative z-10"> */}
      <div className="shadow-lg rounded-xl p-8 w-[700px] border-2 border-purple-900 relative z-10">        

        <h2 className="text-2xl font-bold text-gray-800 text-center">Who are the<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500  bg-purple-700 to-pink-600">
        {" "}character(s)?</span></h2>
        <p className="text-gray-600 mt-2 text-lg text-center">
          Who are the characters in the story? What are their names? Do you have any images of them that you would like our graphic designers to incorporate in the story?
        </p>
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700">Who is the <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500  bg-purple-700 to-pink-600">Main Character?</span></label>
          <input
            type="text"
            name="mainCharacter"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="It can be a girl, boy, animal (dog, cat), imaginary"
            value={character.mainCharacter}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Name of Main Character</label>
          <input
            type="text"
            name="characterName"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter character name..."
            value={character.characterName}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">How old is the main character?</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter age..."
            value={character.age}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">What is the skin tone of the Main Character?</label>
          <input
            type="text"
            name="skinTone"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter skin tone..."
            value={character.skinTone}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">What is the hair color of the Main Character?</label>
          <input
            type="text"
            name="hairColor"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter hair color..."
            value={character.hairColor}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Does the main character wear any accessories?</label>
          <input
            type="text"
            name="accessories"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter accessories..."
            value={character.accessories}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={() => navigate("/RecipientInfoPage")} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full text-lg">
            ❮ PREVIOUS
          </button>
          <button onClick={handleNext} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full text-lg">
            NEXT ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;
