const nodemailer = require("nodemailer");

const sendContactEmail = async ({ name, email, message }) => {
	if (!name || !email || !message) throw new Error("All fields are required");

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});

	await transporter.sendMail({
		from: `"${name}" <${email}>`,
		to: process.env.GMAIL_USER,
		subject: `New Message from ${name}`,
		html: `
			<h3>Contact Message</h3>
			<p><strong>Name:</strong> ${name}</p>
			<p><strong>Email:</strong> ${email}</p>
			<p><strong>Message:</strong></p>
			<p>${message}</p>
		`,
	});

	return { message: "Email sent successfully" };
};

module.exports = { sendContactEmail };
