// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   FaEnvelope,
//   FaLock,
//   FaGoogle,
//   FaPhoneAlt,
//   FaUser,
// } from "react-icons/fa";

// import { auth, db } from "../../../config/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// import "./Login.css";

// const LoginSignUp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [action, setAction] = useState("Sign Up");

//   useEffect(() => {
//     if (location.state?.from === "login") {
//       setAction("Login");
//     } else if (location.state?.from === "signup") {
//       setAction("Sign Up");
//     }
//   }, [location.state]);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { email, password } = formData;

//     try {
//       if (action === "Sign Up") {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         await setDoc(doc(db, "users", user.uid), {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           phone: formData.phone,
//           email: formData.email,
//           uid: user.uid,
//           createdAt: new Date(),
//         });

//         setSuccess("Account created successfully 🎉");
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         setSuccess("Logged in successfully 🚀");
//       }
//     } catch (err) {
//       console.error("Auth Error:", err.message);
//       setError(err.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/", { replace: true }); // يعود لصفحة تسجيل الدخول
//     } catch (error) {
//       console.error("Logout error:", error.message);
//     }
//   };

//   return (
//     <div className="login-signup-container">
//       <div className="login-signup-header">
//         <div className="login-signup-text">
//           {action === "Login" ? "Sign In" : "Sign Up Now"}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="login-signup-form">
//         {action === "Sign Up" && (
//           <>
//             <div className="login-signup-input">
//               <FaUser className="login-signup-icon" />
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="login-signup-input">
//               <FaUser className="login-signup-icon" />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </>
//         )}

//         <div className="login-signup-input">
//           <FaEnvelope className="login-signup-icon" />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="login-signup-input">
//           <FaLock className="login-signup-icon" />
//           <input
//             type="password"
//             name="password"
//             placeholder="Your Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {action === "Sign Up" && (
//           <div className="login-signup-input">
//             <FaPhoneAlt className="login-signup-icon" />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number (Optional)"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>
//         )}

//         {action === "Login" && (
//           <div className="login-signup-forgot-password">
//             Forgot Password? <span>Click Here!</span>
//           </div>
//         )}

//         <button type="submit" className="login-signup-button">
//           {action === "Login" ? "Sign In" : "Sign Up"}
//         </button>

//         {error && <div className="login-signup-error">{error}</div>}
//         {success && <div className="login-signup-success">{success}</div>}

//         <div className="login-signup-separator">
//           <hr className="login-signup-line" />
//           <span className="login-signup-or">or</span>
//           <hr className="login-signup-line" />
//         </div>

//         <button type="button" className="login-signup-google-button">
//           <FaGoogle className="login-signup-google-icon" />
//           Log in via Google
//         </button>

//         <div className="login-signup-prompt">
//           {action === "Login" ? (
//             <>
//               Don't have an Account?{" "}
//               <span
//                 onClick={() => setAction("Sign Up")}
//                 className="login-signup-link"
//               >
//                 Sign Up
//               </span>
//             </>
//           ) : (
//             <>
//               Already have an Account?{" "}
//               <span
//                 onClick={() => setAction("Login")}
//                 className="login-signup-link"
//               >
//                 Sign In
//               </span>
//             </>
//           )}
//         </div>
//       </form>

//       {/* Only show logout button if user is logged in */}
//       {action === "Login" && auth.currentUser && (
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="login-signup-button logout-btn"
//         >
//           Log Out
//         </button>
//       )}
//     </div>
//   );
// };

// export default LoginSignUp;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

import { auth, db } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import "./Login.css";

const LoginSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");

  useEffect(() => {
    if (location.state?.from === "login") {
      setAction("Login");
    } else if (location.state?.from === "signup") {
      setAction("Sign Up");
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    try {
      if (action === "Sign Up") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          uid: user.uid,
          createdAt: new Date(),
        });

        setSuccess("Account created successfully 🎉");
        navigate("/DashboardPage");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Logged in successfully 🚀");
        navigate("/DashboardPage");
      }
    } catch (err) {
      console.error("Auth Error:", err.message);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true }); // يعود لصفحة تسجيل الدخول
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-header">
        <div className="login-signup-text">
          {action === "Login" ? "Sign In" : "Sign Up Now"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="login-signup-form">
        {action === "Sign Up" && (
          <>
            <div className="login-signup-input">
              <FaUser className="login-signup-icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-signup-input">
              <FaUser className="login-signup-icon" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="login-signup-input">
          <FaEnvelope className="login-signup-icon" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-signup-input">
          <FaLock className="login-signup-icon" />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}


required
          />
        </div>

        {action === "Sign Up" && (
          <div className="login-signup-input">
            <FaPhoneAlt className="login-signup-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        )}

        {action === "Login" && (
          <div className="login-signup-forgot-password">
            Forgot Password? <span>Click Here!</span>
          </div>
        )}

        <button type="submit" className="login-signup-button">
          {action === "Login" ? "Sign In" : "Sign Up"}
        </button>

        {error && <div className="login-signup-error">{error}</div>}
        {success && <div className="login-signup-success">{success}</div>}

        <div className="login-signup-separator">
          <hr className="login-signup-line" />
          <span className="login-signup-or">or</span>
          <hr className="login-signup-line" />
        </div>

        <button type="button" className="login-signup-google-button">
          <FaGoogle className="login-signup-google-icon" />
          Log in via Google
        </button>

        <div className="login-signup-prompt">
          {action === "Login" ? (
            <>
              Don't have an Account?{" "}
              <span
                onClick={() => setAction("Sign Up")}
                className="login-signup-link"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an Account?{" "}
              <span
                onClick={() => setAction("Login")}
                className="login-signup-link"
              >
                Sign In
              </span>
            </>
          )}
        </div>
      </form>

      
    </div>
  );
};

export default LoginSignUp;