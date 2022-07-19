import { Box, CircularProgress, Container, Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import PokemonTag from "./PokemonTag";
import { usePokemon } from "../context/PokemonProvider";
import { capitalizeFirstLetter } from "../helper/short_code.helper";
import InfiniteScroll from "react-infinite-scroll-component";

const PokemonContainer = () => {
	const [selected_pokemon, set_selected_pokemon] = useState([]);
	const { pokemon, fetch_pokemon } = usePokemon();
	const [is_loading, set_is_loading] = useState(false);

	useEffect(() => {
		if (selected_pokemon.length) {
			if (JSON.stringify(selected_pokemon) !== JSON.stringify(pokemon)) {
				set_selected_pokemon([...selected_pokemon, ...pokemon]);
				set_is_loading(false);
			}
		} else {
			set_selected_pokemon(pokemon);
			set_is_loading(false);
		}

		const handleScroll = (event) => {
			let documentHeight = document.body.scrollHeight;
			let currentScroll = window.scrollY + window.innerHeight;
			let modifier = 0;

			if (currentScroll + modifier > documentHeight) {
				set_is_loading(true);
				fetch_pokemon(30);
				console.log("You are at the bottom!");
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pokemon]);

	return (
		<Container
			maxWidth="lg"
			sx={{
				margin: "50px auto",
			}}
		>
			<Grid container spacing={1}>
				{selected_pokemon &&
					selected_pokemon.map((data) => (
						<Grid item md={4} sm={12} key={data.order}>
							<PokemonTag
								disabled={true}
								id={data.id}
								name={capitalizeFirstLetter(data.name)}
								front_default={data.sprites.other.dream_world.front_default}
							/>
						</Grid>
					))}
				{is_loading && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							marginTop: 5,
						}}
					>
						<CircularProgress />
					</Box>
				)}
			</Grid>
		</Container>
	);
};

export default PokemonContainer;
