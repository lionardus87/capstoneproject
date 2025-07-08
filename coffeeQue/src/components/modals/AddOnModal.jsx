import React, { useState } from "react";
import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Checkbox,
	FormGroup,
	TextField,
	Typography,
	Button,
} from "@mui/material";
import BaseModal from "../modals/BaseModal";

export default function AddOnModal({ open, onClose, product, onConfirm }) {
	const [size, setSize] = useState("regular");
	const [extraShot, setExtraShot] = useState(false);
	const [decaf, setDecaf] = useState(false);
	const [milk, setMilk] = useState("full cream");
	const [sugar, setSugar] = useState("0");
	const [syrup, setSyrup] = useState("");
	const [volume, setVolume] = useState("full");
	const [extras, setExtras] = useState({
		extraHot: false,
		extraIce: false,
		cinnamon: false,
		chocolate: false,
	});

	const handleConfirm = () => {
		// Base addons array
		const addons = [];

		// Size
		if (size === "large") addons.push({ label: "Large Size", price: 0.5 });
		else addons.push({ label: "Regular Size", price: 0 });

		// Extra Shot
		if (extraShot) addons.push({ label: "Extra Shot", price: 0.5 });

		// Decaf
		if (decaf) addons.push({ label: "Decaf", price: 0.5 });

		// Milk types with possible price
		if (milk) {
			let price = 0;
			let label = milk.charAt(0).toUpperCase() + milk.slice(1);
			if (["almond milk", "soy milk", "oat milk"].includes(milk)) {
				price = 0.5;
			}
			addons.push({ label, price });
		}

		// Sugar
		if (sugar && sugar !== "0") {
			addons.push({ label: `Sugar Level: ${sugar}`, price: 0 });
		}

		// Syrup
		if (syrup) {
			addons.push({
				label: `${syrup.charAt(0).toUpperCase() + syrup.slice(1)} Syrup`,
				price: 0.5,
			});
		}

		// Volume/Fill level
		if (volume && volume !== "full") {
			addons.push({ label: `Fill Level: ${volume}`, price: 0 });
		}

		// Extras checkboxes
		Object.entries(extras).forEach(([key, checked]) => {
			if (checked) {
				// Map keys to readable labels and prices
				const labelsPrices = {
					extraHot: { label: "Extra Hot", price: 0 },
					extraIce: { label: "Extra Ice", price: 0 },
					cinnamon: { label: "Cinnamon Powder", price: 0 },
					chocolate: { label: "Chocolate Powder", price: 0 },
				};
				if (labelsPrices[key]) {
					addons.push(labelsPrices[key]);
				}
			}
		});

		// Pass array of addons, not object
		onConfirm(product, addons);
		onClose();
	};

	return (
		<BaseModal
			open={open}
			onClose={onClose}
			title={`Customize ${product?.itemName || "Drink"}`}
			actions={
				<>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={handleConfirm} variant="contained" color="secondary">
						Add to Cart
					</Button>
				</>
			}
		>
			<FormControl fullWidth margin="normal">
				<FormLabel>Size</FormLabel>
				<RadioGroup value={size} onChange={(e) => setSize(e.target.value)}>
					<FormControlLabel value="regular" control={<Radio />} label="Regular" />
					<FormControlLabel
						value="large"
						control={<Radio />}
						label="Large (+$0.5)"
					/>
				</RadioGroup>
			</FormControl>

			<FormGroup row>
				<FormControlLabel
					control={
						<Checkbox checked={extraShot} onChange={() => setExtraShot(!extraShot)} />
					}
					label="Extra Shot (+$0.5)"
				/>
				<FormControlLabel
					control={<Checkbox checked={decaf} onChange={() => setDecaf(!decaf)} />}
					label="Decaf (+$0.5)"
				/>
			</FormGroup>

			<FormControl fullWidth margin="normal">
				<FormLabel>Milk</FormLabel>
				<RadioGroup value={milk} onChange={(e) => setMilk(e.target.value)}>
					<FormControlLabel
						value="full cream"
						control={<Radio />}
						label="Full Cream"
					/>
					<FormControlLabel
						value="skim milk"
						control={<Radio />}
						label="Skim Milk"
					/>
					<FormControlLabel
						value="almond milk"
						control={<Radio />}
						label="Almond Milk (+$0.5)"
					/>
					<FormControlLabel
						value="soy milk"
						control={<Radio />}
						label="Soy Milk (+$0.5)"
					/>
					<FormControlLabel
						value="oat milk"
						control={<Radio />}
						label="Oat Milk (+$0.5)"
					/>
				</RadioGroup>
			</FormControl>

			<FormControl fullWidth margin="normal">
				<FormLabel>Sugar</FormLabel>
				<RadioGroup value={sugar} onChange={(e) => setSugar(e.target.value)} row>
					{["0", "1", "2", "3"].map((s) => (
						<FormControlLabel key={s} value={s} control={<Radio />} label={s} />
					))}
				</RadioGroup>
			</FormControl>

			<FormControl fullWidth margin="normal">
				<FormLabel>Syrup</FormLabel>
				<RadioGroup value={syrup} onChange={(e) => setSyrup(e.target.value)}>
					<FormControlLabel value="" control={<Radio />} label="None" />
					<FormControlLabel
						value="vanilla"
						control={<Radio />}
						label="Vanilla (+$0.5)"
					/>
					<FormControlLabel
						value="hazelnut"
						control={<Radio />}
						label="Hazelnut (+$0.5)"
					/>
					<FormControlLabel
						value="caramel"
						control={<Radio />}
						label="Caramel (+$0.5)"
					/>
				</RadioGroup>
			</FormControl>

			<FormControl fullWidth margin="normal">
				<FormLabel>Fill Level</FormLabel>
				<RadioGroup value={volume} onChange={(e) => setVolume(e.target.value)} row>
					<FormControlLabel value="half" control={<Radio />} label="1/2 Full" />
					<FormControlLabel
						value="three-quarters"
						control={<Radio />}
						label="3/4 Full"
					/>
					<FormControlLabel value="full" control={<Radio />} label="Full" />
				</RadioGroup>
			</FormControl>

			<FormGroup row>
				<FormControlLabel
					control={
						<Checkbox
							checked={extras.extraHot}
							onChange={() =>
								setExtras((prev) => ({ ...prev, extraHot: !prev.extraHot }))
							}
						/>
					}
					label="Extra Hot"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={extras.extraIce}
							onChange={() =>
								setExtras((prev) => ({ ...prev, extraIce: !prev.extraIce }))
							}
						/>
					}
					label="Extra Ice"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={extras.cinnamon}
							onChange={() =>
								setExtras((prev) => ({ ...prev, cinnamon: !prev.cinnamon }))
							}
						/>
					}
					label="Cinnamon Powder"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={extras.chocolate}
							onChange={() =>
								setExtras((prev) => ({ ...prev, chocolate: !prev.chocolate }))
							}
						/>
					}
					label="Chocolate Powder"
				/>
			</FormGroup>
		</BaseModal>
	);
}
