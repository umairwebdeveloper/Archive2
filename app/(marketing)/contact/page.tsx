"use client";

import Navbar from "../_components/sections/navbar";
import Footer from "../_components/sections/footer";
import Form from "../_components/form";

const ContactPage = () => {
	return (
		<div className="min-h-full">
			<Navbar />
			<div className="my-10">
				<Form />
			</div>
			<Footer />
		</div>
	);
};

export default ContactPage;
