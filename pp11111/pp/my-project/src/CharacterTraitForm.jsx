
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { motion } from "framer-motion";

const CharacterTraitForm = () => {
  const [characterTraits, setCharacterTraits] = useState({
    characterTrait: "",
    physicalAppearance: "",
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
    if (savedData.characterTraits) {
      setCharacterTraits(savedData.characterTraits);
    }
  }, []);

  const handleChange = (e) => {
    setCharacterTraits({ ...characterTraits, [e.target.name]: e.target.value });
  };

  const saveToLocalStorage = () => {
    const userId = localStorage.getItem("userId");
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (!Array.isArray(savedData.characters)) {
      savedData.characters = [];
    }
    savedData.characters.push(characterTraits);
    savedData.userId = userId;
    localStorage.setItem("storyData", JSON.stringify(savedData));
  };

  const handleNext = () => {
    saveToLocalStorage();
    navigate("/StoryDescriptionInput");
  };

  const handleAddCharacter = () => {
    saveToLocalStorage();
    setCharacterTraits({ characterTrait: "", physicalAppearance: "" });
    navigate("/CharacterForm2");
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
      <div className="shadow-lg rounded-xl p-8 w-[700px] border-2 border-purple-900 relative z-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Character<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500  bg-purple-700 to-pink-600"> Traits</span></h2>
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700">
            What is the character trait of the Main Character?
          </label>
          <input
            type="text"
            name="characterTrait"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Enter character trait..."
            value={characterTraits.characterTrait}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Description of Physical Appearance</label>
          <input
            type="text"
            name="physicalAppearance"
            className="w-full p-2 border border-black rounded-md mt-1"
            placeholder="Describe the character’s appearance..."
            value={characterTraits.physicalAppearance}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleAddCharacter}
            className="mt-4 text-purple-700 font-bold flex items-center"
          >
            ➕ Add Another Character
          </button>
          <button
            onClick={() => navigate("/CharacterForm")}
            className="bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white  font-bold px-6 py-3 rounded-lg text-lg"
          >
            ❮❮ PREVIOUS
          </button>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white font-bold px-6 py-3 rounded-lg text-lg"
          >
            NEXT ❯❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterTraitForm;
