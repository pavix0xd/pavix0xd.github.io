import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import useAlert from "../hooks/useAlert";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: form.name,
      to_name: "Minindu",
      from_email: form.email,
      to_email: "minindupavith20@gmail.com",
      message: form.message,
    };

    console.log("Sending with params:", templateParams);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        setLoading(false);
        showAlert({
          show: true,
          text: "Thank you for your message! I'll get to you as soon as possible. 😃 ",
          type: "success",
        });

        setTimeout(() => {
          hideAlert();
          setForm({ name: "", email: "", message: "" });
        }, 3000);
      },
      (error) => {
        setLoading(false);
        console.error("EmailJS Error:", {
          status: error.status,
          text: error.text,
          details: error
        });
        showAlert({
          show: true,
          text: `Failed to send: ${error.text || "Please try again later"}`,
          type: "danger",
        });
      }
    );
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-violet-50 py-16">
      {/* Black form container */}
      <div className="max-w-2xl mx-auto bg-black rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-yellow-300 mb-8 text-center">
            Get in Touch
          </h1>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-yellow-300/80 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 bg-black/70 border border-yellow-300/30 rounded-lg text-yellow-300 placeholder-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent"
                placeholder="Your name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-yellow-300/80 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-black/70 border border-yellow-300/30 rounded-lg text-yellow-300 placeholder-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-yellow-300/80 font-medium mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                className="w-full px-4 py-3 bg-black/70 border border-yellow-300/30 rounded-lg text-yellow-300 placeholder-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

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

      {/* Improved Alert */}
      {alert.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${alert.type === 'success' ? 'bg-[#fdff65]' : 'bg-[#fdff65]'} text-black font-medium animate-fade-in`}>
          {alert.text}
        </div>
      )}
        <div className="w-full text-center my-20 "><h2 className="text-5xl center font-zentry font-bold bg-clip-text text-black tracking-wide leading-snug animate-fadeInUp">
          let’s build something different together
        </h2></div>

    </section>
  );
};

export default Contact;