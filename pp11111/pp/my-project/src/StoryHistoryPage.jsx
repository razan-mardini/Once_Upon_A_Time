
import { useEffect,  useState } from "react";
//import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiDownload, FiEye, FiCopy } from "react-icons/fi";
import { getFirestore,  collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import p1 from "./assets/books/p1.png";
// import p2 from "./assets/books/p2.png";
// import p3 from "./assets/books/p3.png";
// import p4 from "./assets/books/p4.png";

//const bookImages = [p1, p2, p3, p4];

const StoryHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (user) {
        console.log("User UID: ", user.uid); // تأكد من أن الـ UID صحيح

        // جلب القصص من المسار الصحيح في Firestore
        const userStoriesRef = collection(db, "users", user.uid, "stories");
        const querySnapshot = await getDocs(userStoriesRef);

        if (querySnapshot.empty) {
          console.log("No stories found for this user.");
        } else {
          const stories = querySnapshot.docs.map(doc => doc.data());
          setHistory(stories);
        }
        setLoading(false);
      } else {
        console.log("No user is logged in.");
        setHistory([]);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [auth, db]);

  // const floatingBooks = useMemo(() => {
  //   return Array.from({ length: 12 }).map((_, index) => ({
  //     id: index,
  //     src: bookImages[index % bookImages.length],
  //     left: `${Math.random() * 100}%`,
  //     bottom: `${Math.random() * 30}vh`,
  //     rotate: Math.random() * 360,
  //     duration: Math.random() * 6 + 5,
  //     delay: Math.random() * 3,
  //   }));
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex justify-center items-start min-h-screen pt-20 bg-gradient-to-br from-pink-400 via-purple-600 to-blue-400 overflow-hidden">
      {/* {floatingBooks.map((book) => (
        <motion.img
          key={book.id}
          src={book.src}
          alt={`Floating book ${book.id + 1}`}
          className="absolute w-20 h-auto opacity-70 shadow-lg rounded-lg"
          style={{ left: book.left, bottom: book.bottom }}
          initial={{ y: "100vh", opacity: 0, rotate: book.rotate }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: book.duration, repeat: Infinity, delay: book.delay }}
        />
      ))} */}

      <div className="bg-[#e6d5f7] rounded-xl shadow-lg w-[90%] max-w-4xl p-6 border border-gray-300 relative z-10">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-t-lg">
          Story History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-center">
            <thead>
              <tr className="bg-purple-100">
                <th className="p-3 text-sm font-semibold">Title</th>
                <th className="p-3 text-sm font-semibold">Creation Date</th>
                <th className="p-3 text-sm font-semibold">Printing Status</th>
                <th className="p-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">No stories found.</td>
                </tr>
              ) : (
                history.map((story, index) => (
                  <tr key={index} className="bg-white hover:bg-purple-50 border-b border-gray-300">
                    <td className="p-3">{story.title}</td>
                    <td className="p-3">{story.date}</td>
                    <td className="p-3 capitalize">{story.status}</td>
                    <td className="p-3 flex justify-center items-center space-x-3 text-lg text-gray-600">
                      <FiCopy className="cursor-pointer hover:text-purple-500" />
                      <FiEdit className="cursor-pointer hover:text-purple-500" />
                      <FiDownload className="cursor-pointer hover:text-purple-500" />
                      <FiEye className="cursor-pointer hover:text-purple-500" />
                      <FiTrash2 className="cursor-pointer hover:text-red-500" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoryHistoryPage;
