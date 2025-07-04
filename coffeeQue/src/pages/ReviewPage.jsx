import React from "react";
import {
	Container,
	Typography,
	TextField,
	Box,
	Button,
	Rating,
	Stack,
	Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function ReviewPage() {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			rating: 0,
			message: "",
		},
	});

	const onSubmit = (data) => {
		console.log("Review submitted:", data);
		// TODO: Implement review submission logic (API call)
		reset(); // Clear the form
	};

	return (
		<Box sx={{ py: 6, bgcolor: "background.default", minHeight: "80vh" }}>
			<Container maxWidth="md">
				<Paper sx={{ p: 4, borderRadius: 3 }}>
					<Typography variant="h4" mb={3} color="primary.main" fontWeight="bold">
						Leave a Review
					</Typography>

					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							{/* Rating */}
							<Box>
								<Typography variant="subtitle1" mb={1}>
									Your Rating
								</Typography>
								<Controller
									name="rating"
									control={control}
									rules={{ required: "Rating is required" }}
									render={({ field }) => (
										<Rating
											{...field}
											value={field.value}
											onChange={(_, newValue) => field.onChange(newValue)}
										/>
									)}
								/>
								{errors.rating && (
									<Typography color="error" variant="body2">
										{errors.rating.message}
									</Typography>
								)}
							</Box>

							{/* Message */}
							<Controller
								name="message"
								control={control}
								rules={{
									required: "Review message is required",
									minLength: {
										value: 10,
										message: "Review must be at least 10 characters",
									},
								}}
								render={({ field }) => (
									<TextField
										{...field}
										label="Your Review"
										multiline
										rows={4}
										fullWidth
										variant="outlined"
										error={!!errors.message}
										helperText={errors.message?.message}
									/>
								)}
							/>

							{/* Submit */}
							<Button variant="contained" type="submit" color="secondary">
								Submit Review
							</Button>
						</Stack>
					</form>
				</Paper>
			</Container>
		</Box>
	);
}
