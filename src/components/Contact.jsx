import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import useAlert from "../hooks/useAlert"; // Custom hook to show feedback to users

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert } = useAlert(); // Reusable alert system
  const [loading, setLoading] = useState(false); // handle button loading state

  // Update form inputs dynamically
  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  // Email submission logic using EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // input validation
    if (!form.name || !form.email || !form.message) {
      showAlert({
        show: true,
        text: "Please fill all fields",
        type: "danger",
      });
      return;
    }

    setLoading(true); // Disable submit and show spinner

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Minindu", 
          from_email: form.email,
          to_email: "minindupavith20@gmail.com", 
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      showAlert({
        show: true,
        text: "Message sent successfully! 🎉",
        type: "success",
      });

      // Reset form
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);

      showAlert({
        show: true,
        text: `Failed to send: ${error.text || "Server error"}`,
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-violet-50 py-16">
      
      {/* Form container */}
      <div className="max-w-2xl mx-auto bg-black rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-yellow-300 mb-8 text-center">
            Get in Touch
          </h1>

          {/* EmailJS Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label className="block text-yellow-300/80 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/70 border border-yellow-300/30 rounded-lg text-yellow-300 placeholder-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-yellow-300/80 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/70 border border-yellow-300/30 rounded-lg text-yellow-300 placeholder-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-yellow-300/80 font-medium mb-2">Your Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/70 border border-yellow-300/30 rounded-lg text-yellow-300 placeholder-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent"
              />
            </div>

            {/* Submit Button with loading animation */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 text-black font-bold py-3 px-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Animated Alert Box */}
      {alert.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg bg-[#fdff65] text-black font-medium animate-fade-in`}>
          {alert.text}
        </div>
      )}

      {/* Ending CTA */}
      <div className="w-full text-center my-20">
        <h2 className="text-5xl font-zentry font-bold bg-clip-text text-black tracking-wide leading-snug animate-fadeInUp">
          let’s build something different together
        </h2>
      </div>
    </section>
  );
};

export default Contact;
