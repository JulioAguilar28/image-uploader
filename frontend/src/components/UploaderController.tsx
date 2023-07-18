import { useState, useMemo } from 'react'
import PreviewImageView from './views/PreviewImageView'
import UploaderView from './views/UploaderView'
import * as ImagesService from '../services/ImagesService'
import { parseAcceptedExtensionFiles } from '../utils/files'
import useToast from '../hooks/useToast'
import useAccessor from '../hooks/useAccessor'
import { Image } from '../models/appModels'

function UploaderController() {
  const [previewImage, setPreviewImage] = useState<string>('')
  const [previewFile, setPreviewFile] = useState<File>()
  const [loadingImg, setLoadingImg] = useState<boolean>(false)
  const [img, setImg] = useState<Image>()
  const [imgResource, setImageResource] = useState<string>('')
  const { showSuccessToast } = useToast()
  const { auth } = useAccessor()

  const showImagePreview = useMemo(() => {
    return (previewFile && previewImage) || imgResource
  }, [previewFile, previewImage, imgResource])

  const extensions = ['jpg', 'png', 'jpeg']
  const acceptedFiles = parseAcceptedExtensionFiles(extensions)

  const handleSelectedFile = (file: File) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', function () {
      setPreviewImage(this.result as string)
      setPreviewFile(file)
      showSuccessToast('Showing the preview')
    })
  }

  const handleConfirmUpload = async () => {
    setLoadingImg(true)

    await ImagesService.uploadImage(previewFile!, (image) => {
      setImg(img)
      console.log(img)
      void ImagesService.getImageResource(`${image.id}`, auth.user!.id, (img) => {
        setImageResource(img)
        setLoadingImg(false)
      })
    })
  }

  return (
    <div className="flex flex-col items-center w-full">
      {loadingImg ? (
        <span className="text-xl text-[#4f4f4f]">Loading...</span>
      ) : showImagePreview && !loadingImg ? (
        <PreviewImageView
          image={imgResource ? imgResource : previewImage}
          imgName={previewFile!.name}
          title={imgResource ? 'Upload Complete' : previewFile!.name}
          subtitle={imgResource ? '' : 'This is a preview of your image'}
          onConfirm={!imgResource ? handleConfirmUpload : undefined}
        />
      ) : (
        <UploaderView onSelectedFile={handleSelectedFile} acceptedFiles={acceptedFiles} />
      )}
    </div>
  )
}

export default UploaderController
