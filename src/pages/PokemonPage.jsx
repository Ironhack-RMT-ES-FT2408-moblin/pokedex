import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SyncLoader from "react-spinners/SyncLoader";

function PokemonPage() {

  const params = useParams()
  const navigate = useNavigate()

  // 1. crear el estado que almacenará la data externa
  const [ pokemonDetails, setPokemonDetails ] = useState(null)

  // 2. el componentDidMount para llamar a la API
  useEffect(() => {
    getData()
  }, [params.pokeName]) // componenteDidMount y tambien como componentDidUpdate de cambios en params
  
  const getData = async () => {
    setPokemonDetails(null) // el sistema forza el spinner de loading
    try {

      // 3. la llamada con fetch a la API
      console.log("llamando a la api")
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`)
      const data = await response.json()
      console.log(data)

      //* ejemplo de buscar evoluciones
      // const responseEvolution = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${data.id}`)
      // const dataEvolution = await responseEvolution.json()
      // console.log(dataEvolution)

      // 4. almacenar la data en el estado
      setPokemonDetails(data)


    } catch (error) {
      console.log(error)
      // vamos a enviar al usuario a una pagina de error
      navigate("/error")
    }
  }

  // 5. gestion de loading/carga
  if (pokemonDetails === null) {
    return <div> <SyncLoader size={25} margin={6} color="red"/> </div>
  }

  return (
    <div>
      
      {/* 6. Renderizar la data */}

      <h4>Detalles del pokemon</h4>

      <div>

        <h3>{pokemonDetails.name}</h3>
        <img src={pokemonDetails.sprites.front_default} alt="pokemon" />

      </div>

    </div>
  )
}

export default PokemonPage