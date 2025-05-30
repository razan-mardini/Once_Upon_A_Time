// //import  { useState } from "react";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaLocationArrow,
//   FaMobileAlt,
// } from "react-icons/fa";
// import footerLogo from "../../assets/website/logo.png";

// const FooterLinks = [
//   {
//     title: "Home",
//     link: "/#",
//   },
//   {
//     title: "About",
//     link: "/#about",
//   },
//   {
//     title: "Contact",
//     link: "/#contact",
//   },
//   {
//     title: "Blog",
//     link: "/#blog",
//   },
// ];
// const Footer = () => {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-950">
//       <section >
//         <div className=" grid md:grid-cols-3 py-5">
//           {/* company Details */}
//           <div className=" py-8 px-4 ">
//             <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
//               <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
//               Books Store
//             </h1>
//             <p className="">
//               Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
//               consectetur adipisicing elit. Possimus, voluptate.{" "}
//             </p>
//             <br />
//             <div className="flex items-center gap-3">
//               <FaLocationArrow />
//               <p>Noida, Uttar Pradesh</p>
//             </div>
//             <div className="flex items-center gap-3 mt-3">
//               <FaMobileAlt />
//               <p>+91 123456789</p>
//             </div>
//             {/* Social Handle */}
//             <div className="flex items-center gap-3 mt-6">
//               <a href="#">
//                 <FaInstagram className="text-3xl" />
//               </a>
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">

//                 <FaFacebook className="text-3xl" />
//               </a>
//               <a href="#">
//                 <FaLinkedin className="text-3xl" />
//               </a>
//             </div>
//           </div>
//           {/* Links */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
//             <div className="">
//               <div className="py-8 px-4 ">
//                 <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
//                   Important Links
//                 </h1>
//                 <ul className={`flex flex-col gap-3`}>
//                   {FooterLinks.map((link,index) => (
//                     <li key={index}className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500">
//                       <span>&#11162;</span>
//                       <span>{link.title}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="">
//               <div className="py-8 px-4 ">
//                 <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
//                   Links
//                 </h1>
//                 <ul className="flex flex-col gap-3">
//                   {FooterLinks.map((link,index) => (
//                     <li key={index}className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500">
//                       <span>&#11162;</span>
//                       <span>{link.title}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="">
//               <div className="py-8 px-4 ">
//                 <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
//                   Location
//                 </h1>
//                 {/* <ul className="list-disc list-inside"> */}
//                 <ul className="flex flex-col gap-3">
//                   {FooterLinks.map((link,index) => (
//                     <li key={index}className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500">
//                       <span>&#11162;</span>
//                       <span>{link.title}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="text-center py-10 border-t-2 border-gray-300/50">
//             @copyright 2024 All rights reserved || Made with ❤️ by Dilshad
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Footer;
import { FaFacebook, FaInstagram, FaPlay, FaTimes } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full text-gray-800 font-sans">
      {/* Gradient Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Child s Adventure Today
        </h1>
        <p className="text-md md:text-lg mb-6">
          Create a personalized tale that will become a cherished keepsake.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-md shadow-md">
            Create Your Tale
          </button>
          <button className="border border-white py-2 px-6 rounded-md shadow-md">
            Learn More
          </button>
        </div>
      </div>

      {/* Newsletter and Footer Section */}
      <div className="bg-white py-12 px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Newsletter */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-2">Stay Up To Date</h2>
          <p className="text-sm mb-4">
            Sign up to receive insider tips, exclusive offers, and more!
          </p>
          <div className="border border-black flex items-center justify-between p-2">
            <input
              type="email"
              placeholder="Email Address"
              className="outline-none flex-grow"
            />
            <span className="text-xl font-bold">➝</span>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-purple-700 mb-2">Home</h3>
          <ul className="space-y-1 text-sm">
            <li>About</li>
            <li>Shipping, Payment, Returns</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-pink-600 mb-2">Customer</h3>
          <ul className="space-y-1 text-sm">
            <li>Support</li>
            <li>Contact Us</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-yellow-500 mb-2">Other</h3>
          <ul className="space-y-1 text-sm">
            <li>Careers</li>
            <li>Press Inquiry</li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-start gap-6 px-6 md:px-20 pb-12">
        <FaFacebook size={30} />
        <FaInstagram size={30} />
        <FaTimes size={30} />
        <FaPlay size={30} />
      </div>
    </div>
  );
};

export default Footer;
