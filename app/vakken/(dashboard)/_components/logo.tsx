import Image from "next/image";

export const Logo = () => {
	return (
		<Image
			height={130}
			width={130}
			alt="logo"
			src="/assets/svg/new_logo.svg"
		/>
	);
};
