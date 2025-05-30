import { FaUserAlt, FaMagic } from "react-icons/fa";
import { PiBookOpenTextFill } from "react-icons/pi";

const WhyChoose = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Label */}
        <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-1 rounded-full mb-4 inline-block">
          Features
        </span>

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">
          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">For You Tales</span>?
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-12">
          We create magical reading experiences that grow with your child.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Personalized */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-purple-50 to-white shadow-sm border border-gray-100">
            <div className="text-purple-600 text-4xl mb-4 flex justify-center">
              <FaUserAlt />
            </div>
            <h3 className="text-lg font-bold text-purple-700 mb-2">Personalized</h3>
            <p className="text-sm text-gray-700">
              Create a one-of-a-kind story tailored to your child’s name, interests, and adventures—delivered in seconds!
            </p>
          </div>

          {/* Educational */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-pink-50 to-white shadow-sm border border-gray-100">
            <div className="text-pink-500 text-4xl mb-4 flex justify-center">
              <PiBookOpenTextFill />
            </div>
            <h3 className="text-lg font-bold text-pink-600 mb-2">Educational</h3>
            <p className="text-sm text-gray-700">
              Age-appropriate content that helps develop reading skills.
            </p>
          </div>

          {/* Magical */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-yellow-50 to-white shadow-sm border border-gray-100">
            <div className="text-yellow-400 text-4xl mb-4 flex justify-center">
              <FaMagic />
            </div>
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Magical</h3>
            <p className="text-sm text-gray-700">
              Enchanting illustrations and stories that spark imagination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
