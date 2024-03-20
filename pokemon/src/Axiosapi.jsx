import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paginations from './Paginations.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import Searchscreen from './Searchscreens.jsx';

function Axiosapi() {
  const [userData, setUserData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  const toggleDarkLight = () => {
    document.body.classList.toggle('dark-mode');
  };

  const fetchPokemonData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`);

      const resultsWithAbilities = await Promise.all(
        response.data.results.map(async (result) => {
          const pokemonData = await fetchPokemonData(result.url);
          const abilities = pokemonData.abilities.map(ability => ability.ability.name);
          return {
            name: result.name,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            animatedSpriteUrl: pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default,
            abilities: abilities
          };
        })
      );

      setUserData({ results: resultsWithAbilities });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  
    setSearchLoading(true);
    setTimeout(async () => {
      try {
        console.log('Searching for:', searchTerm);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
  
        if (response.data && response.data.sprites && response.data.sprites.other['official-artwork'].front_default) {
          const abilities = response.data.abilities.map(ability => ability.ability.name);
          const searchData = {
            name: response.data.name,
            image: response.data.sprites.other['official-artwork'].front_default,
            animatedSpriteUrl: response.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            abilities: abilities
          };
  
          // Filter the search results to only include those matching the current page's data
          const filteredResults = userData.results.filter(pokemon => pokemon.name.toLowerCase() === searchTerm.toLowerCase());
          setUserData({ results: [...filteredResults, searchData] });
        } else {
          console.error("Error: Invalid response structure for search data", response.data);
          setUserData({ results: [] });
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
        setUserData({ results: [] });
      } finally {
        setSearchLoading(false);
      }
    }, 1400);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setGlobalLoading(true);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const pokemonData = response.data.results.map(pokemon => ({
          name: pokemon.name,
          url: pokemon.url
        }));
        setPokemonData(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPokemonData([]);
      } finally {
        setGlobalLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      {(loading || globalLoading) && showLoader && <LoadingScreen />} {/*  the main content loading GIF */}
      {searchLoading && showLoader && <Searchscreen />} {/*the search term loading GIF */}
      {!loading && !searchLoading && !globalLoading && (
        <div>
          <div className="navbar">
            <img className='image' src='https://pngimg.com/d/pokemon_PNG98.png' />
            <div className="navbar-controls">
              <button type="button" className="dark_light" onClick={toggleDarkLight} title="Toggle dark/light mode">
                🌛
              </button>
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="card-container">
            {userData.results.map((pokemon, index) => (
              <div key={index} className="card">
                <img src={pokemon.animatedSpriteUrl} alt={pokemon.name} /> {/* Change here */}
                <div className="card-details">
                  <div className="pokemon-name">{pokemon.name.toUpperCase()}</div>
                  <div className="pokemon-abilities">
                    <strong>Abilities:</strong> {pokemon.abilities.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Paginations handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} currentPage={currentPage} />
        </div>
      )}
    </div>
  );
}

export default Axiosapi;





 


