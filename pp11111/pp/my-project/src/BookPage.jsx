
// // import { useState, useEffect, useRef } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import HTMLFlipBook from "react-pageflip";
// // import { auth } from "./config/firebase";
// // import { doc, getDoc } from "firebase/firestore";
// // import { db } from "./config/firebase"; // تأكد إنه عندك db = getFirestore(firebaseApp)
// // const SERVER_URL = "http://localhost:5004"; // أو رابط السيرفر الحقيقي لما ترفعه

// // const BookPage = () => {
// //   const { storyId } = useParams();
// //   const [storyPages, setStoryPages] = useState([]);
// //   const [imageUrls, setImageUrls] = useState([]);
// //   const [title, setTitle] = useState("Front Cover");
// //   const [dedication, setDedication] = useState("");
// //   const [recipient, setRecipient] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const bookRef = useRef(null);
// //   const flipSound = new Audio("/page-flip-47177.mp3");

// //   useEffect(() => {
// //     const fetchStory = async () => {
// //       try {
// //         if (!storyId) {
// //           console.error("❌ No story ID in URL!");
// //           setIsLoading(false);
// //           return;
// //         }

// //         const user = auth.currentUser;
// //         if (!user) {
// //           console.error("❌ No user ID available. User must be logged in!");
// //           setIsLoading(false);
// //           return;
// //         }

// //         const userId = user.uid;
// //         console.log("Received storyId:", storyId);
// //         console.log("Received userId:", userId);

// //         const docRef = doc(db, "users", userId, "stories", storyId);
// //         const docSnap = await getDoc(docRef);

// //         if (docSnap.exists()) {
// //           const data = docSnap.data();
// //           // const storyPages = Array.isArray(data.pages)
// //           //   ? data.pages
// //           //   : (data.pages || "").split("\n\n");
// //           const storyPages = Array.isArray(data.generatedStory)
// //   ? data.generatedStory
// //   : (data.generatedStory || "").split("\n\n");
// //   // const storyPages = Array.isArray(data.pages )
// //   // ? data.pages 
// //   // : (data.pages  || "").split("\n\n");


// //           setTitle(data.title || "Front Cover");
// //           setDedication(data.dedication || "");
// //           setRecipient(data.recipient || null);
// //           setStoryPages(storyPages);
// //           setImageUrls(data.imageUrls || []);
// //         } else {
// //           console.warn("⚠️ Story not found in Firestore");
// //         }
// //       } catch (error) {
// //         console.error("❌ Error fetching story:", error);
// //         setStoryPages([]);
// //         setImageUrls([]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchStory();
// //   }, [storyId]);

// //   const playFlipSound = () => {
// //     flipSound.currentTime = 0;
// //     flipSound.play().catch((err) => console.error("🎵 Error playing sound:", err));
// //   };

// //   const WatermarkOverlay = () => (
// //     <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
// //       <div className="w-full h-full flex flex-wrap items-center justify-center gap-6 rotate-[-20deg]">
// //         {Array.from({ length: 25 }).map((_, i) => (
// //           <span
// //             key={i}
// //             className="text-2xl text-black font-bold whitespace-nowrap"
// //             style={{ userSelect: "none" }}
// //           >
// //             © copyright
// //           </span>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   if (isLoading) {
// //     return <p className="text-lg font-serif text-center">📖 Loading book...</p>;
// //   }

// //   if (storyPages.length === 0) {
// //     return (
// //       <div className="text-center">
// //         <p className="text-lg font-serif text-red-500">
// //           ⚠️ No story found! Please generate a story first.
// //         </p>
// //         <Link to="/">
// //           <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-700">
// //             Go Back
// //           </button>
// //         </Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5efe8] px-4">
// //       <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
// //         📖 Interactive Storybook
// //       </h2>

// //       <div className="relative w-[900px] h-[600px] bg-[#f5efe8] shadow-2xl rounded-lg flex justify-center items-center border-[10px] border-green-700 p-2">
// //         <HTMLFlipBook
// //           width={400}
// //           height={550}
// //           size="fixed"
// //           minWidth={350}
// //           maxWidth={850}
// //           minHeight={450}
// //           maxHeight={650}
// //           drawShadow={true}
// //           maxShadowOpacity={0.8}
// //           startPage={0}
// //           flippingTime={1000}
// //           showCover={true}
// //           mobileScrollSupport={true}
// //           ref={bookRef}
// //           className="rounded-md overflow-hidden"
// //           onStartFlip={playFlipSound}
// //         >
// //           {/* Front Cover */}
// //           <div className="relative w-full h-full flex justify-center items-center bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-2xl shadow-xl rounded-md">
// //             <WatermarkOverlay />
// //             {title}
// //           </div>

// //           {/* Dedication Page */}
// //           <div className="relative w-full h-full flex flex-col justify-center items-center bg-white shadow-md px-10">
// //             <WatermarkOverlay />
// //             <h3 className="text-xl font-serif font-bold">Dedication</h3>
// //             <p className="text-lg font-serif mt-2">{dedication}</p>
// //             {recipient && (
// //               <p className="text-lg font-serif mt-2">
// //                 For {recipient.name}, Age {recipient.age}
// //               </p>
// //             )}
// //           </div>

// //           {/* Story Pages */}
// //           {storyPages.map((page, index) => (
// //             <div
// //               key={index}
// //               className="relative w-full h-full flex flex-col justify-center items-center bg-white shadow-md px-10"
// //             >
// //               <WatermarkOverlay />
// //               <p className="text-lg font-serif mt-4 text-center break-words max-h-[300px] overflow-auto z-10">
// //                 {page}
// //               </p>

// //               {/* {imageUrls[index] ? (
// //                 <div className="mt-4 w-full flex justify-center items-center z-10">
// //                   <img
// //                     src={imageUrls[index]}
// //                     alt={`Story Image ${index + 1}`}
// //                     className="max-w-full max-h-[300px] object-contain"
// //                     onError={(e) => {
// //                       e.target.style.display = "none";
// //                     }}
// //                   />
// //                 </div>
// //               ) : (
// //                 <p className="text-gray-400 text-sm z-10">🚫 No Image Available</p>
// //               )} */}
// //               {Array.isArray(imageUrls) && imageUrls[index] ? (
// //   <div className="mt-4 w-full flex justify-center items-center z-10">
// //     <img
// //       src={imageUrls[index]}
// //       alt={`Story Image ${index + 1}`}
// //       className="max-w-full max-h-[300px] object-contain"
// //       onError={(e) => {
// //         e.target.style.display = "none";
// //       }}
// //     />
// //   </div>
// // ) : null}

// //             </div>
// //           ))}

// //           {/* Back Cover */}
// //           <div className="relative w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-2xl shadow-xl rounded-md">
// //             <WatermarkOverlay />
// //             📘 Back Cover
// //           </div>
// //         </HTMLFlipBook>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookPage;

// import { useState, useEffect, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import HTMLFlipBook from "react-pageflip";
// import { auth } from "./config/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "./config/firebase"; // تأكد إنه عندك db = getFirestore(firebaseApp)
// const SERVER_URL = "http://localhost:5004"; // أو رابط السيرفر الحقيقي لما ترفعه

// const BookPage = () => {
//  // const SERVER_URL = "http://localhost:5004"; // أو رابط السيرفر الحقيقي لما ترفعه
//   const { storyId } = useParams();
//   const [storyPages, setStoryPages] = useState([]);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [title, setTitle] = useState("Front Cover");
//   const [dedication, setDedication] = useState("");
//   const [recipient, setRecipient] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const bookRef = useRef(null);
//   const flipSound = new Audio("/page-flip-47177.mp3");

//   useEffect(() => {
//     const fetchStory = async () => {
//       try {
//         if (!storyId) {
//           console.error("❌ No story ID in URL!");
//           setIsLoading(false);
//           return;
//         }

//         const user = auth.currentUser;
//         if (!user) {
//           console.error("❌ No user ID available. User must be logged in!");
//           setIsLoading(false);
//           return;
//         }

//         const userId = user.uid;
//         console.log("Received storyId:", storyId);
//         console.log("Received userId:", userId);

//         const docRef = doc(db, "users", userId, "stories", storyId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           // const storyPages = Array.isArray(data.pages)
//           //   ? data.pages
//           //   : (data.pages || "").split("\n\n");
//           const storyPages = Array.isArray(data.generatedStory)
//   ? data.generatedStory
//   : (data.generatedStory || "").split("\n\n");
//   // const storyPages = Array.isArray(data.pages )
//   // ? data.pages 
//   // : (data.pages  || "").split("\n\n");


//           setTitle(data.title || "Front Cover");
//           setDedication(data.dedication || "");
//           setRecipient(data.recipient || null);
//           setStoryPages(storyPages);
//           setImageUrls(data.imageUrls || []);
//         } else {
//           console.warn("⚠️ Story not found in Firestore");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching story:", error);
//         setStoryPages([]);
//         setImageUrls([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStory();
//   }, [storyId]);

//   const playFlipSound = () => {
//     flipSound.currentTime = 0;
//     flipSound.play().catch((err) => console.error("🎵 Error playing sound:", err));
//   };

//   const WatermarkOverlay = () => (
//     <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
//       <div className="w-full h-full flex flex-wrap items-center justify-center gap-6 rotate-[-20deg]">
//         {Array.from({ length: 25 }).map((_, i) => (
//           <span
//             key={i}
//             className="text-2xl text-black font-bold whitespace-nowrap"
//             style={{ userSelect: "none" }}
//           >
//             © copyright
//           </span>
//         ))}
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return <p className="text-lg font-serif text-center">📖 Loading book...</p>;
//   }

//   if (storyPages.length === 0) {
//     return (
//       <div className="text-center">
//         <p className="text-lg font-serif text-red-500">
//           ⚠️ No story found! Please generate a story first.
//         </p>
//         <Link to="/">
//           <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-700">
//             Go Back
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5efe8] px-4">
//       <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
//         📖 Interactive Storybook
//       </h2>

//       <div className="relative w-[900px] h-[600px] bg-[#f5efe8] shadow-2xl rounded-lg flex justify-center items-center border-[10px] border-green-700 p-2">
//         <HTMLFlipBook
//           width={400}
//           height={550}
//           size="fixed"
//           minWidth={350}
//           maxWidth={850}
//           minHeight={450}
//           maxHeight={650}
//           drawShadow={true}
//           maxShadowOpacity={0.8}
//           startPage={0}
//           flippingTime={1000}
//           showCover={true}
//           mobileScrollSupport={true}
//           ref={bookRef}
//           className="rounded-md overflow-hidden"
//           onStartFlip={playFlipSound}
//         >
//           {/* Front Cover */}
//           <div className="relative w-full h-full flex justify-center items-center bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-2xl shadow-xl rounded-md">
//             <WatermarkOverlay />
//             {title}
//           </div>

//           {/* Dedication Page */}
//           <div className="relative w-full h-full flex flex-col justify-center items-center bg-white shadow-md px-10">
//             <WatermarkOverlay />
//             <h3 className="text-xl font-serif font-bold">Dedication</h3>
//             <p className="text-lg font-serif mt-2">{dedication}</p>
//             {recipient && (
//               <p className="text-lg font-serif mt-2">
//                 For {recipient.name}, Age {recipient.age}
//               </p>
//             )}
//           </div>

//           {/* Story Pages */}
//           {storyPages.map((page, index) => (
//             <div
//               key={index}
//               className="relative w-full h-full flex flex-col justify-center items-center bg-white shadow-md px-10"
//             >
//               <WatermarkOverlay />
//               <p className="text-lg font-serif mt-4 text-center break-words max-h-[300px] overflow-auto z-10">
//                 {page}
//               </p>

//               {/* {imageUrls[index] ? (
//                 <div className="mt-4 w-full flex justify-center items-center z-10">
//                   <img
//                     src={imageUrls[index]}
//                     alt={`Story Image ${index + 1}`}
//                     className="max-w-full max-h-[300px] object-contain"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <p className="text-gray-400 text-sm z-10">🚫 No Image Available</p>
//               )} */}
//               {Array.isArray(imageUrls) && imageUrls[index] ? (
//   <div className="mt-4 w-full flex justify-center items-center z-10">
//     <img
//       src={imageUrls[index]}
//       alt={`Story Image ${index + 1}`}
//       className="max-w-full max-h-[300px] object-contain"
//       onError={(e) => {
//         e.target.style.display = "none";
//       }}
//     />
//   </div>
// ) : null}

//             </div>
//           ))}

//           {/* Back Cover */}
//           <div className="relative w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-2xl shadow-xl rounded-md">
//             <WatermarkOverlay />
//             📘 Back Cover
//           </div>
//         </HTMLFlipBook>
//       </div>
//     </div>
//   );
// };

// export default BookPage;
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { auth } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase"; // تأكد إنه عندك db = getFirestore(firebaseApp)

const SERVER_URL = "http://localhost:5004"; // مسار السيرفر المحلي أو رابط السيرفر الحقيقي

const BookPage = () => {
  const { storyId } = useParams();
  const [storyPages, setStoryPages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState("Front Cover");
  const [dedication, setDedication] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const bookRef = useRef(null);
  const flipSound = new Audio("/page-flip-47177.mp3");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        if (!storyId) {
          console.error("❌ No story ID in URL!");
          setIsLoading(false);
          return;
        }

        const user = auth.currentUser;
        if (!user) {
          console.error("❌ No user ID available. User must be logged in!");
          setIsLoading(false);
          return;
        }

        const userId = user.uid;
        console.log("Received storyId:", storyId);
        console.log("Received userId:", userId);

        const docRef = doc(db, "users", userId, "stories", storyId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const storyPages = Array.isArray(data.generatedStory)
            ? data.generatedStory
            : (data.generatedStory || "").split("\n\n");

          setTitle(data.title || "Front Cover");
          setDedication(data.dedication || "");
          setRecipient(data.recipient || null);
          setStoryPages(storyPages);
          setImageUrls(data.imageUrls || []);
        } else {
          console.warn("⚠️ Story not found in Firestore");
        }
      } catch (error) {
        console.error("❌ Error fetching story:", error);
        setStoryPages([]);
        setImageUrls([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  const playFlipSound = () => {
    flipSound.currentTime = 0;
    flipSound.play().catch((err) => console.error("🎵 Error playing sound:", err));
  };

  // const WatermarkOverlay = () => (
  //   <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
  //     <div className="w-full h-full flex flex-wrap items-center justify-center gap-6 rotate-[-20deg]">
  //       {Array.from({ length: 25 }).map((_, i) => (
  //         <span
  //           key={i}
  //           className="text-2xl text-black font-bold whitespace-nowrap"
  //           style={{ userSelect: "none" }}
  //         >
  //           © copyright
  //         </span>
  //       ))}
  //     </div>
  //   </div>
  // );
  const WatermarkOverlay = () => (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="w-full h-full flex flex-wrap items-center justify-center gap-12 rotate-[-20deg]">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="text-2xl font-bold whitespace-nowrap"
            style={{
              color: "rgba(0, 0, 0, 0.3)", // أسود فاتح جداً
              userSelect: "none",
            }}
          >
            © copyright
          </span>
        ))}
      </div>
    </div>
  );
  
  if (isLoading) {
    return <p className="text-lg font-serif text-center">📖 Loading book...</p>;
  }

  if (storyPages.length === 0) {
    return (
      <div className="text-center">
        <p className="text-lg font-serif text-red-500">
          ⚠️ No story found! Please generate a story first.
        </p>
        <Link to="/">
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-700">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5efe8] px-4">
      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
        📖 Interactive Storybook
      </h2>

      <div className="relative w-[900px] h-[600px] bg-[#f5efe8] shadow-2xl rounded-lg flex justify-center items-center border-[10px] border-green-700 p-2">
        <HTMLFlipBook
          width={400}
          height={550}
          size="fixed"
          minWidth={350}
          maxWidth={850}
          minHeight={450}
          maxHeight={650}
          drawShadow={true}
          maxShadowOpacity={0.8}
          startPage={0}
          flippingTime={1000}
          showCover={true}
          mobileScrollSupport={true}
          ref={bookRef}
          className="rounded-md overflow-hidden"
          onStartFlip={playFlipSound}
        >
          {/* Front Cover */}
          <div className="relative w-full h-full flex justify-center items-center bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-2xl shadow-xl rounded-md">
            <WatermarkOverlay />
            {title}
          </div>

          {/* Dedication Page */}
          <div className="relative w-full h-full flex flex-col justify-center items-center bg-white shadow-md px-10">
            <WatermarkOverlay />
            <h3 className="text-xl font-serif font-bold">Dedication</h3>
            <p className="text-lg font-serif mt-2">{dedication}</p>
            {recipient && (
              <p className="text-lg font-serif mt-2">
                For {recipient.name}, Age {recipient.age}
              </p>
            )}
          </div>

          {/* Story Pages */}
          {storyPages.map((page, index) => (
            <div
              key={index}
              className="relative w-full h-full flex flex-col justify-center items-center bg-white shadow-md px-10"
            >
              <WatermarkOverlay />
              <p className="text-lg font-serif mt-4 text-center break-words max-h-[300px] overflow-auto z-10">
                {page}
              </p>

              {/* {Array.isArray(imageUrls) && imageUrls[index] ? (
                <div className="mt-4 w-full flex justify-center items-center z-10">
                  <img
                    src={
                      imageUrls[index].startsWith("http")
                        ? imageUrls[index]
                        : `${SERVER_URL}/images/${imageUrls[index]}`
                    }
                    alt={`Story Image ${index + 1}`}
                    className="max-w-full max-h-[300px] object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <p className="text-gray-400 text-sm z-10">🚫 No Image Available</p>
              )} */}
              {Array.isArray(imageUrls) && imageUrls[index] ? (
  <div className="mt-4 w-full flex justify-center items-center z-10">
    <img
      src={imageUrls[index].startsWith("http")
        ? imageUrls[index]
        : `${SERVER_URL}${imageUrls[index]}`}
      alt={`Story Image ${index + 1}`}
      className="max-w-full max-h-[300px] object-contain"
      onError={(e) => {
        console.error("Image failed to load:", e.target.src);
        e.target.style.display = "none";
      }}
    />
  </div>
) : (
  <p className="text-gray-400 text-sm z-10">🚫 No Image Available</p>
)}

            </div>
          ))}

          {/* Back Cover */}
          <div className="relative w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-2xl shadow-xl rounded-md">
            <WatermarkOverlay />
            📘 Back Cover
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default BookPage;
