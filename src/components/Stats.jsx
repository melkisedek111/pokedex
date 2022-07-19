import { Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Stats = ({ name, value, url, color, second_color }) => {
	return (
		<Grid spacing={1} container sx={{ marginBottom: 1 }}>
			<Grid
				xs={2}
				item
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<img src={url} alt={name} style={{ height: "30px" }} />
			</Grid>
			<Tooltip title={`${name}: ${value}`}>
				<Grid xs={10} item>
					<Box style={{ position: "relative" }}>
						<Typography variant="body2" color="text.secondary">
							{name.toUpperCase()}: {value}
						</Typography>
						<LinearProgress
							sx={{
								marginTop: 0,
								backgroundColor: second_color,
								"& .MuiLinearProgress-bar": {
									backgroundColor: color,
								},
							}}
							value={value}
							variant="determinate"
						/>
					</Box>
				</Grid>
			</Tooltip>
		</Grid>
	);
};

export default Stats;
