import React, { useRef } from 'react'
import UploadIcon from './icons/upload_logo'

interface Props {
  onSelectedFile: (file: File) => void
}

function DragAndDropArea({ onSelectedFile }: Props) {
  const dropZone = useRef<HTMLDivElement>(null)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    onSelectedFile(event.target.files![0])
  }

  return (
    <div
      ref={dropZone}
      className="dotted_container w-full h-[220px] relative py-8 flex flex-col justify-between items-center bg-[#F6F8FB] rounded-xl"
    >
      <input
        type="file"
        className="absolute w-full h-full opacity-0 top-0"
        onChange={handleOnChange}
      />
      <UploadIcon />
      <p className="text-lg text-[#BDBDBD]">Drag & Drop your image here</p>
    </div>
  )
}

export default DragAndDropArea
