import { gql, GraphQLClient } from "graphql-request";

const endpoint = "https://b6effd-12.myshopify.com/api/2024-04/graphql.json";
const storefrontAccessToken = "758d7f4b36dcc5ceaf56ab986764accb";

const client = new GraphQLClient(endpoint, {
	headers: {
		"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
	},
});

export async function getProducts() {
	const getAllProductsQuery = gql`
		{
			products(first: 10) {
				edges {
					node {
						id
						title
						description
						productType
						images(first: 1) {
							edges {
								node {
									src
									altText
								}
							}
						}
						featuredImage {
							url
							altText
						}
						variants(first: 1) {
							edges {
								node {
									priceV2 {
										amount
										currencyCode
									}
								}
							}
						}
					}
				}
			}
		}
	`;

	try {
		const data: any = await client.request(getAllProductsQuery);
		return data.products.edges.map((product: any) => product.node);
	} catch (error: any) {
		throw new Error(error);
	}
}
