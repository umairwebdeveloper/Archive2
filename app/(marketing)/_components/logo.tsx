import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const Logo = () => {
  return (
		<div className="hidden md:flex items-center gap-x-2">
			<Image
				src="/assets/svg/Logo.svg"
				height="150"
				width="150"
				alt="Logo"
				className="dark:hidden"
			/>
			<Image
				src="/assets/svg/dark-logo.svg"
				height="150"
				width="150"
				alt="Logo"
				className="hidden dark:block"
			/>
		</div>
  );
}