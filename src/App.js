import { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let cancel 
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c )
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })
    //Cancel old request every time when we get new request
    return () => cancel
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList  pokemon={pokemon} />
      <Pagination
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null} 
        gotoNextPage={nextPageUrl ? gotoNextPage : null} 
      />
    </>
  );
}

export default App;
