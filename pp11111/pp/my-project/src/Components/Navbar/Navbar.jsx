// import booklogo from "../../assets/website/book-logo.png";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="w-full bg-white shadow-sm">
//       <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
        
//         {/* Left Section: Logo + Menu */}
//         <div className="flex items-center space-x-10">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <img src={booklogo} alt="Book Logo" className="w-6 h-6" />
//             <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
//               Once Upon A Time
//             </span>
//           </Link>

//           {/* Navigation Menu */}
//           <ul className="hidden sm:flex space-x-8 text-gray-700 font-medium">
//             <li>
//               <Link to="/" className="hover:text-pink-500 transition duration-200">Home</Link>
//             </li>
//             <li>
//               <Link to="/PricingPage" className="hover:text-pink-500 transition duration-200">Pricing</Link>
//             </li>
//             <li>
//               <Link to="/how-it-works" className="hover:text-pink-500 transition duration-200">How It Works</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Right Side: Sign In + Get Started */}
//         <div className="flex items-center space-x-4">
//           <Link to="/LoginSign" state={{ from: "login" }} className="text-gray-600 hover:text-pink-500 font-medium">
//             Sign In
//           </Link>
//           <Link to="/LoginSign" state={{ from: "signup" }}>
//             <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300">
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

//////////////////////////////////////////////////////////////////////  may 1  -- 9:30 pm
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, monitorAuthState } from "../../config/firebase";
import { signOut } from "firebase/auth";
import booklogo from "../../assets/website/book-logo.png";
import { useNavigate} from "react-router-dom";



const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    const unsubscribe = monitorAuthState((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
    navigate("/");//retern to home page

  };


  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Left Section: Logo + Menu */}
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center space-x-2">
            <img src={booklogo} alt="Book Logo" className="w-6 h-6" />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Once Upon A Time
            </span>
          </Link>

          <ul className="hidden sm:flex space-x-8 text-gray-700 font-medium">
            <li>
              {/* <Link to="/" className="hover:text-pink-500 transition duration-200">Home</Link> */}
              <Link
              to={user ? "/DashboardPage" : "/"}
               className="hover:text-pink-500 transition duration-200"
            >  Home
            </Link>
            </li>
            <li>
              <Link to="/PricingPage" className="hover:text-pink-500 transition duration-200">Pricing</Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-pink-500 transition duration-200">How It Works</Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* ✅ Profile image (now comes first, to the left of Checkout) */}
              <div className="relative group">
                <button className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/100"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <Link
                    to="/SettingsPage"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* ✅ Checkout button comes last (rightmost) */}
              {/* <Link to="/checkout"> */}
              {/* <button
  onClick={() => navigate("/CartPage", { state: { cart } }) }
  className="bg-gradient-to-r from-purple-500 to-orange-400 text-white font-semibold px-4 py-2 rounded-full shadow-md"
>
  Checkout
</button> */}
<button
  onClick={() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    navigate("/CartPage", { state: { cart: storedCart } });
  }}
  className="bg-gradient-to-r from-purple-500 to-orange-400 text-white font-semibold px-4 py-2 rounded-full shadow-md"
>
  Checkout
</button>

              {/* </Link> */}
            </>
          ) : (
            <>
              <Link to="/LoginSign" state={{ from: "login" }} className="text-gray-600 hover:text-pink-500 font-medium">
                Sign In
              </Link>
              <Link to="/LoginSign" state={{ from: "signup" }}>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

</div>
    </div>
  );
};

export default Navbar;