import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { AppContext } from './context/AppContext'

function App() {
  const [service,setService]=useState("bedrock")
  const [model,setModel]=useState("us.amazon.nova-lite-v1:0")

  return (
    <AppContext.Provider value={{service,model,setService,setModel}}>
<main className='min-h-screen'>
  <header className='h-[8vh]'>
    <Header />
  </header>
  <section className='min-h-[92vh] w-full bg-orange-50'>
    <Home />
  </section>
  <footer></footer>
</main></AppContext.Provider>
  )
}

export default App
