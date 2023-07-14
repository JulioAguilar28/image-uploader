import React, { useRef } from 'react'
import DragAndDropArea from './DragAndDropArea'

function UploaderController() {
  const inputFile = useRef<HTMLInputElement>(null)

  const handleSelectedFile = (file: File) => {
    console.log(file)
  }

  const handleChooseFileClick = () => {
    inputFile.current?.click()
  }

  return (
    <section className="h-[520px] w-[400px] px-8 py-9 rounded-xl shadow-xl shadow-slate-300 flex flex-col items-center">
      <header className="flex flex-col gap-y-4 mb-8">
        <h2 className="text-xl text-[#4F4F4F]">Upload your image</h2>
        <p className="text-sm text-[#828282]">File should be Jpeg, Png...</p>
      </header>

      <DragAndDropArea onSelectedFile={handleSelectedFile} />

      <footer className="mt-4 flex flex-col items-center gap-y-4">
        <p className="text-sm text-[#828282]">Or</p>
        <input
          ref={inputFile}
          type="file"
          hidden
          onChange={(e) => handleSelectedFile(e.target.files![0])}
        />
        <button
          className="bg-[#2F80ED] hover:opacity-90 min-w-max min-h-max px-4 py-2 rounded-lg text-white text-md whitespace-nowrap"
          onClick={handleChooseFileClick}
        >
          Choose a file
        </button>
      </footer>
    </section>
  )
}

export default UploaderController
