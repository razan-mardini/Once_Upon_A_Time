import { useState } from "react";
import { motion } from "framer-motion";

const CharacterPage = () => {
  const [character, setCharacter] = useState({
    type: "",
    name: "",
    age: "",
    skinTone: "",
    hairColor: "",
    accessories: "",
  });

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-400 via-purple-600 to-blue-400 overflow-hidden">
      {/* Floating Pages Across the Entire Page */}
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-10 h-14 bg-white opacity-30 rounded-sm shadow-lg"
          style={{ 
            left: `${Math.random() * 100}%`, 
            transform: `rotate(${Math.random() * 30 - 15}deg)` 
          }}
          initial={{ y: "100vh", opacity: 0, rotate: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: [0, 20, -20, 0] }}
          transition={{
            duration: Math.random() * 6 + 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
      
      <div className="bg-[#e6d5f7] shadow-lg rounded-xl p-8 w-[700px] border border-gray-300 relative z-10">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">Who are the character(s)?</h2>
        <p className="text-gray-600 text-center text-sm mt-1">
          Who are the characters in the story? What are their names? Do you have any images of them that you would like our graphic designers to incorporate in the story?
        </p>

        {/* Input Fields */}
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700">Who is the Main Character?</label>
          <input
            type="text"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="It can be a girl, boy, animal (dog, cat), imaginary"
            value={character.type}
            onChange={(e) => setCharacter({ ...character, type: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Name of Main Character</label>
          <input
            type="text"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter character name..."
            value={character.name}
            onChange={(e) => setCharacter({ ...character, name: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">How old is the main character?</label>
          <input
            type="number"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter age..."
            value={character.age}
            onChange={(e) => setCharacter({ ...character, age: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">What is the skin tone of the Main Character?</label>
          <input
            type="text"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter skin tone..."
            value={character.skinTone}
            onChange={(e) => setCharacter({ ...character, skinTone: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">What is the hair color of the Main Character?</label>
          <input
            type="text"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter hair color..."
            value={character.hairColor}
            onChange={(e) => setCharacter({ ...character, hairColor: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700">Does the main character wear any accessories?</label>
          <input
            type="text"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter accessories..."
            value={character.accessories}
            onChange={(e) => setCharacter({ ...character, accessories: e.target.value })}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">❮ PREVIOUS</button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition">NEXT ❯</button>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
