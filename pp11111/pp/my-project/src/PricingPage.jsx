
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { getDocs, collection } from "firebase/firestore";
// import { auth, db } from "./config/firebase";

// export default function PricingPage() {
//   const [cartStories, setCartStories] = useState([]);

//   useEffect(() => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const snapshot = await getDocs(collection(db, "users", user.uid, "stories"));
//         const allStories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//         const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//         const cart = savedCart.map((cartStory) =>
//           allStories.find((story) => story.id === cartStory.id)
//         ).filter(Boolean);

//         setCartStories(cart);
//       }
//     });
//   }, []);

//   const pricePerPage = 1.5;

//   const calculateStoryPrice = (pages) => {
//     const count = pages?.length || 0;
//     return count * pricePerPage;
//   };

//   const totalPrice = cartStories.reduce(
//     (total, story) => total + calculateStoryPrice(story.pages),
//     0
//   );

//   return (
//     <div className="min-h-screen px-4 py-8 bg-[#fffdfc]">
//       <h1 className="text-3xl font-bold text-purple-700 mb-6">💰 Story Pricing</h1>

//       {cartStories.length === 0 ? (
//         <p className="text-gray-500">No stories in cart.</p>
//       ) : (
//         <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-md">
//           <ul className="space-y-4 mb-6">
//             {cartStories.map((story) => {
//               const pageCount = story.pages?.length || 0;
//               const price = calculateStoryPrice(story.pages).toFixed(2);
//               return (
//                 <li
//                   key={story.id}
//                   className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
//                 >
//                   <h3 className="text-lg font-bold text-purple-800">{story.title}</h3>
//                   <p className="text-sm text-gray-600">
//                     {pageCount} pages × ${pricePerPage.toFixed(2)} ={" "}
//                     <span className="text-green-600 font-medium">${price}</span>
//                   </p>
//                 </li>
//               );
//             })}
//           </ul>

//           <div className="text-right border-t pt-4 mt-4">
//             <p className="text-xl font-bold text-purple-800">
//               Total: ${totalPrice.toFixed(2)}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "./config/firebase";

export default function PricingPage() {
  const [cartStories, setCartStories] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDocs(collection(db, "users", user.uid, "stories"));
        const allStories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const cart = savedCart
          .map((cartStory) =>
            allStories.find((story) => story.id === cartStory.id)
          )
          .filter(Boolean);

        setCartStories(cart);
      }
    });
  }, []);

  const pricePerPage = 0.5;

  const calculateStoryPrice = (story) => {
    const count = Array.isArray(story.generatedStory)
      ? story.generatedStory.length
      : parseInt(story.numPages || "0", 10);
    return count * pricePerPage;
  };

  const totalPrice = cartStories.reduce(
    (total, story) => total + calculateStoryPrice(story),
    0
  );

  return (
    <div className="min-h-screen px-4 py-8 bg-[#fffdfc]">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">💰 Story Pricing</h1>

      {cartStories.length === 0 ? (
        <p className="text-gray-500">No stories in cart.</p>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-md">
          <ul className="space-y-4 mb-6">
            {cartStories.map((story) => {
              const pageCount = Array.isArray(story.generatedStory)
                ? story.generatedStory.length
                : parseInt(story.numPages || "0", 10);

              const price = calculateStoryPrice(story).toFixed(2);

              return (
                <li
                  key={story.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-purple-800">{story.title}</h3>
                  <p className="text-sm text-gray-600">
                    {pageCount} pages × ${pricePerPage.toFixed(2)} ={" "}
                    <span className="text-green-600 font-medium">${price}</span>
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="text-right border-t pt-4 mt-4">
            <p className="text-xl font-bold text-purple-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
