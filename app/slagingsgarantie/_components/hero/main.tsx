import Companies from "./companies";
import Heading from "./heading";
import Navbar from "./navbar";

const Hero = () => {
	return (
		<div
			style={{ minHeight: "600px" }}
			className="bg-gradient-to-r from-prim950 to-prim900 rounded-b-3xl py-5"
		>
			<div className="container">
				<Navbar />
				<Heading />
			</div>
			<Companies />
		</div>
	);
};

export default Hero;
