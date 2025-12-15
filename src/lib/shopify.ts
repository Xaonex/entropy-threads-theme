const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Generic GraphQL Fetcher
export async function shopifyFetch<T>({ query, variables }: { query: string; variables?: object }): Promise<T | undefined> {
  // If credentials are missing, return undefined to trigger Mock Mode fallback
  if (!domain || !storefrontAccessToken) {
    console.warn("SHOPIFY API KEYS MISSING // SWITCHING TO MOCK MODE");
    return undefined;
  }

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("SHOPIFY_API_ERROR", json.errors);
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (error) {
    console.error("SHOPIFY_FETCH_FAILED", error);
    throw error;
  }
}

// Example Queries
export const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      media(first: 10) {
        edges {
          node {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
            }
          }
        }
      }
    }
  }
`;