import React from 'react'
import DragAndDropArea from './DragAndDropArea'

function UploaderController() {
  const handleSelectedFile = (file: File) => {
    console.log(file)
  }

  return (
    <section className="h-[520px] w-[400px] px-8 py-9 rounded-xl shadow-xl shadow-slate-300 flex flex-col items-center">
      <header className="flex flex-col gap-y-4 mb-8">
        <h2 className="text-xl text-[#4F4F4F]">Upload your image</h2>
        <p className="text-sm text-[#828282]">File should be Jpeg, Png...</p>
      </header>

      <DragAndDropArea onSelectedFile={handleSelectedFile} />
    </section>
  )
}

export default UploaderController
