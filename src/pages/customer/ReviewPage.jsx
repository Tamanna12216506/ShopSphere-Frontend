import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'

export default function ReviewPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)

  const handleSubmitReview = () => {
    if (rating === 0) {
      setShowRatingModal(true)
      return
    }

    setIsSubmitting(true)

    try {
      const reviews = JSON.parse(localStorage.getItem('orderReviews') || '{}')
      const review = {
        orderId,
        rating,
        text: reviewText.trim() || 'No text provided',
        timestamp: new Date().toISOString(),
      }
      reviews[orderId] = review
      localStorage.setItem('orderReviews', JSON.stringify(reviews))
      
      toast.success('Review submitted successfully!')
      setTimeout(() => {
        navigate(`/orders/${orderId}`)
      }, 500)
    } catch (error) {
      toast.error('Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="shopsphere-card p-6 sm:p-8">
        <div>
          <p className="text-sm text-dark-500">Order #{orderId}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Share Your Review</h1>
          <p className="mt-3 text-dark-600">Tell us about your experience with this order</p>
        </div>

        <div className="mt-8 space-y-8">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-semibold text-dark-900 mb-4">
              How would you rate your order? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-300 text-amber-300'
                        : 'text-surface-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-dark-500">
              {rating > 0 ? `You rated ${rating} out of 5 stars` : 'Select a rating'}
            </p>
          </div>

          {/* Review Text Section */}
          <div>
            <label className="block text-sm font-semibold text-dark-900 mb-3">Your Review <span className="text-dark-400 text-xs font-normal">(Optional)</span></label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts about the product, packaging, delivery, and overall experience..."
              className="w-full rounded-xl border border-surface-200 bg-white px-4 py-3 text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
              rows={6}
            />
            <p className="mt-2 text-sm text-dark-500">
              {reviewText.length} characters
            </p>
          </div>

          {/* Info Box */}
          <div className="rounded-xl bg-gradient-to-r from-pastel-mint/30 to-pastel-cyan/30 border border-pastel-mint/50 p-4">
            <p className="text-sm text-dark-700">
              <span className="font-semibold">💡 Tip:</span> Detailed reviews help other customers make informed decisions!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={handleSubmitReview}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => navigate(`/orders/${orderId}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Rating Modal Popup */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="shopsphere-card p-6 sm:p-8 max-w-sm mx-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <Star className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <h2 className="font-display text-xl font-bold text-dark-900 text-center">Rating Required</h2>
            <p className="mt-3 text-dark-600 text-center text-sm">
              Please select a rating before submitting your review. Your rating helps us improve our service!
            </p>
            <div className="mt-6">
              <Button className="w-full" onClick={() => setShowRatingModal(false)}>
                Got it, Let me rate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
