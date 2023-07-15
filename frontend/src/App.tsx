import './App.css'
import Header from './components/Header'
import UploaderController from './components/UploaderController'
import AuthController from './components/auth/AuthController'

function App() {
  return (
    <main className="h-screen w-full flex flex-col items-center">
      <Header />

      <section className="grow w-full flex flex-col items-center justify-center">
        <div className="max-h-[520px] w-[400px] px-8 py-9 rounded-xl shadow-xl shadow-slate-300">
          {/* <AuthController /> */}
          <UploaderController />
        </div>
      </section>
    </main>
  )
}

export default App
