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
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { submitReview } from "../API/reviewAPI";
import { useSnackbar } from "../contexts/SnackBarContext";

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
	const { showSnackbar } = useSnackbar();
	const theme = useTheme();

	const onSubmit = async (data) => {
		try {
			const result = await submitReview(data);
			if (result?.success) {
				showSnackbar("Thank you for leaving us a review", "success");
				reset();
			} else {
				showSnackbar("Submit failed!", "error");
			}
		} catch (err) {
			console.error(err);
			showSnackbar(err.message || "Unexpected error", "error");
		}
	};

	return (
		<Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
			{/* Hero Banner */}
			<Box
				sx={{
					px: 2,
					py: { xs: 6, md: 8 },
					mb: 5,
					textAlign: "center",
					backgroundImage:
						"url('https://m.media-amazon.com/images/I/81PdBK+WaWL.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: theme.palette.common.white,
				}}
			>
				<Container maxWidth="md">
					<Typography variant="h1" sx={{ mb: 2 }}>
						Rate Us
					</Typography>
					<Typography variant="body1">Leave us a rating.</Typography>
				</Container>
			</Box>

			{/* Form Card */}
			<Container maxWidth="md">
				<Paper sx={{ p: 4, borderRadius: 3 }}>
					<Typography variant="h4" mb={3} color="primary.main" fontWeight="bold">
						Leave a Review
					</Typography>

					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							{/* Rating */}
							<Box>
								<Typography variant="body1" mb={1}>
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
