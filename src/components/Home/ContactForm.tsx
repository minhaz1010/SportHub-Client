import { useState } from 'react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    toast.success("Thank You For Contact With Us", {
      position: "top-center",
      duration: 1000
    })
  };

  return (
    <div className="flex justify-center roboto-flex items-center py-10 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <h2 className="text-4xl font-semibold text-gray-900 text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Subject"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Your Message"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
