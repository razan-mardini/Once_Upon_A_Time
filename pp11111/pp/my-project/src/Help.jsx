import { useState } from "react";

const faqs = [
  {
    question: "How can I generate a book?",
    answer: "You can generate a book by following the steps on our platform.",
  },
  {
    question: "What are the adjustable parameters to generate a book?",
    answer:
      "You can customize the genre, length, writing style, and illustrations.",
  },
  {
    question: "What happens when I don't like the generated image?",
    answer:
      "You can request a new image or adjust the settings for better results.",
  },
  {
    question:
      "What if I don't like some parts of the book (paragraphs or illustrations)?",
    answer: "You can edit the text and replace images manually.",
  },
  {
    question: "How much does it cost to generate a book?",
    answer:
      "Pricing varies based on customization and features. Please check our pricing page.",
  },
  {
    question: "What will be the result?",
    answer: "You will get a downloadable digital book with text and images.",
  },
  {
    question: "Will I have the rights of the book?",
    answer: "Yes, you will own the full rights to the book you generate.",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-2">
            <button
              className="w-full text-left flex justify-between items-center p-3 bg-gray-100 rounded-md"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <p className="p-3">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
