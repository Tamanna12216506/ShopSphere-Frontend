export default function AddressForm({ register, errors }) {
  const fields = [
    ['fullName', 'Full name'],
    ['addressLine1', 'Address line 1'],
    ['addressLine2', 'Address line 2'],
    ['city', 'City'],
    ['state', 'State'],
    ['postalCode', 'Postal code'],
    ['country', 'Country'],
    ['phone', 'Phone'],
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(([name, label]) => (
        <label key={name} className={name === 'addressLine2' ? 'sm:col-span-2' : ''}>
          <span className="mb-2 block text-sm font-semibold text-dark-700">{label}</span>
          <input
            className="shopsphere-input"
            {...register(name, { required: `${label} is required` })}
            placeholder={label}
          />
          {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>}
        </label>
      ))}
    </div>
  )
}