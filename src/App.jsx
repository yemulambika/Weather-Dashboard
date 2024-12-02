import { useState } from 'react'

import WeatherGraph from './weatherGraph'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WeatherGraph/>
    </>
  )
}

export default App
