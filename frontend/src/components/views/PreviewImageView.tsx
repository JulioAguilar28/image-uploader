import ButtonView from './ButtonView'

interface Props {
  image: string
  imgName: string
  title?: string
  subtitle?: string
  onConfirm?: () => void
}

function PreviewImageView({ image, imgName, title, subtitle, onConfirm }: Props) {
  return (
    <>
      <header className="flex flex-col items-center gap-y-2 mb-8 w-full">
        <h2 className="text-xl text-[#4F4F4F] text-center w-full text-ellipsis overflow-hidden">
          {title}
        </h2>
        <p className="text-sm text-[#828282]">{subtitle}</p>
      </header>

      <img src={image} alt={imgName} className="w-full h-fit rounded-lg mb-4" />
      {onConfirm && <ButtonView onClick={() => onConfirm()}>Continue</ButtonView>}
    </>
  )
}

export default PreviewImageView
