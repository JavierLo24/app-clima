import { useState } from "react"

export const WeatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '4576c3ec193ec6c707c26db153cd7599'
  const difKelvin = 275

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)

  const cambioCiudad = (e) => {
    setCiudad(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ciudad.length > 0) fetchClima()
  }

  const fetchClima = async() => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClima(data)
    } catch (e) {
      console.error('Ocurrio un error', e)
    }
  }


  return (
    <>
      <div className="container">
        <h1>Aplicación del clima</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ciudad}
            onChange={cambioCiudad}
          />
          <button type="submit">Buscar</button>
        </form>
        {
          dataClima && (
            <div>
              <h2>{dataClima.name}</h2>
              <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
              <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
            </div>
          )
        }
      </div>
    </>
  )
}
