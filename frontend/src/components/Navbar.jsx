import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

const colors = {
	whiteCoffee: "#DCE5D2",
	armyGreen: "#435A12",
	oliveDrab: "#7E8E20",
	oliveDrabDark: "#5E6F1A",
	pineGlade: "#B6CA93",
};

export default function Navbar() {
	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{
				backgroundColor: colors.whiteCoffee,
				color: colors.armyGreen,
				paddingY: 1.5,
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Typography
					variant="h6"
					sx={{
						fontWeight: "bold",
						fontFamily: "'Playfair Display', serif",
						color: colors.armyGreen,
					}}
				>
					CoffeeQue
				</Typography>

				<Stack direction="row" spacing={3} alignItems="center">
					{["Home", "Products", "ContactUs", "Sign Up"].map((item, index) => (
						<Button
							key={index}
							disableRipple
							sx={{
								textTransform: "none",
								color: colors.armyGreen,
								fontWeight: item === "Home" ? "bold" : "normal",
								borderBottom:
									item === "Home" ? `2px solid ${colors.pineGlade}` : "none",
								borderRadius: 0,
								fontFamily: "inherit",
								"&:hover": {
									backgroundColor: "transparent",
									borderBottom: `2px solid ${colors.pineGlade}`,
								},
							}}
						>
							{item}
						</Button>
					))}
				</Stack>

				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						sx={{
							backgroundColor: colors.oliveDrab,
							color: "#fff",
							borderRadius: "20px",
							textTransform: "none",
							paddingX: 3,
							fontWeight: "bold",
							"&:hover": {
								backgroundColor: colors.oliveDrabDark,
							},
						}}
					>
						Order now
					</Button>
					<Button
						variant="contained"
						sx={{
							backgroundColor: "#fff",
							color: colors.armyGreen,
							borderRadius: "20px",
							textTransform: "none",
							paddingX: 3,
							fontWeight: "bold",
							"&:hover": {
								backgroundColor: colors.oliveDrabDark,
								color: "#fff",
							},
						}}
					>
						Login
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
