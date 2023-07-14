import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

function ButtonView({ ...attributes }: Props) {
  return (
    <button
      {...attributes}
      className="bg-[#2F80ED] hover:opacity-90 w-full px-4
      py-2 rounded-lg text-white text-md whitespace-nowrap
      disabled:bg-[#4F4F4F] disabled:opacity-100"
    >
      {attributes.children}
    </button>
  )
}

export default ButtonView
