import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModel, setShowModel] = useState(false)

  function handleToggleModel(){
    setShowModel(!showModel)
  }

  useEffect(() => {
    async function fetchAPIData(){
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url='https://api.nasa.gov/planetary/apod' + 
      `?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA=${today}`
      if (localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log("Fetch from the API Today")
        return
      }
      localStorage.clear()
      try{
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log("Fetch from the API Today")
      }catch(err){
        console.log(err,message)
      }
    }
    fetchAPIData()
  }, [])
  return (
    <>
      {data ? (<Main data={data}/>): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
       {showModel && (
        <SideBar data={data} handleToggleModel={handleToggleModel}/>
       )}
      {data &&(
        <Footer handleToggleModel={handleToggleModel} />
        )}

    </>
  )
}

export default App