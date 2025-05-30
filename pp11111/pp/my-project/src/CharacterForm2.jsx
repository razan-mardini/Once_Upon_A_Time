
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { motion } from "framer-motion";

const CharacterForm2 = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState({
    characterTrait: "",
    characterName: "",
    relationship: "",
    age: "",
    skinTone: "",
    hairColor: "",
    accessories: ""
  });
  const [showRelationshipTooltip, setShowRelationshipTooltip] = useState(false);

  // Load existing character data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (!Array.isArray(savedData.characters)) {
      savedData.characters = [];
    }
    localStorage.setItem("storyData", JSON.stringify(savedData));
  }, []);

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const saveCharacterToLocalStorage = () => {
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (!Array.isArray(savedData.characters)) {
      savedData.characters = [];
    }
    savedData.characters.push(character);
    localStorage.setItem("storyData", JSON.stringify(savedData));
  };

  const handleNext = () => {
    saveCharacterToLocalStorage();
    navigate("/CharacterForm3");
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
          <label className="block text-sm font-bold text-gray-700">Who is this Character?</label>
          <input type="text" name="characterTrait" className="w-full p-2 border border-black rounded-md mt-1" placeholder="It can be a girl, boy, animal (dog, cat), imaginary" value={character.characterTrait} onChange={handleChange} />
          
          <label className="block text-sm font-bold text-gray-700 mt-3">Name of Character</label>
          <input type="text" name="characterName" className="w-full p-2 border border-black rounded-md mt-1" value={character.characterName} onChange={handleChange} />
          
          <label className=" text-sm font-bold text-gray-700 mt-3 flex items-center">
            Relationship to Main or Additional Characters, if any
            <span className="ml-2 text-gray-500 cursor-pointer relative" onMouseEnter={() => setShowRelationshipTooltip(true)} onMouseLeave={() => setShowRelationshipTooltip(false)}>
              ❓
              {showRelationshipTooltip && (
                <div className="absolute left-0 mt-2 w-64 p-2 bg-gray-200 text-gray-700 text-xs rounded-lg shadow-lg">
                  Specify the relationship between multiple characters of the story.
                </div>
              )}
            </span>
          </label>
          <input type="text" name="relationship" className="w-full p-2 border border-black rounded-md mt-1" value={character.relationship} onChange={handleChange} />
          
          <label className="block text-sm font-bold text-gray-700 mt-3">How old is this character?</label>
          <input type="number" name="age" className="w-full p-2 border border-black rounded-md mt-1" value={character.age} onChange={handleChange} />
          
          <label className="block text-sm font-bold text-gray-700 mt-3">What is the skin tone of this Character?</label>
          <input type="text" name="skinTone" className="w-full p-2 border border-black rounded-md mt-1" value={character.skinTone} onChange={handleChange} />
          
          <label className="block text-sm font-bold text-gray-700 mt-3">What is the hair color of this Character?</label>
          <input type="text" name="hairColor" className="w-full p-2 border border-black rounded-md mt-1" value={character.hairColor} onChange={handleChange} />
          
          <label className="block text-sm font-bold text-gray-700 mt-3">Does this character wear any accessories?</label>
          <input type="text" name="accessories" className="w-full p-2 border border-black rounded-md mt-1" value={character.accessories} onChange={handleChange} />
        </div>
        
        <button onClick={handleNext} className="mt-6 w-full bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-purple-900 transition duration-200 hover:scale-105">
        NEXT ❯❯
        </button>
      </div>
    </div>
  );
};

export default CharacterForm2;
