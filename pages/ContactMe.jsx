"use client"

import { useState , useRef } from "react"
import { Send, CheckCircle } from "lucide-react"
import { motion, useInView } from "framer-motion"
import emailjs from '@emailjs/browser';


export default function ContactSection() {
  const sectionRef = useRef(null)
const leftColumnRef = useRef(null)
const rightColumnRef = useRef(null)


const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 })
const leftColumnInView = useInView(leftColumnRef, { once: true, amount: 0.3 })
const rightColumnInView = useInView(rightColumnRef, { once: true, amount: 0.3 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      // Replace these with your actual EmailJS service, template, and user IDs
      const result = await emailjs.sendForm(
        'service_n5btgua',
        'template_4drn9so',
        e.target,
        'rtuY9MMdbfQWA0Mpu'
      );
      
      console.log('Email sent successfully:', result.text);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error - maybe set an error state to show the user
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    
    <section 
    ref={sectionRef} className="w-full  text-white mt-[15vh]  px-4 md:px-8">
      <div id="Contact"
      className="max-w-6xl mx-auto pb-[10vh] ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pt-20 "
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-2 font-Theatre">CONTACT ME</h2>
          <div className="flex items-center justify-center gap-2 text-lg font-chakra">
            <span>Connect</span>
            <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
            <span>Collaborate</span>
            <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
            <span>Create</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            ref={leftColumnRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftColumnInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold font-brico">Let's work together</h3>
            <p className="text-gray-400 max-w-md font-chakra">
              Have a project in mind or just want to say hello? I'm always open to discussing new projects, creative
              ideas or opportunities to be part of your vision.
            </p>

            <div className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="font-chakra">
                  <p className="text-gray-400 text-sm ">Email</p>
                  <p className="font-medium">sharmajayditya@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div className="font-chakra">
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-medium">Remote / Worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
              <svg 
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 448 512"
               >
               <path 
              fill="currentColor" 
               d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  />
           </svg>
           
             </div>
             <div className="font-chakra">
                  <p className="text-gray-400 text-sm">Whatsapp</p>
                  <p className="font-medium">+91 9664086233</p>
                </div>
             </div>
            </div>
          </motion.div>

          <motion.div
            ref={rightColumnRef}
            initial={{ opacity: 0, x: 30 }}
            animate={rightColumnInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full bg-black/50 border ${errors.name ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full bg-black/50 border ${errors.email ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-black/50 border ${errors.message ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
