import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function PrivacyTermsPage() {
  const [activeTab, setActiveTab] = useState('privacy')

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="text-pastel-pink hover:text-pastel-violet mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-surface-50 mb-3">Privacy Policy & Terms</h1>
          <p className="text-surface-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-dark-700">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-4 px-6 font-semibold text-sm transition-colors ${
              activeTab === 'privacy'
                ? 'text-pastel-pink border-b-2 border-pastel-pink'
                : 'text-surface-300 hover:text-pastel-pink'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-4 px-6 font-semibold text-sm transition-colors ${
              activeTab === 'terms'
                ? 'text-pastel-pink border-b-2 border-pastel-pink'
                : 'text-surface-300 hover:text-pastel-pink'
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-surface-50 mb-4">Privacy Policy</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  At ShopSphere, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-violet mb-4">Information We Collect</h3>
                <ul className="space-y-3 text-surface-300">
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span><strong>Personal Information:</strong> Name, email address, phone number, shipping address</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span><strong>Payment Information:</strong> Credit card details processed securely through payment gateways</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span><strong>Usage Data:</strong> Pages visited, time spent, device type, IP address, browser information</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span><strong>Cookies & Tracking:</strong> To enhance user experience and analyze website performance</span>
                  </li>
                </ul>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-mint mb-4">How We Use Your Information</h3>
                <ul className="space-y-2 text-surface-300">
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>Process and deliver your orders</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>Send order updates and notifications</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>Improve our website and services</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>Send promotional emails (with your consent)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>Prevent fraud and ensure security</span>
                  </li>
                </ul>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-violet mb-4">Data Security</h3>
                <p className="text-surface-300 leading-relaxed">
                  We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information.
                </p>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-violet mb-4">Your Rights</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-surface-300">
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">◆</span>
                    <span>Access your personal data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">◆</span>
                    <span>Correct inaccurate information</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">◆</span>
                    <span>Request deletion of your data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">◆</span>
                    <span>Opt-out of marketing communications</span>
                  </li>
                </ul>
              </section>
            </div>
          )}

          {/* Terms of Service */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-surface-50 mb-4">Terms of Service</h2>
                <p className="text-surface-300 leading-relaxed mb-4">
                  These Terms of Service govern your use of ShopSphere and all products and services provided by ShopSphere.
                </p>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-violet mb-4">Use License</h3>
                <p className="text-surface-300 leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials (information or software) on ShopSphere for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="space-y-2 text-surface-300">
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span>Modify or copy the materials</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span>Use the materials for any commercial purpose or for any public display</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span>Attempt to decompile or reverse engineer any software contained on ShopSphere</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-pink">•</span>
                    <span>Transfer the materials to another person or "mirror" the materials on any other server</span>
                  </li>
                </ul>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-violet mb-4">Disclaimer</h3>
                <p className="text-surface-300 leading-relaxed">
                  The materials on ShopSphere are provided on an 'as is' basis. ShopSphere makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-violet mb-4">Limitations</h3>
                <p className="text-surface-300 leading-relaxed">
                  In no event shall ShopSphere or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ShopSphere.
                </p>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-mint mb-4">Product Terms</h3>
                <ul className="space-y-2 text-surface-300">
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>All products are subject to availability</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>We reserve the right to refuse any order</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>Prices are subject to change without notice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pastel-mint">→</span>
                    <span>30-day return policy on most items</span>
                  </li>
                </ul>
              </section>

              <section className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-pastel-violet mb-4">User Accounts</h3>
                <p className="text-surface-300 leading-relaxed">
                  When you create an account with ShopSphere, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
                </p>
              </section>
            </div>
          )}


        </div>

        {/* Contact Section */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <h3 className="text-lg font-semibold text-surface-50 mb-3">Questions about our policies?</h3>
          <p className="text-surface-300 text-sm mb-6">
            If you have any questions about our Privacy Policy or Terms of Service, please contact us.
          </p>
          <Link to="/contact">
            <Button className="px-6">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
