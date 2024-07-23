import { lazy, Suspense } from 'react';
import Home from "./Home"

const Teams = lazy(() => import('./Teams'));

function App() {

  return (
  
    <main className='min-h-screen min-w-screen overflow-hidden ' >
       <Suspense fallback={<>Loading...</>}></Suspense>
        <Home />
        <Teams />
    </main>
    
  )
}

export default App
