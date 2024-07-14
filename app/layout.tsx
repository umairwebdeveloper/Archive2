import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import { ThemeProvider } from "@/components/providers/theme-providers";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ToastProvider } from "@/components/providers/toaster.provider";
import dynamic from "next/dynamic";
import { ProgressProvider } from "@/hooks/context/ProgressContext"; // import ProgressProvider

const CrispWithNoSSR = dynamic(() => import("../components/crisp"), {
	ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Gotutor",
	description:
		"Easily create dynamic user journeys to activate, retain, and understand users, without engineering effort.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/assets/svg/logo-icon.svg",
				href: "/assets/svg/logo-icon.svg",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/assets/svg/logo-icon.svg",
				href: "/assets/svg/logo-icon.svg",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ConvexClientProvider>
					<EdgeStoreProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
							storageKey="jotion-theme-2"
						>
							<ProgressProvider>
								<Toaster position="bottom-center" />
								<ModalProvider />
								{children}
								<ToastProvider />
							</ProgressProvider>
						</ThemeProvider>
					</EdgeStoreProvider>
				</ConvexClientProvider>
				<CrispWithNoSSR />
			</body>
		</html>
	);
}
