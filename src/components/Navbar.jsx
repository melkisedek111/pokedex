import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/">
						<img src="https://cdn.shopify.com/s/files/1/0555/7708/3985/files/Pokedex_Logo_1586x.png?v=1645727603" alt="pokemon-logo" style={{ height: "40px" }} />
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
