import React, { useContext, useEffect, useState } from "react";

const PokemonContext = React.createContext();

export const usePokemon = () => {
	return useContext(PokemonContext);
};

const PokemonProvider = ({ children }) => {
	const [pokemon, setPokemon] = useState([]);
	const [initial_data, set_initial_data] = useState(10);
	const [is_loading, set_is_loading] = useState(false);
	const [turn, set_turn] = useState([]);

	/* fetch another batch when it scrolling to the bottom */
	const fetch_pokemon = (length) => {
		setTimeout(() => {
			set_turn([]);
			set_initial_data(initial_data + length);
		}, 3000);
	};

	const handlePokemonAPI = async () => {
		try {
			
			/* limit data to request to 1000 only */
			if (1000 >= initial_data) {
				set_is_loading(true);

				/* to avoid multiple requests */
				if(!turn.length){

					/* request pokemon data based on the offset */
					const pokemonAPI_request = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${initial_data}`);
					const pokemonAPI_response = await pokemonAPI_request.json();
	
					/* check if the pokemon response is success */
					if (pokemonAPI_response && pokemonAPI_response?.results){
	
						/* bulk pokemon data requests */
						const pokemon_links = pokemonAPI_response?.results.map((data) => fetch(data.url));
	
						/* get response from pokemon data request */
						const pokemon_promise = await Promise.all(pokemon_links);
						const pokemon_data = await Promise.all(pokemon_promise.map((response) => response.json()));
	
						if (pokemon_data) {
							set_is_loading(false);
	
							set_turn([1]);
							/* set the pokemon data to context value of pokemon */
							setPokemon(pokemon_data);
						}
					}
				}
			}
		} catch (error) {
			console.log({ error });
			alert(error.message);
		}
	};

	useEffect(() => {
		if (!is_loading) {
			handlePokemonAPI();
		}
	}, [initial_data]);

	return (
		<PokemonContext.Provider value={{ pokemon, fetch_pokemon, is_loading }}>
			{children}
		</PokemonContext.Provider>
	);
};

export default PokemonProvider;
