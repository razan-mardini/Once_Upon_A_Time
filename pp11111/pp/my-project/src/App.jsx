
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
// import LoginSignUp from "./Components/Navbar/LoginSignUp/LoginSign";
// import Hero from "./Components/Hero/Hero";
// import BookTitleInput from "./BookTitleInput";
// import DedicationPage from "./DedicationPage";
// import RecipientInfoPage from "./RecipientInfoPage";
// import Testimonial from "./Components/Testimonial/Testimonial";
// import Footer from "./Components/Footer/Footer";
// import CharacterForm from "./CharacterForm";
// import CharacterTraitForm from "./CharacterTraitForm";
// import CharacterForm2 from './CharacterForm2';
// import CharacterForm3 from "./CharacterForm3";
// import BookPage from "./BookPage";
// import Help from "./Help";
// import StoryDescriptionInput from "./StoryDescriptionInput";
// import LoadingPage from "./LoadingPage";
// import  SettingsPage from "./SettingsPage";
//  //import StoryHistoryPage from "./StoryHistoryPage";
//  import WhyChoose from "./WhyChoose";
// import HOWITWORS from "./HOWITWORKS";
// import DashboardPage from "./DashboardPage";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import AddFeedback from "./AddFeedback";
// import EditProfilePage from "./EditProfilePage";
// import CartPage from "./CartPage";
// import PricingPage from "./PricingPage";
// const App = () => {
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("✅ User is signed in:", user.email);
//       } else {
//         console.log("🚫 User is signed out.");
//       }
//     });

//     return () => unsubscribe(); // تنظيف المستمع عند الخروج من الصفحة
//   }, []);

//   return (

//    <div>
//       <Navbar />
//       <Routes>
      
//         {/* Home Page */}
//         <Route path="/" element={<Hero />} />
        
//         <Route path="/help" element={<Help />} />
//         {/* Login/Signup Page */}
//         <Route path="/LoginSign" element={<LoginSignUp />} />
//         <Route path="/AddFeedback" element={<AddFeedback />} />
//         {/* Book Title Page */}
//         <Route path="/BookTitleInput" element={<BookTitleInput />} />

//         {/* Dedication Page */}
//         <Route path="/DedicationPage" element={<DedicationPage />} />
//         <Route path="/RecipientInfoPage" element={<RecipientInfoPage  />} />
//         <Route path="/CharacterForm" element={<CharacterForm />} />
//         <Route path="/CharacterTraitForm" element={<CharacterTraitForm />} />
//         <Route path="/CharacterForm2" element={<CharacterForm2/>} />
//         <Route path="/CharacterForm3" element={<CharacterForm3/>} />
//         <Route path="/StoryDescriptionInput" element={<StoryDescriptionInput/>} />
//         <Route path="/LoadingPage" element={<LoadingPage/>} />
//         <Route path="/DashboardPage" element={<DashboardPage/>} />
//         <Route path="/EditProfilePage" element={<EditProfilePage/>} />
//         {/* <Route path="/cart/:storyId" element={<CartPage />} /> */}
//         {/* <Route path="/BookPage" element={<BookPage/>} /> */}
//         <Route path="/CartPage" element={<CartPage />} />
//         <Route path="/PricingPage" element={<PricingPage/>} />
//         {/* <Route path="/BookPage" element={<BookPage/>} /> */}
//         <Route path="/book/:storyId" element={<BookPage />} />
//         <Route path="/SettingsPage" element={<SettingsPage />} /> 
//         <Route path="/HowItWorks" element={<HOWITWORS />} />

//       </Routes>
//       {/* <RecipientInfoPage/> */}
//       {/* <BookPage/> */}
//       {/* <DashboardPage/> */}
//       <HOWITWORS/>
//       < Testimonial />
//       <WhyChoose/>
//       <Footer/>
//       {/* <BookPage/> */}
//       {/* <SettingsPage/> */}
//     {/* <PricingPage/> */}
      
//     </div>
//   );
// };

// export default App;
//////////////////////////////////////////////////////
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./Components/Navbar/Navbar";
import LoginSignUp from "./Components/Navbar/LoginSignUp/LoginSign";
import Hero from "./Components/Hero/Hero";
import BookTitleInput from "./BookTitleInput";
import DedicationPage from "./DedicationPage";
import RecipientInfoPage from "./RecipientInfoPage";
import Testimonial from "./Components/Testimonial/Testimonial";
import Footer from "./Components/Footer/Footer";
import CharacterForm from "./CharacterForm";
import CharacterTraitForm from "./CharacterTraitForm";
import CharacterForm2 from './CharacterForm2';
import CharacterForm3 from "./CharacterForm3";
import BookPage from "./BookPage";
import Help from "./Help";
import StoryDescriptionInput from "./StoryDescriptionInput";
import LoadingPage from "./LoadingPage";
import SettingsPage from "./SettingsPage";
import WhyChoose from "./WhyChoose";
import HOWITWORS from "./HOWITWORKS";
import DashboardPage from "./DashboardPage";
import AddFeedback from "./AddFeedback";
import EditProfilePage from "./EditProfilePage";
import CartPage from "./CartPage";
import PricingPage from "./PricingPage";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ User is signed in:", user.email);
      } else {
        console.log("🚫 User is signed out.");
      }
    });

    return () => unsubscribe();
  }, []);

  const hideSectionsOnPaths = [
    "/BookTitleInput",
    "/DedicationPage",
    "/RecipientInfoPage",
    "/CharacterForm",
    "/CharacterTraitForm",
    "/CharacterForm2",
    "/CharacterForm3",
    "/StoryDescriptionInput",
    "/LoadingPage",
    "/BookPage",
    // "/DashboardPage",
    "/SettingsPage",
    "/LoginSign",
    "/AddFeedback",
    "/EditProfilePage",
    "/CartPage",
    "/PricingPage",

  ];

  const shouldHideSections = hideSectionsOnPaths.includes(location.pathname);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/help" element={<Help />} />
        <Route path="/LoginSign" element={<LoginSignUp />} />
        <Route path="/AddFeedback" element={<AddFeedback />} />
        <Route path="/BookTitleInput" element={<BookTitleInput />} />
        <Route path="/DedicationPage" element={<DedicationPage />} />
        <Route path="/RecipientInfoPage" element={<RecipientInfoPage />} />
        <Route path="/CharacterForm" element={<CharacterForm />} />
        <Route path="/CharacterTraitForm" element={<CharacterTraitForm />} />
        <Route path="/CharacterForm2" element={<CharacterForm2 />} />
        <Route path="/CharacterForm3" element={<CharacterForm3 />} />
        <Route path="/StoryDescriptionInput" element={<StoryDescriptionInput />} />
        <Route path="/LoadingPage" element={<LoadingPage />} />
        <Route path="/DashboardPage" element={<DashboardPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/PricingPage" element={<PricingPage />} />
        <Route path="/book/:storyId" element={<BookPage />} />
        <Route path="/SettingsPage" element={<SettingsPage />} />
        <Route path="/HowItWorks" element={<HOWITWORS />} />
      </Routes>

      {/* ✅ فقط إذا مو بصفحات القصة */}
      {/* {!shouldHideSections && (
        <>
          <HOWITWORS />
          <Testimonial />
          <WhyChoose />
          <Footer />
        </>
      )} */}
      {location.pathname === "/DashboardPage" ? (
  <>
    <Testimonial />
    <WhyChoose />
    <Footer />
  </>
) : !shouldHideSections && (
  <>
    <HOWITWORS />
    <Testimonial />
    <WhyChoose />
    <Footer />
  </>
)}

    </div>
  );
};

export default App;
