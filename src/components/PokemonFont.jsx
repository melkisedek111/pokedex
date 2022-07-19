import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../helper/short_code.helper";


const theme = createTheme({
	typography: {
		fontFamily: '"Pokemon Solid", cursive',
	},
});

const PokemonFont = ({value, stroke, ...other_props}) => {
	return (
		<ThemeProvider theme={theme}>
			<Typography
				sx={{
                    zIndex: "1000",
					color: "#FECC00",
					WebkitTextStroke: `${stroke} #365FAB`,
					userSelect: "none",
				}}
                {...other_props}
			>
				{value && capitalizeFirstLetter(value)}
			</Typography>
		</ThemeProvider>
	);
};

export default PokemonFont;
