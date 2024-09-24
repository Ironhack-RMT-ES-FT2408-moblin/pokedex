import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// en este componente haremos una llamada externa a la API para buscar la data

//1. De donde viene la data? API
//2. como nos anclamos a esa data? fetch
//3. en que momento hacemos la operación? componentDidMount
//4. una vez que recibimos la data, que hacemos con ella? Tenemos que almacenarla en un estado

function Sidebar() {

  const [ allPokemon, setAllPokemon ] = useState(null)

  useEffect(() => {

    console.log("patata")
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      // setTimeout(() => {
        setAllPokemon(data.results)
      // }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])  

  // clausula de guardia para efecto de carga
  if (allPokemon === null) {
    return <h3>... buscando pokemons</h3>
  }
  // La clausula de guardia la podemos hacer acá o directamente en la renderización

  return (
    <nav className="sidebar">
      
      <h5>Elige un pokemon</h5>

      {allPokemon.map((eachPokemon) => {
        return (
          <Link to={`/pokemon-details/${eachPokemon.name}`} key={eachPokemon.name}>{eachPokemon.name}</Link>
        )
      })}

    </nav>
  )
}

export default Sidebar