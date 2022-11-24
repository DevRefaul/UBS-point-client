import React from "react";
import contactAnim from "./contact-us-animation.json";
import Lottie from "lottie-react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.message;
    const email = form.message;
    const message = form.message.value;

    toast.success("Submitted successfully");

    form.reset();
  };

  return (
    <div className="flex justify-center items-center h-screen w-[90%] md:w-[80%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* animation div */}
        <div>
          <Lottie animationData={contactAnim} />
        </div>
        {/* animation div end */}

        {/* contact form div */}
        <div>
          <form
            onSubmit={handleSubmit}
            noValidate=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div>
              <label htmlFor="name" className="text-sm">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded border-2 border-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded border-2 border-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows="3"
                placeholder="Your Messsage"
                className="w-full p-3 rounded border-2 border-green-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 text-sm border-2 border-transparent font-bold tracking-wide uppercase rounded bg-green-400 text-white hover:text-green-500 hover:border-green-500 hover:bg-white"
            >
              Send Message
            </button>
          </form>
        </div>
        {/* contact form div end */}
      </div>
    </div>
  );
};

export default Contact;
