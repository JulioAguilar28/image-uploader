import useAccessor from '../hooks/useAccessor'

function Header() {
  const { auth } = useAccessor()
  const { firstName, lastName } = auth.user!
  const fullName = `${firstName} ${lastName}`

  return (
    <header className="w-full flex items-center justify-between h-16 px-4 shadow-md shadow-slate-300">
      <span className="text-xl text-[#4F4F4F]">Image Uploader</span>
      <span className="text-base text-[#4F4F4F]">Welcome {fullName}</span>
    </header>
  )
}

export default Header
