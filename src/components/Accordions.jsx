import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loading from "../assets/loader.svg";
import { Typography, Box, Divider } from "@mui/material";
import { capitalizeFirstLetter } from "../helper/short_code.helper";

const Accordions = ({
	abilities,
	panel,
	handlePanelChange,
	expanded,
	to_be_expanded,
	title,
	url,
	is_loading,
}) => {

	return (
		<Accordion
			expanded={expanded === panel}
			onChange={handlePanelChange(panel, url)}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel3bh-content"
				id="panel3bh-header"
				sx={{
					borderBottom: "1px solid red",
					backgroundImage:
						"url('https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-png-images-4.png')",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "right, left",
					backgroundSize: "50px 50px",
				}}
			>
				<Typography fontWeight={800} sx={{ width: "33%", flexShrink: 0 }}>
					{title && capitalizeFirstLetter(title)}
				</Typography>
				{is_loading && to_be_expanded === panel && (
					<img
						src={Loading}
						alt="loading"
						style={{ height: "30px", marginLeft: "100px" }}
					/>
				)}
			</AccordionSummary>
			<AccordionDetails>
				{abilities?.effect_entries &&
					abilities?.effect_entries.map((data) => {
						if (data.language.name === "en") {

							return (
								<div key={data.language.url}>
									<Box>
										<Typography variant="body1" sx={{ fontWeight: "bold" }}>
											Effect
										</Typography>
										<Typography
											variant="body1"
											sx={{ fontWeight: "medium", marginLeft: 1 }}
										>
											{data.effect}
										</Typography>
									</Box>
										<Divider sx={{margin: "10px 0"}} />
									<Box>
										<Typography variant="body1" sx={{ fontWeight: "bold" }}>
											Short Effect
										</Typography>
										<Typography
											variant="body1"
											sx={{ fontWeight: "medium", marginLeft: 1 }}
										>
											{data.short_effect}
										</Typography>
										<Divider />
									</Box>
								</div>
							);
						}
					})}
			</AccordionDetails>
		</Accordion>
	);
};

export default Accordions;
