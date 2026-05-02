import { useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject')
      return
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.")
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-dark-900 mb-3">
            Get in Touch
          </h1>
          <p className="text-lg text-dark-600">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="shopsphere-card p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-pastel-mint/20 to-pastel-cyan/20 flex items-center justify-center text-pastel-mint">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="font-semibold text-dark-900 mb-2">Phone</h3>
            <a href="tel:+              Call +91-9876543210
" className="text-dark-600 hover:text-pastel-pink transition-colors">
                            +91-9876543210

            </a>
          </div>

          <div className="shopsphere-card p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-pastel-pink/20 to-pastel-rose/20 flex items-center justify-center text-pastel-pink">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M7 10.5L12 13.5L17 10.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-dark-900 mb-2">Email</h3>
            <a href="mailto:support@shopsphere.local" className="text-dark-600 hover:text-pastel-pink transition-colors">
              support@shopsphere.local
            </a>
          </div>

          <div className="shopsphere-card p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-pastel-violet/20 to-pastel-purple/20 flex items-center justify-center text-pastel-violet">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-semibold text-dark-900 mb-2">Address</h3>
            <p className="text-dark-600">
             Kapurthala, Phagwara<br />
              Punjab, India
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="shopsphere-card p-8">
          <h2 className="text-2xl font-bold text-dark-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-900 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                rows="5"
                className="w-full rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-pastel-mint/20 to-pastel-cyan/20 border border-pastel-mint/30 p-8">
          <h3 className="text-lg font-semibold text-dark-900 mb-3">Response Time</h3>
          <p className="text-dark-600">
            We typically respond to all inquiries within 24 business hours. For urgent matters, please call us directly at <a href="tel:+91 9876543210" className="font-semibold text-pastel-pink hover:underline">+91 9876543210</a>.
          </p>
        </div>
      </div>
    </div>
  )
}