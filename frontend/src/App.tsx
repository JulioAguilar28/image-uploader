import './App.css'
import UploaderController from './components/UploaderController'
import Login from './components/Login'

function App() {
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <section className="max-h-[520px] w-[400px] px-8 py-9 rounded-xl shadow-xl shadow-slate-300">
        <Login />
        {/* <UploaderController /> */}
      </section>
    </main>
  )
}

export default App
