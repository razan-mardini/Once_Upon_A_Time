import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { motion } from "framer-motion";

const CharacterForm3 = () => {
  const navigate = useNavigate();
  const [characterTraits, setCharacterTraits] = useState({
    physicalAppearance: "",
    image: null,
  });
  const [showAppearanceTooltip, setShowAppearanceTooltip] = useState(false);

  // Load existing character data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (!Array.isArray(savedData.characters)) {
      savedData.characters = [];
    }
    setCharacterTraits({
      physicalAppearance: savedData.characters[savedData.characters.length - 1]?.physicalAppearance || "",
      image: null,
    });
  }, []);

  const handleChange = (e) => {
    setCharacterTraits({ ...characterTraits, [e.target.name]: e.target.value });
  };

  const saveCharacterToLocalStorage = () => {
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (!Array.isArray(savedData.characters)) {
      savedData.characters = [];
    }
    savedData.characters[savedData.characters.length - 1] = {
      ...savedData.characters[savedData.characters.length - 1],
      ...characterTraits,
    };
    localStorage.setItem("storyData", JSON.stringify(savedData));
  };

  const handleNext = () => {
    saveCharacterToLocalStorage();
    navigate("/StoryDescriptionInput");
  };

  const handleAddCharacter = () => {
    saveCharacterToLocalStorage();
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

        <div className="mt-6 text-left border-b pb-4">
          <label className="block text-sm font-bold text-gray-700">Description of Physical Appearance</label>
          <div className="relative">
            <input
              type="text"
              name="physicalAppearance"
              className="w-full p-2 border border-black rounded-md mt-1"
              placeholder="Provide a description..."
              value={characterTraits.physicalAppearance}
              onChange={handleChange}
            />
            <span
              className="absolute right-2 top-3 text-lg cursor-pointer"
              onMouseEnter={() => setShowAppearanceTooltip(true)}
              onMouseLeave={() => setShowAppearanceTooltip(false)}
            >❓</span>
            {showAppearanceTooltip && (
              <div className="absolute right-0 mt-2 w-64 p-2 bg-gray-200 text-gray-700 text-xs rounded-lg shadow-lg">
                Provide a description of the physical appearance of this character. Examples include:
                <ul className="list-disc ml-4">
                  <li>Gender (list pronouns)</li>
                  <li>Eye color</li>
                  <li>Hair color</li>
                  <li>Skin tone</li>
                  <li>Height</li>
                  <li>Weight</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Optional - Image of Character</label>
          <div className="border border-black rounded-md p-2 w-12 h-12 flex justify-center items-center cursor-pointer">
            <span className="text-xl">🖼️+</span>
          </div>
        </div> */}

        <button onClick={handleAddCharacter} className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900">
          ➕ Add Another Character
        </button>

        <div className="flex justify-between mt-6">
          <button onClick={() => navigate("/CharacterForm2")} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full text-lg hover:bg-purple-900 transition duration-200 hover:scale-105">❮ PREVIOUS</button>
          <button onClick={handleNext} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full text-lg hover:bg-purple-900 transition duration-200 hover:scale-105">NEXT ❯</button>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm3;
