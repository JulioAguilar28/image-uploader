import React, { useRef } from 'react'
import UploadIcon from './icons/upload_logo'
import { getFileType } from '../utils/files'
import useToast from '../hooks/useToast'

interface Props {
  onSelectedFile: (file: File) => void
  acceptedFiles?: string
}

function DragAndDropArea({ onSelectedFile, acceptedFiles }: Props) {
  const dropZone = useRef<HTMLDivElement>(null)
  const inputFile = useRef<HTMLInputElement>(null)
  const { showErrorToast } = useToast()

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files![0]
    const fileType = getFileType(file)

    if (!acceptedFiles?.includes(fileType)) {
      inputFile.current!.value = ''
      showErrorToast('You must provide a valid image file')
      return
    }

    onSelectedFile(event.target.files![0])
  }

  return (
    <div
      ref={dropZone}
      className="dotted_container w-full h-[220px] relative py-8 flex flex-col justify-between items-center bg-[#F6F8FB] rounded-xl"
    >
      <input
        ref={inputFile}
        type="file"
        className="absolute w-full h-full opacity-0 top-0"
        accept={acceptedFiles}
        onChange={handleOnChange}
      />
      <UploadIcon />
      <p className="text-lg text-[#BDBDBD]">Drag & Drop your image here</p>
    </div>
  )
}

export default DragAndDropArea
