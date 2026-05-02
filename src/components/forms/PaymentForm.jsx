export default function PaymentForm({ paymentMode, register, errors }) {
  const modes = ['CARD', 'UPI', 'COD']

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {modes.map((mode) => (
          <label
            key={mode}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${
              paymentMode === mode ? 'border-dark-800 bg-dark-900 text-white' : 'border-surface-200 bg-white'
            }`}
          >
            <input type="radio" value={mode} {...register('paymentMode', { required: true })} />
            <span className="font-semibold">{mode}</span>
          </label>
        ))}
      </div>

      {paymentMode === 'CARD' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-semibold text-dark-700">Card holder name</span>
            <input className="shopsphere-input" {...register('cardHolderName', { required: 'Card holder name is required' })} />
            {errors.cardHolderName && <p className="mt-1 text-xs text-red-600">{errors.cardHolderName.message}</p>}
          </label>
          <label>
            <span className="mb-2 block text-sm font-semibold text-dark-700">Card PIN</span>
            <input className="shopsphere-input" {...register('cardPin', { required: 'Card PIN is required' })} />
            {errors.cardPin && <p className="mt-1 text-xs text-red-600">{errors.cardPin.message}</p>}
          </label>
        </div>
      )}
    </div>
  )
}