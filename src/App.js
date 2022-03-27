import { useState } from 'react'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('')

  function onSearchInputChange(e) {
    setSearchText(e.target.value)
  }

  return (
    <div>
      <nav>
        <input type="text" value={searchText} onChange={onSearchInputChange} placeholder="Search or jump to.." />
      </nav>
      <main>
        search result
      </main>
    </div>
  )
}

export default App
