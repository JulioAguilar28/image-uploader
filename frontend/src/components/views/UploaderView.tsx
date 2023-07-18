import { useRef } from 'react'
import DragAndDropArea from '../DragAndDropArea'
import ButtonView from './ButtonView'
import { getFileType } from '../../utils/files'

interface Props {
  onSelectedFile: (file: File) => void
  acceptedFiles?: string
}

function UploaderView({ onSelectedFile, acceptedFiles }: Props) {
  const inputFile = useRef<HTMLInputElement>(null)

  const handleSelectedFile = (file: File) => {
    onSelectedFile(file)
  }

  const handleChooseFileClick = () => {
    inputFile.current?.click()
  }

  return (
    <>
      <header className="flex flex-col gap-y-4 mb-8">
        <h2 className="text-xl text-[#4F4F4F]">Upload your image</h2>
        <p className="text-sm text-[#828282]">File should be Jpeg, Png...</p>
      </header>

      <DragAndDropArea
        onSelectedFile={handleSelectedFile}
        acceptedFiles={acceptedFiles}
      />

      <footer className="mt-4 flex flex-col items-center gap-y-4">
        <p className="text-sm text-[#828282]">Or</p>
        <input
          ref={inputFile}
          type="file"
          hidden
          accept={acceptedFiles}
          onChange={(e) => handleSelectedFile(e.target.files![0])}
        />
        <ButtonView onClick={handleChooseFileClick}>Choose a file</ButtonView>
      </footer>
    </>
  )
}

export default UploaderView
