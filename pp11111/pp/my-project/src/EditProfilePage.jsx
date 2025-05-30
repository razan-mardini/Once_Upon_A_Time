
// import { useEffect, useState } from "react";
// import { db, auth } from "./config/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const EditProfilePage = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const userRef = doc(db, "users", user.uid);
//           const userSnap = await getDoc(userRef);
//           if (userSnap.exists()) {
//             const data = userSnap.data();
//             setFirstName(data.firstName || "");
//             setLastName(data.lastName || "");
//             setEmail(data.email || "");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSave = async () => {
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, {
//           firstName,
//           lastName,
//           email,
//         });
//         // هنا نضيف الـ navigate مع state
//         navigate("/SettingsPage", { state: { updated: true } });
//       }
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-[400px] border-2 border-purple-900">
//         <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Edit Profile</h2>
//         <div className="space-y-4">
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="First Name"
//             className="w-full p-2 border-2 border-purple-400 rounded-lg"
//           />
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Last Name"
//             className="w-full p-2 border-2 border-purple-400 rounded-lg"
//           />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-full p-2 border-2 border-purple-400 rounded-lg"
//           />
//           <button
//             onClick={handleSave}
//             className="w-full bg-purple-700 text-white p-2 rounded-lg hover:bg-purple-800 transition"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;

//////////////////////////////////////////////////// may 1  10:20 
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const EditProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState(""); // ✅ للحفظ

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setEmail(data.email || "");
          setPhoneNumber(data.phoneNumber || "");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          firstName,
          lastName,
          email,
          phoneNumber:phoneNumber.trim()
        });
        
        navigate("/EditProfilePage", { replace: true });

       
        

        setSaveMessage("✅ Profile updated successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } catch (error) {
        console.error(error);
        setSaveMessage("❌ Failed to update profile. Please try again.");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    }
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    if (!user || !currentPassword || !newPassword) {
      setPasswordMessage("Please fill out all password fields.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setPasswordMessage("✅ Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        setPasswordMessage("❌ Current password is incorrect.");
      } else {
        setPasswordMessage("❌ Something went wrong.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-[420px] border-2 border-purple-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Edit Profile Info.</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full p-2 border-2 border-purple-300 rounded-lg"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full p-2 border-2 border-purple-300 rounded-lg"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border-2 border-purple-300 rounded-lg"
          />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}

placeholder="Phone Number"
            className="w-full p-2 border-2 border-purple-300 rounded-lg"
          />
          <button
            onClick={handleSave}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 w-full"
          >
            Save Changes
          </button>

          {saveMessage && (
            <p className="text-sm text-center mt-2 text-gray-700">{saveMessage}</p>
          )}
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 mb-3 border-2 border-purple-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 mb-3 border-2 border-purple-300 rounded-lg"
          />
          <button
            onClick={handleChangePassword}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 w-full"
          >
            Save New Password
          </button>
          {passwordMessage && (
            <p className="mt-2 text-sm text-gray-700">{passwordMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;