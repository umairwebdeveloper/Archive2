"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/shopify";
import { Spinner } from "@/components/spinner";

const PurchasePage: React.FC = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [productTypes, setProductTypes] = useState<string[]>([]);
	const [activeType, setActiveType] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await getProducts();
				setProducts(products);
				setFilteredProducts(products);
				const types: any = Array.from(
					new Set(products.map((product: any) => product.productType))
				);
				setProductTypes(types);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const handleFilter = (type: string | null) => {
		setActiveType(type);
		if (type === null) {
			setFilteredProducts(products);
		} else {
			const filtered = products.filter(
				(product: any) => product.productType === type
			);
			setFilteredProducts(filtered);
		}
	};

	const handleClick = (title: string) => () => {
		const slug = title.toLowerCase().replace(/\s/g, "-");
		window.open(
			`https://utlo1e1c5hswukci-83789447491.shopifypreview.com/products/${slug}`,
			"_blank"
		);
	};

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-4xl font-bold mt-8 mb-5 text-center">
				At what level are you taking your final exams?
			</h1>
			<div className="flex justify-center mb-4">
				<button
					className={`mx-2 px-4 py-2 rounded-lg ${
						activeType === null
							? "bg-blue-500 text-white"
							: "bg-gray-300"
					}`}
					onClick={() => handleFilter(null)}
				>
					All
				</button>
				{loading ? (
					<span className="flex items-center ms-3">
						<Spinner />
					</span>
				) : (
					productTypes.map((type) => (
						<button
							key={type}
							className={`mx-2 px-4 py-2 rounded-lg ${
								activeType === type
									? "bg-blue-500 text-white"
									: "bg-gray-300"
							}`}
							onClick={() => handleFilter(type)}
						>
							{type}
						</button>
					))
				)}
			</div>

			<hr className="my-5" />
			<h3 className="text-2xl font-semibold text-center mb-5">
				Available exam bundles
			</h3>
			{loading ? (
				<div className="flex justify-center mt-5 items-center">
					<Spinner size={"lg"} />
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredProducts.map((product: any) => (
						<div
							key={product.id}
							className="border rounded-lg cursor-pointer"
							onClick={handleClick(product.title)}
						>
							{product.images.edges.length > 0 && (
								<img
									src={product.images.edges[0].node.src}
									alt={
										product.images.edges[0].node.altText ||
										"Product Image"
									}
									className="w-full h-64 object-cover mb-4"
								/>
							)}
							<h2 className="text-xl font-semibold mb-2 text-center">
								{product.title} - {product.productType}
							</h2>
							<hr />
							<p className="text-lg font-medium text-blue-600 text-center my-3">
								€{product.variants.edges[0].node.priceV2.amount}
							</p>
							<div className="flex justify-center mb-3">
								<button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-700 rounded-lg">
									Order
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PurchasePage;
