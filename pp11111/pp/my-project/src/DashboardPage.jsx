

// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { auth, db } from "./config/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { Link } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { FiEdit2 } from "react-icons/fi";
// import { BsCart2 } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export default function DashboardPage() {
//   const [stories, setStories] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);
  
//   // Listen for auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         console.log("No user is signed in.");
//         setUserId(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Fetch stories once userId is available
//   useEffect(() => {
//     const fetchStories = async () => {
//       if (!userId) return;

//       try {
//         const querySnapshot = await getDocs(collection(db, "users", userId, "stories"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setStories(data);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//         setStories([]); // Set to empty if there's an error
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   if (loading) return <p className="text-center">Loading...</p>;

//   if (!userId) {
//     return (
//       <div className="text-center">
//         <p>Please log in to view your stories.</p>
//         {/* <Link to="/login" className="text-blue-500">Go to Login</Link> */}
//         <Link to="/LoginSign" className="text-blue-500">Go to Login</Link>

//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fefcff] px-4 py-8 relative">
       

//       {/* Create New Book Button */}
//       <div className="mb-6 ml-6">
//         <Link to="/BookTitleInput">
//           <button className="bg-gradient-to-r from-blue-300 to-purple-400 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
//             CREATE NEW BOOK
//           </button>
//         </Link>
//       </div>

//       {/* Book Table */}
//       <div className="mx-6">
//         <p className="font-semibold mb-2">My Books</p>

//         {stories.length === 0 ? (
//           <p className="text-center text-purple-500 mt-4">No stories found.</p>
//         ) : (
//           <table className="w-full border border-black text-left text-sm">
//             <thead className="border border-black">
//               <tr className="text-black">
//                 <th className="p-3">Front Cover</th>
//                 <th className="p-3">Title</th>
//                 <th className="p-3 text-center">Edit</th>
//                 <th className="p-3 text-center">Add to Cart</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stories.map((story) => (
//                 <tr key={story.id} className="border-t border-purple-300 text-purple-700 text-md">
//                   <td className="p-3">
//                     <img
//                       src={story.cover || "/default-cover.png"}
//                       alt={story.title}
//                       className="w-24 h-24 object-cover rounded-md"
//                     />
//                     <p className="text-xs mt-1">(Generated image of book title)</p>
//                   </td>
//                   <td className="p-3">{story.title}</td>
//                   <td className="p-3 text-center">
//                     <Link
//                       to={`/book/${story.id}`}
//                       className="flex items-center gap-1 border-2 border-purple-400 px-4 py-1 rounded-full text-purple-600 font-semibold hover:bg-purple-50"
//                     >
//                       <FiEdit2 />
//                       EDIT
//                     </Link>
//                   </td>
//                   <td className="p-3 text-center">
        
// <button
//   onClick={() => {
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const isAlreadyInCart = existingCart.find((item) => item.id === story.id);
//     if (!isAlreadyInCart) {
//       const updatedCart = [...existingCart, story];
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       toast.success("✅ The story has been added to the cart successfully");
//     } else {
//       toast.info("ℹ️ This story is already in the cart");
//     }
//   }}
//   className="flex items-center gap-1 bg-pink-300 text-white px-4 py-1 rounded-full font-semibold hover:bg-pink-400"
// >
//   <BsCart2 />
//   Add to Cart
// </button>


//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { auth, db } from "./config/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { Link, useLocation } from "react-router-dom";  // <-- استيراد useLocation
// import { FaUserCircle } from "react-icons/fa";
// import { FiEdit2 } from "react-icons/fi";
// import { BsCart2 } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export default function DashboardPage() {
//   const [stories, setStories] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const location = useLocation(); // <-- استخدام location لاستقبال الـ state
//   const [highlightStoryId, setHighlightStoryId] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // استلام الـ highlightStoryId من الـ location.state عند الدخول
//   useEffect(() => {
//     if (location.state?.highlightStoryId) {
//       setHighlightStoryId(location.state.highlightStoryId);
//       toast.success("✅ A new story was generated and added!");
//     }
//   }, [location.state]);

//   // Listen for auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         console.log("No user is signed in.");
//         setUserId(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Fetch stories once userId is available
//   useEffect(() => {
//     const fetchStories = async () => {
//       if (!userId) return;

//       try {
//         const querySnapshot = await getDocs(collection(db, "users", userId, "stories"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setStories(data);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//         setStories([]); // Set to empty if there's an error
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   if (loading) return <p className="text-center">Loading...</p>;

//   if (!userId) {
//     return (
//       <div className="text-center">
//         <p>Please log in to view your stories.</p>
//         <Link to="/LoginSign" className="text-blue-500">Go to Login</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fefcff] px-4 py-8 relative">
//       {/* Create New Book Button */}
//       <div className="mb-6 ml-6">
//         <Link to="/BookTitleInput">
//           <button className="bg-gradient-to-r from-blue-300 to-purple-400 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
//             CREATE NEW BOOK
//           </button>
//         </Link>
//       </div>

//       {/* Book Table */}
//       <div className="mx-6">
//         <p className="font-semibold mb-2">My Books</p>

//         {stories.length === 0 ? (
//           <p className="text-center text-purple-500 mt-4">No stories found.</p>
//         ) : (
//           <table className="w-full border border-black text-left text-sm">
//             <thead className="border border-black">
//               <tr className="text-black">
//                 <th className="p-3">Front Cover</th>
//                 <th className="p-3">Title</th>
//                 <th className="p-3 text-center">Edit</th>
//                 <th className="p-3 text-center">Add to Cart</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stories.map((story) => (
//                 <tr
//                   key={story.id}
//                   className={`border-t border-purple-300 text-purple-700 text-md ${
//                     highlightStoryId === story.id ? "bg-yellow-100" : ""
//                   }`}
//                 >
//                   <td className="p-3">
//                     <img
//                       src={story.cover || "/default-cover.png"}
//                       alt={story.title}
//                       className="w-24 h-24 object-cover rounded-md"
//                     />
//                     <p className="text-xs mt-1">(Generated image of book title)</p>
//                   </td>
//                   <td className="p-3">{story.title}</td>
//                   <td className="p-3 text-center">
//                     <Link
//                       to={`/book/${story.id}`}
//                       className="flex items-center gap-1 border-2 border-purple-400 px-4 py-1 rounded-full text-purple-600 font-semibold hover:bg-purple-50"
//                     >
//                       <FiEdit2 />
//                       EDIT
//                     </Link>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => {
//                         const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//                         const isAlreadyInCart = existingCart.find((item) => item.id === story.id);
//                         if (!isAlreadyInCart) {
//                           const updatedCart = [...existingCart, story];
//                           localStorage.setItem("cart", JSON.stringify(updatedCart));
//                           toast.success("✅ The story has been added to the cart successfully");
//                         } else {
//                           toast.info("ℹ️ This story is already in the cart");
//                         }
//                       }}
//                       className="flex items-center gap-1 bg-pink-300 text-white px-4 py-1 rounded-full font-semibold hover:bg-pink-400"
//                     >
//                       <BsCart2 />
//                       Add to Cart
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardPage() {
  const [stories, setStories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const [highlightStoryId, setHighlightStoryId] = useState(null);

  const navigate = useNavigate();

  // ✅ تحميل السلة من localStorage عند بداية الصفحة
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // ✅ حفظ cart إلى localStorage عند تغييره
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // استلام highlightStoryId من state
  useEffect(() => {
    if (location.state?.highlightStoryId) {
      setHighlightStoryId(location.state.highlightStoryId);
      toast.success("✅ A new story was generated and added!");
    }
  }, [location.state]);

  // الاستماع لحالة المستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.log("No user is signed in.");
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // جلب القصص من Firestore
  useEffect(() => {
    const fetchStories = async () => {
      if (!userId) return;

      try {
        const querySnapshot = await getDocs(collection(db, "users", userId, "stories"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setStories([]);
      }
    };

    fetchStories();
  }, [userId]);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!userId) {
    return (
      <div className="text-center">
        <p>Please log in to view your stories.</p>
        <Link to="/LoginSign" className="text-blue-500">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefcff] px-4 py-8 relative">
      {/* زر إنشاء قصة جديدة */}
      <div className="mb-6 ml-6">
        <Link to="/BookTitleInput">
          <button className="bg-gradient-to-r from-blue-300 to-purple-400 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
            CREATE NEW BOOK
          </button>
        </Link>
      </div>

      {/* جدول القصص */}
      <div className="mx-6">
        <p className="font-semibold mb-2">My Books</p>

        {stories.length === 0 ? (
          <p className="text-center text-purple-500 mt-4">No stories found.</p>
        ) : (
          <table className="w-full border border-black text-left text-sm">
            <thead className="border border-black">
              <tr className="text-black">
                <th className="p-3">Front Cover</th>
                <th className="p-3">Title</th>
                <th className="p-3 text-center">Edit</th>
                <th className="p-3 text-center">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr
                  key={story.id}
                  className={`border-t border-purple-300 text-purple-700 text-md ${highlightStoryId === story.id ? "bg-yellow-100" : ""}`}
                >
                  <td className="p-3">
                    <img
                      src={story.cover || "/default-cover.png"}
                      alt={story.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <p className="text-xs mt-1">(Generated image of book title)</p>
                  </td>
                  <td className="p-3">{story.title}</td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/book/${story.id}`}
                      className="flex items-center gap-1 border-2 border-purple-400 px-4 py-1 rounded-full text-purple-600 font-semibold hover:bg-purple-50"
                    >
                      <FiEdit2 />
                      EDIT
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
                        const isAlreadyInCart = existingCart.find((item) => item.id === story.id);
                        if (!isAlreadyInCart) {
                          const updatedCart = [...existingCart, story];
                          localStorage.setItem("cart", JSON.stringify(updatedCart));
                          setCart(updatedCart); // ✅ تحديث الستيت تبع السلة
                          toast.success("✅ The story has been added to the cart successfully");
                        } else {
                          toast.info("ℹ️ This story is already in the cart");
                        }
                      }}
                      className="flex items-center gap-1 bg-pink-300 text-white px-4 py-1 rounded-full font-semibold hover:bg-pink-400"
                    >
                      <BsCart2 />
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
