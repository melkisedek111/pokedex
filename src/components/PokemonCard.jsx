import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import {
	Box,
	Button,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
	Divider,
	LinearProgress,
	Chip,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { usePokemon } from "../context/PokemonProvider";
import Stats from "./Stats";
import { capitalizeFirstLetter } from "../helper/short_code.helper";
import Accordions from "./Accordions";
import PokemonFont from "./PokemonFont";

const theme = createTheme({
	typography: {
		fontFamily: '"Pokemon Solid", cursive',
	},
});

const PokemonCard = () => {
	const { id } = useParams();
	const { pokemon, is_loading: is_data_loading } = usePokemon();


	const [is_pokemon_loading, set_is_pokemon_loading] = useState(false);
	const [abilities, set_abilities] = useState([]);
	const [is_loading, set_is_loading] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [to_be_expanded, set_to_be_expanded] = useState(false);

	const [selected_pokemon, set_selected_pokemon] = useState({});
	const [get_pokemon] = pokemon.filter((pokemon) => pokemon.id == id);

	useEffect(() => {
		if (!get_pokemon) {
			set_is_pokemon_loading(true);
		} else {
			set_selected_pokemon(get_pokemon);
			set_is_pokemon_loading(false);
		}
	}, [get_pokemon, selected_pokemon]);

	let { stats } = selected_pokemon;

	const stats_details = {
		hp: {
			id: 1,
			url: "https://cdn-icons-png.flaticon.com/512/687/687529.png",
			name: "hp",
			color: "red",
			second_color: "light-red",
		},
		attack: {
			id: 2,
			url: " https://cdn-icons-png.flaticon.com/512/842/842184.png",
			name: "attack",
			color: "gold",
			second_color: "light-blue",
		},
		defense: {
			id: 3,
			url: "https://cdn-icons-png.flaticon.com/512/861/861377.png",
			name: "defense",
			color: "green",
			second_color: "light-green",
		},
		"special-attack": {
			id: 4,
			url: "https://cdn-icons-png.flaticon.com/512/3522/3522080.png",
			name: "special-attack",
			color: "maroon",
			second_color: "light-blue",
		},
		"special-defense": {
			id: 5,
			url: "https://cdn-icons-png.flaticon.com/512/4369/4369132.png",
			name: "special-defense",
			color: "#013220",
			second_color: "light-blue",
		},
		speed: {
			id: 6,
			url: "https://cdn-icons-png.flaticon.com/512/4781/4781483.png",
			name: "speed",
			color: "#1c8dff",
			second_color: "light-blue",
		},
	};

	const types = {
		normal: "#A8A77A",
		fire: "#EE8130",
		water: "#6390F0",
		electric: "#F7D02C",
		grass: "#7AC74C",
		ice: "#96D9D6",
		fighting: "#C22E28",
		poison: "#A33EA1",
		ground: "#E2BF65",
		flying: "#A98FF3",
		psychic: "#F95587",
		bug: "#A6B91A",
		rock: "#B6A136",
		ghost: "#735797",
		dragon: "#6F35FC",
		dark: "#705746",
		steel: "#B7B7CE",
		fairy: "#D685AD",
	};

	const handlePanelChange = (panel, url) => async (event, is_expanded) => {
		try {
			set_is_loading(true);
			set_to_be_expanded(is_expanded ? panel : false);
			set_abilities({});
			const abilities_request = await fetch(url);
			const abilities_response = await abilities_request.json();

			if (abilities_response) {
				setTimeout(() => {
					set_abilities(abilities_response);
					set_is_loading(false);
					setExpanded(is_expanded ? panel : false);
				}, 2000);
			}
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	};

	return (
		<>
			{is_pokemon_loading && (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={is_pokemon_loading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
			<Box sx={{ overflow: "hidden", position: "relative", minHeight: "90vh" }}>
				<img
					src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-png-images-4.png"
					alt="pokemon-backdrop"
					style={{
						width: "500px",
						position: "absolute",
						right: "-70px",
						bottom: -150,
						opacity: 0.3,
					}}
				/>
				{!is_pokemon_loading && (
					<>
						<Container
							maxWidth="lg"
							sx={{
								paddingTop: 5,
								paddingBottom: 5,
							}}
						>
							<Box sx={{marginBottom: 1}}>
								<Link to="/" style={{ textDecoration: "none" }}>
									<Button variant="contained">
										<PokemonFont value="Back" />
									</Button>
								</Link>
							</Box>
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<Card
										sx={{
											maxWidth: 345,
											borderRadius: 7,
											borderBottom: "2px solid red",
											borderTop: "2px solid red",
										}}
									>
										<CardMedia
											component="img"
											height="300"
											image={
												selected_pokemon.sprites?.other?.dream_world
													?.front_default
											}
											alt="green iguana"
										/>
										<CardContent>
											{selected_pokemon?.name && (
												<PokemonFont
													gutterBottom
													variant="h4"
													component="div"
													stroke="2px"
													value={selected_pokemon.name}
												/>
											)}
											<Divider />
											<PokemonFont
												gutterBottom
												variant="h6"
												component="div"
												stroke="1.5px"
												value="Stats"
											/>
											<Divider sx={{ margin: "2px 0" }} />
											<Box
												sx={{
													marginTop: 2,
												}}
											>
												{stats &&
													stats.map(({ stat, base_stat }) => (
														<Stats
															key={stats_details?.[stat.name]?.id}
															name={stat.name}
															url={stats_details?.[stat.name]?.url}
															value={base_stat}
															color={stats_details?.[stat.name]?.color}
															second_color={
																stats_details?.[stat.name]?.second_color
															}
														/>
													))}
											</Box>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={8}>
									<ThemeProvider theme={theme}>
										<Typography
											gutterBottom
											variant="h6"
											component="div"
											sx={{
												zIndex: "1000",
												color: "#FECC00",
												WebkitTextStroke: "1px #365FAB",
												userSelect: "none",
											}}
										>
											Types
										</Typography>
									</ThemeProvider>
									<Divider sx={{ margin: "10px 0" }} />
									<Box>
										{selected_pokemon?.types &&
											selected_pokemon.types.map(({ type, slot }) => (
												<Chip
													key={slot}
													sx={{
														backgroundColor: types[type.name],
														margin: "0 5px",
													}}
													label={capitalizeFirstLetter(type.name)}
												/>
											))}
									</Box>
									<Divider sx={{ margin: "10px 0" }} />
									<ThemeProvider theme={theme}>
										<Typography
											gutterBottom
											variant="h6"
											component="div"
											sx={{
												zIndex: "1000",
												color: "#FECC00",
												WebkitTextStroke: "1px #365FAB",
												userSelect: "none",
											}}
										>
											Abilities
										</Typography>
									</ThemeProvider>
									<Divider sx={{ margin: "10px 0" }} />
									<Box>
										{selected_pokemon?.abilities &&
											selected_pokemon?.abilities.map(({ ability, slot }) => (
												<Accordions
													key={slot}
													abilities={abilities}
													is_loading={is_loading}
													to_be_expanded={to_be_expanded}
													expanded={expanded}
													panel={`panel${slot}`}
													title={ability.name}
													handlePanelChange={handlePanelChange}
													url={ability.url}
												/>
											))}
									</Box>
								</Grid>
							</Grid>
						</Container>
					</>
				)}
			</Box>
		</>
	);
};

export default PokemonCard;
