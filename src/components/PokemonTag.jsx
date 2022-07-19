import { Avatar, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { Box } from "@mui/system";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
	typography: {
		fontFamily: '"Pokemon Solid", cursive',
	},
});

const PokemonTag = ({ name, front_default, id }) => {
	return (
		<Link to={`/p/${id}`} style={{textDecoration: "none"}}>
			<ThemeProvider theme={theme}>
				<Box
					sx={{
						maxWidth: 270,
						backgroundColor: "rgba(224, 224, 224, 0.847)",
						padding: "20px 40px",
						position: "relative",
						overflow: "hidden",
						borderRadius: "20px",
						borderBottom: "3px solid #f33535",
					}}
				>
					<img
						src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-png-images-4.png"
						alt="pokemon-backdrop"
						style={{
							width: "160px",
							position: "absolute",
							right: "-30px",
							top: -30,
							zIndex: 100,
							opacity: 0.5,
						}}
					/>
					<section
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							zIndex: "1000",
						}}
					>
						<Avatar
							alt={name}
							src={front_default}
							sx={{ width: 56, height: 56 }}
						/>

						<Typography
							variant="h4"
							sx={{
								zIndex: "1000",
								color: "#FECC00",
								WebkitTextStroke: "2px #365FAB",
								userSelect: "none"
							}}
						>
							{name}
						</Typography>
					</section>
				</Box>
			</ThemeProvider>
		</Link>
	);
};

export default PokemonTag;
