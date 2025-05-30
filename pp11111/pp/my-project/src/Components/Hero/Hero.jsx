// // import { useState, useEffect, useRef } from "react";
// // import p1 from "../../assets/books/p1.png";
// // import p2 from "../../assets/books/p2.png";
// // import p3 from "../../assets/books/p3.png";
// // import p4 from '../../assets/books/p4.png';
// // //import LinkCenterPage from "../../LinkCenterPage";
// // import { Link } from "react-router-dom";
// // //import { useNavigate } from "react-router-dom";
// // //import BookTitleInput from "../../BookTitleInput";

// // const ImageList = [
// //   { id: 1, img: p1, title: "GABBY ABBY", description: "Little Abigail had a head full of questions..." },
// //   { id: 2, img: p2, title: "DO YOU WONDER HOW THE LADYBUG GOT ITS NAME?", description: "Those little beauties have inspired..." },
// //   { id: 3, img: p3, title: "THE NAUGHTY MONKEY", description: "Baba was as naughty as naughty could get..." },
// //   { id: 4, img: p4, title: "THERE IS A MOUSE IN THE HOUSE", description: "Gretchen loves to write..." },
// // ];

// // const Hero = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const scrollContainerRef = useRef(null);
// //   const scrollSpeed = 1.5;

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentIndex((prevIndex) => (prevIndex + 1) % ImageList.length);
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   useEffect(() => {
// //     let position = 0;
// //     const smoothScroll = () => {
// //       if (scrollContainerRef.current) {
// //         position += scrollSpeed;
// //         scrollContainerRef.current.style.transform = `translateX(-${position}px)`;
// //         if (position >= scrollContainerRef.current.scrollWidth / 2) {
// //           position = 0;
// //         }
// //       }
// //       requestAnimationFrame(smoothScroll);
// //     };
// //     smoothScroll();
// //   }, []);

// //   const { img, title, description } = ImageList[currentIndex];

// //   return (
// //     <div className="min-h-[450px] sm:min-h-[550px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200" style={{ backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", width: "100%" }}>
// //       <div className="pb-6 sm:pb-0 max-w-[90%] sm:max-w-[80%] mx-auto">
// //         <div className="grid grid-cols-1 sm:grid-cols-2">
// //           {/* Text Section */}
// //           <div className="flex flex-col justify-center gap-4 pt-8 sm:pt-0 text-center sm:text-left order-2 sm:order-1 ">
// //             <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
// //             <p className="text-sm sm:text-base text-gray-600">{description}</p>
// //             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-purple-800">Bring Your Stories to Life with Text and Illustrations</h1>
// //             <Link to="/BookTitleInput">
// //             <button  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-full px-4 hover:scale-105 duration-200 w-60">Create Your Own Story</button>
// //             </Link>
// //           </div>

// //           {/* Image Section */}
// //           <div className="min-h-[350px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
// //             <div className="h-[250px] sm:h-[400px] overflow-hidden flex justify-center items-center">
// //               <img src={img} alt="book cover" className="w-[250px] h-[250px] sm:h-[400px] sm:w-[400px] sm:scale-110 object-contain mx-auto transition-opacity duration-500" />
// //             </div>

// //             {/* Infinite Horizontal Scrolling Thumbnails - Fully Continuous */}
// //             <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex overflow-hidden w-[90%] sm:w-[60%]">
// //               <div className="flex" ref={scrollContainerRef} style={{ whiteSpace: "nowrap", display: "flex", willChange: "transform" }}>
// //                 {[...ImageList, ...ImageList].map((item, index) => (
// //                   <img key={index} src={item.img} alt={item.title} className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200" />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Hero;
// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <div className="min-h-[500px] bg-[#fdf9ff] flex justify-center items-center px-4 sm:px-0">
//       <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        
//         {/* Text Section */}
//         <div className="text-center sm:text-left space-y-6">
//           <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
//               Personalized Stories
//             </span>{" "}
//             for Your <span className="font-extrabold text-black">Loved Ones</span>
//           </h1>
//           <p className="text-gray-700 text-base sm:text-lg">
//             Make magical tales come to life IN MINUTES! Crafted with care, personalized with love.
//           </p>
//           <Link to="/BookTitleInput">
//             <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
//               GET STARTED FOR FREE
//             </button>
//           </Link>
//         </div>

//         {/* Right Side Graphic */}
//         <div className="flex justify-center items-center relative">
//           <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-8 border-gradient-to-tr from-pink-300 via-purple-300 to-yellow-300 flex items-center justify-center relative">
//             {/* Central Circle (optional decoration) */}
//             <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-lg">
//               ✨
//             </div>

//             {/* Floating icons (positioned around the circle) */}
//             <div className="absolute top-4 right-[20%] w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl">⚙️</div>
//             <div className="absolute bottom-4 right-10 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xl">🛠️</div>
//             <div className="absolute bottom-6 left-10 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl">❤️</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import p1 from "../../assets/books/p1.png";
// import p2 from "../../assets/books/p2.png";
// import p3 from "../../assets/books/p3.png";
// import p4 from "../../assets/books/p4.png";

// const bookImages = [p1, p2, p3, p4];

// const Hero = () => {
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % bookImages.length);
//     }, 3000); // change every 3 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-[500px] bg-[#fdf9ff] flex justify-center items-center px-4 sm:px-0">
//       <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

//         {/* Text Section */}
//         <div className="text-center sm:text-left space-y-6">
//           <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
//               Personalized Stories
//             </span>{" "}
//             for Your <span className="font-extrabold text-black">Loved Ones</span>
//           </h1>
//           <p className="text-gray-700 text-base sm:text-lg">
//             Make magical tales come to life IN MINUTES! Crafted with care, personalized with love.
//           </p>
//           <Link to="/BookTitleInput">
//             <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
//               GET STARTED FOR FREE
//             </button>
//           </Link>
//         </div>

//         {/* Right Side Graphic */}
//         <div className="flex justify-center items-center relative">
//           <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-8 border-gradient-to-tr from-pink-300 via-purple-300 to-yellow-300 flex items-center justify-center relative">
            
//             {/* Center Book Image (updates every 3 sec) */}
//             <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md">
//               <img
//                 src={bookImages[currentImage]}
//                 alt="Book"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Floating icons */}
//             <div className="absolute top-4 right-[20%] w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl">⚙️</div>
//             <div className="absolute bottom-4 right-10 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xl">🛠️</div>
//             <div className="absolute bottom-6 left-10 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl">❤️</div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Hero;
//************************************ */
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import p1 from "../../assets/books/p1.png";
// import p2 from "../../assets/books/p2.png";
// import p3 from "../../assets/books/p3.png";
// import p4 from "../../assets/books/p4.png";

// const bookImages = [p1, p2, p3, p4];

// const Hero = () => {
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % bookImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-[500px] bg-[#fdf9ff] flex justify-center items-center px-4 sm:px-0">
//       <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

//         {/* Text Section */}
//         <div className="text-center sm:text-left space-y-6">
//           <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
//               Personalized Stories
//             </span>{" "}
//             for Your <span className="font-extrabold text-black">Loved Ones</span>
//           </h1>
//           <p className="text-gray-700 text-base sm:text-lg">
//             Make magical tales come to life IN MINUTES! Crafted with care, personalized with love.
//           </p>
//           <Link to="/BookTitleInput">
//             <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
//               GET STARTED FOR FREE
//             </button>
//           </Link>
//         </div>

//         {/* Right Side Graphic */}
//         <div className="flex justify-center items-center relative">
//           <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-8 border-gradient-to-tr from-pink-300 via-purple-300 to-yellow-300 flex items-center justify-center relative overflow-hidden">
            
//             {/* Full size circular book image */}
//             {/* <img
//               src={bookImages[currentImage]}
//               alt="Book"
//               className="absolute inset-0 w-full h-full object-cover rounded-full z-0"
//             /> */}
//            <img
//   src={bookImages[currentImage]}
//   alt="Book"
//   className="absolute w-full h-full object-cover rounded-full"
// />

//             {/* Floating icons (still above image) */}
//             <div className="absolute top-4 right-[20%] w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl z-10">⚙️</div>
//             <div className="absolute bottom-4 right-10 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xl z-10">🛠️</div>
//             <div className="absolute bottom-6 left-10 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl z-10">❤️</div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Hero;
//********************************* */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase"; // تأكد من أنك تستورد auth من firebase
import p1 from "../../assets/books/p1.png";
import p2 from "../../assets/books/p2.png";
import p3 from "../../assets/books/p3.png";
import p4 from "../../assets/books/p4.png";

const bookImages = [p1, p2, p3, p4];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [user, setUser] = useState(null); // حالة المستخدم
  const navigate = useNavigate(); // لاستخدام التوجيه

  // تحقق من حالة المستخدم عند تحميل الصفحة
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // تخزين المستخدم إذا كان مسجل الدخول
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bookImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/BookTitleInput"); // إذا كان المستخدم مسجل دخوله، انتقل إلى صفحة الكتاب
    } else {
      navigate("/LoginSign"); // إذا لم يكن مسجل، أرسله إلى صفحة التسجيل
    }
  };

  return (
    <div className="min-h-[500px] bg-[#fdf9ff] flex justify-center items-center px-4 sm:px-0">
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

        {/* Text Section */}
        <div className="text-center sm:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Personalized Stories
            </span>{" "}
            for Your <span className="font-extrabold text-black">Loved Ones</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
            Make magical tales come to life IN MINUTES! Crafted with care, personalized with love.
          </p>
          <button
            onClick={handleGetStartedClick}
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            GET STARTED FOR FREE
          </button>
        </div>

        {/* Right Side Graphic */}
        <div className="flex justify-center items-center relative">
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-8 border-gradient-to-tr from-pink-300 via-purple-300 to-yellow-300 flex items-center justify-center relative overflow-hidden">
            <img
              src={bookImages[currentImage]}
              alt="Book"
              className="absolute w-full h-full object-cover rounded-full"
            />
            <div className="absolute top-4 right-[20%] w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl z-10">⚙️</div>
            <div className="absolute bottom-4 right-10 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xl z-10">🛠️</div>
            <div className="absolute bottom-6 left-10 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl z-10">❤️</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
