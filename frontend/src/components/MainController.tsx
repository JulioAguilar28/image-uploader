import useAccessor from '../hooks/useAccessor'
import Header from './Header'
import UploaderController from './UploaderController'
import AuthController from './auth/AuthController'

function MainController() {
  const { auth } = useAccessor()

  return (
    <main className="h-screen w-full flex flex-col items-center">
      {auth.user && <Header />}

      <section className="grow w-full flex flex-col items-center justify-center">
        <div className="max-h-[520px] w-[400px] px-8 py-9 rounded-xl shadow-xl shadow-slate-300">
          {auth.user ? <UploaderController /> : <AuthController />}
        </div>
      </section>
    </main>
  )
}

export default MainController
