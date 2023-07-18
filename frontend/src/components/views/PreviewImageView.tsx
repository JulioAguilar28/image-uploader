import ButtonView from './ButtonView'

interface Props {
  image: string
  imgName: string
  onConfirm: () => void
}

function PreviewImageView({ image, imgName, onConfirm }: Props) {
  return (
    <div className="flex flex-col items-center">
      <header className="flex flex-col items-center gap-y-2 mb-8">
        <h2 className="text-xl text-[#4F4F4F]">{imgName}</h2>
        <p className="text-sm text-[#828282]">This is a preview of your image</p>
      </header>

      <img src={image} alt={imgName} className="w-full h-fit rounded-lg mb-4" />
      <ButtonView onClick={() => onConfirm}>Continue</ButtonView>
    </div>
  )
}

export default PreviewImageView
