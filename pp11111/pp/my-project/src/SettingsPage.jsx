
// import { useLocation, useNavigate } from "react-router-dom";
// import { db, auth } from "./config/firebase";
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import { useState,useEffect } from "react";
// // الترجمة
// const translations = {
//   English: {
//     account: "Account",
//     editProfile: "✏️ Edit profile information",
//     history: "📜 History",
//     notifications: "🔔 Notifications",
//     language: "🌐 Language",
//     preferences: "Preferences",
//     security: "🔒 Security",
//     theme: "🎨 Theme",
//     helpSupport: "Help & Support",
//     contact: "📞 Contact us",
//     feedback: "📝 Feedback",
//     privacy: "📄 Privacy policy",
//     lightMode: "Light mode",
//     on: "ON",
//     userName: "User name",
//   },
//   Arabic: {
//     account: "الحساب",
//     editProfile: "✏️ تعديل معلومات الحساب",
//     history: "📜 السجل",
//     notifications: "🔔 الإشعارات",
//     language: "🌐 اللغة",
//     preferences: "التفضيلات",
//     security: "🔒 الأمان",
//     theme: "🎨 النمط",
//     helpSupport: "المساعدة والدعم",
//     contact: "📞 تواصل معنا",
//     feedback: "📝 ملاحظات",
//     privacy: "📄 سياسة الخصوصية",
//     lightMode: "الوضع الفاتح",
//     on: "تشغيل",
//     userName: "اسم المستخدم",
//   }
// };

// const SettingsPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [language, setLanguage] = useState("English");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const userRef = doc(db, "users", user.uid);
//           const userSnap = await getDoc(userRef);

//           if (userSnap.exists()) {
//             const data = userSnap.data();
//             setUserData({
//               firstName: data.firstName,
//               lastName: data.lastName,
//               email: data.email,
//             });
//             setLanguage(data.language || "English");
//           } else {
//             // إذا أول مرة يسجل
//             await setDoc(userRef, {
//               firstName: "First",
//               lastName: "Last",
//               email: user.email,
//               notifications: true,
//               theme: "Light",
//               language: "English",
//             });
//             setUserData({
//               firstName: "First",
//               lastName: "Last",
//               email: user.email,
//             });
//             setLanguage("English");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);  // تأكيد تحميل البيانات
//       }
//     };

//     // استخدم onAuthStateChanged للتأكد من أن المستخدم تم التحقق منه
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         fetchUserData();
//       } else {
//         setLoading(false);  // إذا لم يكن هناك مستخدم مسجل، قم بإيقاف التحميل
//       }
//     });

//     return () => unsubscribe(); // تنظيف الـ listener عند فك التثبيت
//   }, [location.state]); // إضافة الـ location.state كـ dependency لتفعيل التحديث عند العودة من EditProfilePage

//   const handleLanguageToggle = async () => {
//     const newLanguage = language === "English" ? "Arabic" : "English";
//     setLanguage(newLanguage);

//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, { language: newLanguage });
//       }
//     } catch (error) {
//       console.error("Error updating language:", error);
//     }
//   };

//   const t = translations[language];

//   // عرض محتوى الصفحة فقط بعد تحميل البيانات
//   if (loading) {
//     return <div>Loading...</div>;  // عند التحميل سيظهر loading
//   }

//   return (
//     <div className="relative min-h-screen flex justify-center items-start pt-16 overflow-hidden">
//       <div className="shadow-lg rounded-xl p-8 w-[700px] border-2 border-purple-900 relative z-10">

//         <div className="text-center mb-6">
//           <div className="text-4xl mb-2">👤</div>
//           <h2 className="text-xl font-semibold">
//             {userData ? `${userData.firstName} ${userData.lastName}` : t.userName}
//           </h2>
//           <p className="text-sm text-gray-700">
//             {userData ? userData.email : "user@emailprovider.com"}
//           </p>
//         </div>

//         <div className="space-y-4">
//           <section className="bg-white rounded-lg p-4 shadow border-2 border-purple-900">
//             <h3 className="text-md font-semibold text-gray-700 mb-2">{t.account}</h3>
//             <ul className="space-y-2">
//               <li onClick={() => navigate('/EditProfilePage')} className="hover:text-purple-600 cursor-pointer">
//                 {t.editProfile}
//               </li>
//               <li onClick={() => navigate('/DashboardPage')} className="hover:text-purple-600 cursor-pointer">
//                 {t.history}
//               </li>
//               <li className="hover:text-purple-600 cursor-pointer">
//                 {t.notifications} <span className="text-green-600 ml-1">{t.on}</span>
//               </li>
//               <li onClick={handleLanguageToggle} className="hover:text-purple-600 cursor-pointer">
//                 {t.language} <span className="ml-1">{language}</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white rounded-lg p-4 shadow border-2 border-purple-900">
//             <h3 className="text-md font-semibold text-gray-700 mb-2">{t.preferences}</h3>
//             <ul className="space-y-2">
//               <li className="hover:text-purple-600 cursor-pointer">{t.security}</li>
//               <li className="hover:text-purple-600 cursor-pointer">
//                 {t.theme} <span className="ml-1">{t.lightMode}</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white rounded-lg p-4 shadow border-2 border-purple-900">
//             <h3 className="text-md font-semibold text-gray-700 mb-2">{t.helpSupport}</h3>
//             <ul className="space-y-2">
//               <li className="hover:text-purple-600 cursor-pointer">{t.contact}</li>
//               <li onClick={() => navigate('/AddFeedback')} className="hover:text-purple-600 cursor-pointer">
//                 {t.feedback}
//               </li>
//               <li className="hover:text-purple-600 cursor-pointer">{t.privacy}</li>
//             </ul>
//           </section>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SettingsPage;

import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "./config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

// الترجمة
const translations = {
  English: {
    account: "Account",
    editProfile: "✏️ Edit profile information",
    history: "📜 History",
    notifications: "🔔 Notifications",
    language: "🌐 Language",
    preferences: "Preferences",
    security: "🔒 Security",
    theme: "🎨 Theme",
    helpSupport: "Help & Support",
    contact: "📞 Contact us",
    feedback: "📝 Feedback",
    privacy: "📄 Privacy policy",
    howItWorks: "❓ How It Works", // ✅ مضافة
    lightMode: "Light mode",
    on: "ON",
    userName: "User name",
  },
  Arabic: {
    account: "الحساب",
    editProfile: "✏️ تعديل معلومات الحساب",
    history: "📜 السجل",
    notifications: "🔔 الإشعارات",
    language: "🌐 اللغة",
    preferences: "التفضيلات",
    security: "🔒 الأمان",
    theme: "🎨 النمط",
    helpSupport: "المساعدة والدعم",
    contact: "📞 تواصل معنا",
    feedback: "📝 ملاحظات",
    privacy: "📄 سياسة الخصوصية",
    howItWorks: "❓ كيف يعمل", // ✅ مضافة
    lightMode: "الوضع الفاتح",
    on: "تشغيل",
    userName: "اسم المستخدم",
  }
};

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState("English");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            });
            setLanguage(data.language || "English");
          } else {
            // إذا أول مرة يسجل
            await setDoc(userRef, {
              firstName: "First",
              lastName: "Last",
              email: user.email,
              notifications: true,
              theme: "Light",
              language: "English",
            });
            setUserData({
              firstName: "First",
              lastName: "Last",
              email: user.email,
            });
            setLanguage("English");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUserData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [location.state]);

  const handleLanguageToggle = async () => {
    const newLanguage = language === "English" ? "Arabic" : "English";
    setLanguage(newLanguage);

    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { language: newLanguage });
      }
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  const t = translations[language];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen flex justify-center items-start pt-16 overflow-hidden">
      <div className="shadow-lg rounded-xl p-8 w-[700px] border-2 border-purple-900 relative z-10">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">👤</div>
          <h2 className="text-xl font-semibold">
            {userData ? `${userData.firstName} ${userData.lastName}` : t.userName}
          </h2>
          <p className="text-sm text-gray-700">
            {userData ? userData.email : "user@emailprovider.com"}
          </p>
        </div>

        <div className="space-y-4">
          <section className="bg-white

Aya KH, [5/2/2025 4:38 PM]
rounded-lg p-4 shadow border-2 border-purple-900">
            <h3 className="text-md font-semibold text-gray-700 mb-2">{t.account}</h3>
            <ul className="space-y-2">
              <li onClick={() => navigate('/EditProfilePage')} className="hover:text-purple-600 cursor-pointer">
                {t.editProfile}
              </li>
              <li onClick={() => navigate('/DashboardPage')} className="hover:text-purple-600 cursor-pointer">
                {t.history}
              </li>
              <li className="hover:text-purple-600 cursor-pointer">
                {t.notifications} <span className="text-green-600 ml-1">{t.on}</span>
              </li>
              <li onClick={handleLanguageToggle} className="hover:text-purple-600 cursor-pointer">
                {t.language} <span className="ml-1">{language}</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg p-4 shadow border-2 border-purple-900">
            <h3 className="text-md font-semibold text-gray-700 mb-2">{t.preferences}</h3>
            <ul className="space-y-2">
              <li className="hover:text-purple-600 cursor-pointer">{t.security}</li>
              <li className="hover:text-purple-600 cursor-pointer">
                {t.theme} <span className="ml-1">{t.lightMode}</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg p-4 shadow border-2 border-purple-900">
            <h3 className="text-md font-semibold text-gray-700 mb-2">{t.helpSupport}</h3>
            <ul className="space-y-2">
              <li className="hover:text-purple-600 cursor-pointer">{t.contact}</li>
              <li onClick={() => navigate('/AddFeedback')} className="hover:text-purple-600 cursor-pointer">
                {t.feedback}
              </li>
              <li onClick={() => navigate('/HowItWorks')} className="hover:text-purple-600 cursor-pointer">
                {t.howItWorks}
              </li>
              <li className="hover:text-purple-600 cursor-pointer">{t.privacy}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;