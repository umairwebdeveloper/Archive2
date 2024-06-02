import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
	title: "Jotion",
	description: "The connected workspace where better faster work happens",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/logo.svg",
				href: "/logo.svg",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/logo.svg",
				href: "/logo.svg",
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
