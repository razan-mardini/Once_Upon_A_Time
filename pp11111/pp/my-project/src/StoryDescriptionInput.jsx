
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import "firebase/auth"; // لازم هذا عشان نقدر نجيب التوكن

const StoryDescriptionInput = () => {
  const [storyDescription, setStoryDescription] = useState("");
  const [numPages, setNumPages] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("storyData")) || {};
    if (savedData.storyDescription) {
      setStoryDescription(savedData.storyDescription);
    }
    if (savedData.numPages) {
      setNumPages(savedData.numPages);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const completeStory = JSON.parse(localStorage.getItem("storyData")) || {};
      completeStory.storyDescription = storyDescription;
      completeStory.numPages = numPages;

      localStorage.setItem("storyData", JSON.stringify(completeStory));

      navigate("/LoadingPage");


    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen  overflow-hidden">
      
    <div className="shadow-lg rounded-xl p-8 w-[700px] border-2 border-purple-900 relative z-10"> 
        <h2 className="text-2xl font-bold text-gray-800 text-center">Describe <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500  bg-purple-700 to-pink-600">Your Story</span></h2>
        <p className="text-gray-600 mt-2 text-lg text-center">
          <span className="text-sm">Note: You can refine your story description later.</span>
        </p>
        <div className="mt-6 text-left">
          <label className="text-sm font-bold text-gray-700">Number of Pages</label>
          <input
            type="number"
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter number of pages..."
            value={numPages}
            onChange={(e) => setNumPages(e.target.value)}
          />
        </div>
        <div className="mt-6 text-left">
          <label className="text-sm font-bold text-gray-700">Story Description</label>
          <textarea
            className="w-full p-2 border border-black rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-sm"
            placeholder="Enter your story description..."
            rows="4"
            value={storyDescription}
            onChange={(e) => setStoryDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-gradient-to-r from-blue-500  bg-purple-700 to-pink-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-purple-900 transition


duration-200 hover:scale-105"
        >
          GENERATE STORY ➤
        </button>
      </div>
    </div>
  );
};

export default StoryDescriptionInput;