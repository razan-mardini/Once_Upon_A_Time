// import { doc, collection, addDoc } from "firebase/firestore";
// import { auth, db } from "../config/firebase";

// export const saveStoryToFirestore = async (storyData) => {
//   const user = auth.currentUser;
//   if (!user) {
//     throw new Error("User not authenticated");
//   }

//   const userDocRef = doc(db, "users", user.uid);
//   const storiesCollectionRef = collection(userDocRef, "stories");

//   await addDoc(storiesCollectionRef, {
//     ...storyData,
//     createdAt: new Date(),
//   });
// };
///////////////////////////////////////////////////////////////////////////////////
// import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../config/firebase";

// /**
//  * Saves a story to Firestore under the authenticated user's stories collection.
//  * @param {Object} storyData - An object containing story title, cover, pages, etc.
//  * @returns {string} The ID of the newly created story document.
//  */
// export const saveStoryToFirestore = async (storyData) => {
//   const user = auth.currentUser;

//   // Check if user is logged in
//   if (!user) {
//     throw new Error("User not authenticated");
//   }

//   // Optional: Validate incoming data
//   if (!storyData?.title || !storyData?.pages) {
//     throw new Error("Invalid story data");
//   }

//   // Get reference to: users/{userId}/stories
//   const userDocRef = doc(db, "users", user.uid);
//   const storiesCollectionRef = collection(userDocRef, "stories");

//   // Add new story
//   const docRef = await addDoc(storiesCollectionRef, {
//     ...storyData,
//     createdAt: serverTimestamp(), // Firebase server timestamp
//   });

//   return docRef.id;
// };
//////////////////////////////////////////
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

/**
 * Saves a story to Firestore under the authenticated user's stories collection.
 * @param {Object} storyData - An object containing story title, cover, pages, etc.
 * @returns {string} The ID of the newly created story document.
 */
export const saveStoryToFirestore = async (storyData) => {
  const user = auth.currentUser;

  // Check if user is logged in
  if (!user) {
    throw new Error(
      "User not authenticated. Please log in to save your story."
    );
  }

  // Optional: Validate incoming data
  if (
    !storyData?.title ||
    !storyData?.pages ||
    !Array.isArray(storyData.pages) ||
    storyData.pages.length === 0
  ) {
    throw new Error(
      "Invalid story data: title and pages are required, and pages should be an array."
    );
  }

  // Get reference to: users/{userId}/stories
  const userDocRef = doc(db, "users", user.uid);
  const storiesCollectionRef = collection(userDocRef, "stories");

  try {
    // Add new story
    const docRef = await addDoc(storiesCollectionRef, {
      ...storyData,
      createdAt: serverTimestamp(), // Firebase server timestamp
    });

    console.log("Story saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving story to Firestore:", error);
    throw new Error(
      "There was an error saving your story. Please try again later."
    );
  }
};
