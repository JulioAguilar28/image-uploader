import { useState, useMemo } from 'react'
import PreviewImageView from './views/PreviewImageView'
import UploaderView from './views/UploaderView'
import * as ImagesService from '../services/ImagesService'
import { parseAcceptedExtensionFiles, getFileType } from '../utils/files'

function UploaderController() {
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [uploadedFile, setUploadedFile] = useState<File>()

  const showImagePreview = useMemo(() => {
    return uploadedFile && uploadedImage
  }, [uploadedFile, uploadedImage])

  const extensions = ['jpg', 'png', 'jpeg']
  const acceptedFiles = parseAcceptedExtensionFiles(extensions)

  const handleSelectedFile = (file: File) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', function () {
      setUploadedImage(this.result as string)
      setUploadedFile(file)
    })
  }

  const handleConfirmUpload = () => {
    void ImagesService.uploadImage(uploadedFile!)
  }

  return (
    <div className="flex flex-col items-center">
      {showImagePreview ? (
        <PreviewImageView
          image={uploadedImage}
          imgName={uploadedFile!.name}
          onConfirm={handleConfirmUpload}
        />
      ) : (
        <UploaderView onSelectedFile={handleSelectedFile} acceptedFiles={acceptedFiles} />
      )}
    </div>
  )
}

export default UploaderController
