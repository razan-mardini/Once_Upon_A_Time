// import React from "react";

// export default function PricingPage() {
//   const plans = [
//     {
//       name: "Free Explorer",
//       price: "$0",
//       description: "Start your storytelling journey for free!",
//       features: [
//         "Create up to 2 stories per month",
//         "Max 5 pages per story",
//         "1 AI-generated image per story",
//         "No PDF download",
//         "Basic support only",
//       ],
//       popular: false,
//     },
//     {
//       name: "Story Crafter",
//       price: "$6.99",
//       description: "Perfect for regular storytellers!",
//       features: [
//         "Up to 10 stories per month",
//         "Max 10 pages per story",
//         "Up to 3 AI-generated images per story",
//         "Download as PDF",
//         "Standard support",
//         "Access to story editing tools",
//       ],
//       popular: true,
//     },
//     {
//       name: "Master Author",
//       price: "$14.99",
//       description: "Unlimited creativity, unlimited stories!",
//       features: [
//         "Unlimited stories per month",
//         "Up to 20 pages per story",
//         "Unlimited AI-generated images",
//         "Download & Print ready PDFs",
//         "Priority support",
//         "Early access to new features",
//       ],
//       popular: false,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white px-4 py-12">
//       <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-4">Pricing Plans</h1>
//       <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
//         Choose the plan that fits your creativity. Whether you're writing bedtime stories or building a full book series, we've got a plan for you.
//       </p>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {plans.map((plan, idx) => (
//           <div
//             key={idx}
//             className={`rounded-2xl border p-6 shadow-md flex flex-col justify-between transition-transform hover:scale-105 ${
//               plan.popular
//                 ? "border-purple-500 bg-white ring-2 ring-purple-300"
//                 : "border-gray-300 bg-white"
//             }`}
//           >
//             {plan.popular && (
//               <span className="mb-2 inline-block text-sm bg-purple-500 text-white px-3 py-1 rounded-full">
//                 Most Popular
//               </span>
//             )}
//             <div>
//               <h2 className="text-xl font-bold text-purple-700 mb-1">{plan.name}</h2>
//               <p className="text-gray-600 mb-4">{plan.description}</p>
//               <p className="text-3xl font-extrabold text-purple-600 mb-6">
//                 {plan.price}
//                 <span className="text-sm font-normal text-gray-500"> / month</span>
//               </p>
//               <ul className="mb-6 space-y-3">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-start text-gray-700">
//                     <span className="text-green-500 mr-2 mt-1">✔</span>
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <button className="bg-purple-600 text-white font-semibold py-2 rounded-full hover:bg-purple-700 transition">
//               Choose {plan.name}
//             </button>
//           </div>
//         ))}
//       </div>
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
        const cart = savedCart.map((cartStory) =>
          allStories.find((story) => story.id === cartStory.id)
        ).filter(Boolean);

        setCartStories(cart);
      }
    });
  }, []);

  const pricePerPage = 1.5;

  const calculateStoryPrice = (pages) => {
    const count = pages?.length || 0;
    return count * pricePerPage;
  };

  const totalPrice = cartStories.reduce(
    (total, story) => total + calculateStoryPrice(story.pages),
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
              const pageCount = story.pages?.length || 0;
              const price = calculateStoryPrice(story.pages).toFixed(2);
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

