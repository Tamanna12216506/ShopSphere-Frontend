import { useState } from 'react'

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'How do I track my order?',
      answer:
        'You can track your order in real-time by logging into your account and visiting the "Orders" section. You\'ll receive an SMS and email with a tracking number once your item ships from our Punjab warehouse.',
    },
    {
      id: 2,
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy on all items across India. Products must be in original condition with all packaging and tags intact. Simply initiate a return through your account or contact our Punjab support team.',
    },
    {
      id: 3,
      question: 'How long does delivery take?',
      answer:
        'Delivery times vary by location: Punjab (2-3 days), North India (3-4 days), Other parts of India (5-7 days). We ship Monday-Friday from our Chandigarh warehouse. Express delivery options are available at checkout.',
    },
    {
      id: 4,
      question: 'Do you ship across India?',
      answer:
        'Yes! We ship to all major cities and towns across India. We have primary coverage in Punjab, Himachal Pradesh, Haryana, and Uttar Pradesh. Check shipping options during checkout to see delivery dates for your location.',
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major Indian payment methods: UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, American Express), Net Banking, Wallets, and Cash on Delivery (COD). All payments are secured with 256-bit SSL encryption.',
    },
    {
      id: 6,
      question: 'How do I contact customer support?',
      answer:
        'Reach us via WhatsApp at +91-98765-43210, email at support@shopsphere.local, or use our contact form. Our Punjab-based support team is available Monday-Sunday, 10 AM - 8 PM IST.',
    },
    {
      id: 7,
      question: 'Can I cancel or modify my order?',
      answer:
        'Orders can be cancelled or modified within 3 hours of placement. After that, the order enters our fulfillment process in Punjab and cannot be changed. Contact support immediately via WhatsApp for quick assistance.',
    },
    {
      id: 8,
      question: 'Are there any discounts or loyalty programs?',
      answer:
        'Subscribe to our newsletter for exclusive discounts and early access to new products. We offer special discounts on major Indian festivals and seasonal sales. Follow us on Facebook and Instagram for daily deals!',
    },
  ]

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-dark-900 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-dark-600">
            Find answers to common questions about shopping, delivery, returns, and more across India. Based in Punjab.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="shopsphere-card overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pastel-violet/20 to-pastel-pink/20 flex items-center justify-center text-pastel-pink font-semibold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-dark-900">{faq.question}</h3>
                </div>
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-dark-600 transition-transform duration-300 ${
                    expandedId === faq.id ? 'transform rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Expanded Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2 border-t border-surface-200 text-dark-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-pastel-violet/10 via-pastel-pink/10 to-pastel-rose/10 border border-pastel-violet/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-dark-900 mb-3">
            Still Need Help?
          </h3>
          <p className="text-dark-600 mb-6">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pastel-violet to-pastel-pink text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M7 10.5L12 13.5L17 10.5" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-pastel-pink text-pastel-pink font-semibold hover:bg-pastel-pink/5 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call +91-9876543210
            </a>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="shopsphere-card p-6 text-center">
            <div className="text-3xl font-bold text-pastel-mint mb-2">
              10 AM - 8 PM
            </div>
            <p className="text-sm text-dark-600">
              Support available daily (IST)
            </p>
          </div>

          <div className="shopsphere-card p-6 text-center">
            <div className="text-3xl font-bold text-pastel-pink mb-2">
              2-7D
            </div>
            <p className="text-sm text-dark-600">
              Delivery across India
            </p>
          </div>

          <div className="shopsphere-card p-6 text-center">
            <div className="text-3xl font-bold text-pastel-violet mb-2">
              30D
            </div>
            <p className="text-sm text-dark-600">
              Return window for all purchases
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}