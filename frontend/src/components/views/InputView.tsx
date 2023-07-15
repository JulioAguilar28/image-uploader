import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  errorLabel?: string
  label?: string
}

function InputView({ label, error = false, errorLabel, ...attributes }: Props) {
  const borderDefaultClasses = 'border-[#828282]'
  const borderErrorClasses = 'border-red-600'
  const borderClasses = error ? borderErrorClasses : borderDefaultClasses

  return (
    <label className="w-full flex flex-col">
      {label && <span className="text-md text-gray-700 pb-1">{label}</span>}
      <input
        {...attributes}
        className={`w-full border ${borderClasses} opacity-70 rounded p-2 text-[#4F4F4F] focus:outline-none focus:border-[#2F80ED]`}
      />
      {error && <span className="text-xs text-red-400">{errorLabel}</span>}
    </label>
  )
}

export default InputView
