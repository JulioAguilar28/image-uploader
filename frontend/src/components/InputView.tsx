import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

function InputView({ ...attributes }: Props) {
  return (
    <input
      {...attributes}
      className="w-full border border-[#828282] opacity-70 rounded p-1 text-[#4F4F4F] focus:outline-none focus:border-[#2F80ED]"
    />
  )
}

export default InputView
