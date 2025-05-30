

//************************************** */
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const testimonialData = [
//   {
//     id: 1,
//     name: "Victor",
//     text: "This service is amazing! I really loved how easy everything was.",
//     img: "https://picsum.photos/101/101",
//     color: "border-pink-400 text-pink-400",
//   },
//   {
//     id: 2,
//     name: "Satya Narayan",
//     text: "Great experience! The customer support was fast and helpful.",
//     img: "https://picsum.photos/102/102",
//     color: "border-yellow-400 text-yellow-400",
//   },
//   {
//     id: 3,
//     name: "Sachin Tendulkar",
//     text: "Highly recommend this! Everything went smoothly and perfectly.",
//     img: "https://picsum.photos/103/103",
//     color: "border-purple-500 text-purple-500",
//   },
// ];

// const Testimonial = () => {
//   const settings = {
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     cssEase: "linear",
//     pauseOnHover: true,
//     pauseOnFocus: true,
//     centerMode: true,
//     centerPadding: "0px",
//     responsive: [
//       {
//         breakpoint: 10000,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           centerMode: false,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-screen overflow-hidden flex justify-center bg-white dark:bg-gray-900">
//       <div className="py-12 w-full max-w-6xl px-4">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-black dark:text-white">Reviews</h1>
//         </div>

//         <div className="flex justify-center">
//           <div className="w-full max-w-4xl">
//             <Slider {...settings}>
//               {testimonialData.map((data) => (
//                 <div key={data.id} className="p-4">
//                   <div
//                     className={`relative rounded-xl p-6 min-h-[280px] border-2 ${data.color} flex flex-col justify-between`}
//                   >
//                     {/* Top quote */}
//                     <div className={`absolute -top-4 -left-4 text-4xl font-bold ${data.color}`}>“</div>

//                     {/* Stars */}
//                     <div className={`flex justify-center mb-4 text-xl ${data.color}`}>
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <span key={i}>★</span>
//                       ))}
//                     </div>

//                     {/* Text */}
//                     <p className="text-center text-sm text-gray-600 dark:text-gray-300">{data.text}</p>

//                     {/* Profile */}
//                     <div className="mt-4 flex flex-col items-center">
//                       <img
//                         className="w-16 h-16 rounded-full mb-2"
//                         src={data.img}
//                         alt={data.name}
//                       />
//                       <p className="font-semibold text-black dark:text-white">{data.name}</p>
//                     </div>

//                     {/* Bottom quote */}
//                     <div className={`absolute -bottom-4 -right-4 text-4xl font-bold ${data.color}`}>”</div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;
import { useEffect, useState } from "react";
import { db } from "../../config/firebase"; // تأكدي من مسار ملف الفايربيز عندك
import { collection, getDocs } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// التعليقات الثابتة
const fixedTestimonials = [
  {
    id: "static-1",
    name: "Victor",
    text: "This service is amazing! I really loved how easy everything was.",
    img: "https://picsum.photos/101/101",
    color: "border-pink-400 text-pink-400",
  },
  {
    id: "static-2",
    name: "Satya Narayan",
    text: "Great experience! The customer support was fast and helpful.",
    img: "https://picsum.photos/102/102",
    color: "border-yellow-400 text-yellow-400",
  },
  {
    id: "static-3",
    name: "Sachin Tendulkar",
    text: "Highly recommend this! Everything went smoothly and perfectly.",
    img: "https://picsum.photos/103/103",
    color: "border-purple-500 text-purple-500",
  },
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials([...fixedTestimonials, ...data]);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-screen overflow-hidden flex justify-center bg-white dark:bg-gray-900">
      <div className="py-12 w-full max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white">Reviews</h1>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <Slider {...settings}>
              {testimonials.map((data) => (
                <div key={data.id} className="p-4">
                  <div
                    className={`relative rounded-xl p-6 min-h-[280px] border-2 ${data.color || "border-green-400 text-green-400"} flex flex-col justify-between`}
                  >
                    {/* علامة الاقتباس فوق */}
                    <div className={`absolute -top-4 -left-4 text-4xl font-bold ${data.color || "text-green-400"}`}>“</div>

                    {/* نجوم التقييم */}
                    <div className={`flex justify-center mb-4 text-xl ${data.color || "text-green-400"}`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>

                    {/* نص التعليق */}
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300">{data.text}</p>

                    {/* بروفايل الشخص */}
                    <div className="mt-4 flex flex-col items-center">
                      <img
                        className="w-16 h-16 rounded-full mb-2 object-cover"
                        src={data.img}
                        alt={data.name}
                      />
                      <p className="font-semibold text-black dark:text-white">{data.name}</p>
                    </div>

                    {/* علامة الاقتباس تحت */}
                    <div className={`absolute -bottom-4 -right-4 text-4xl font-bold ${data.color || "text-green-400"}`}>”</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
