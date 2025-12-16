const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>({ query, variables }: { query: string; variables?: object }): Promise<T | undefined> {
  if (!domain || !storefrontAccessToken) {
    const missing = [];
    if (!domain) missing.push("VITE_SHOPIFY_STORE_DOMAIN");
    if (!storefrontAccessToken) missing.push("VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN");
    console.warn(`SHOPIFY API KEYS MISSING: ${missing.join(", ")}`);
    throw new Error(`MISSING_ENV_VARS: ${missing.join(", ")}`);
  }
  
  // Sanitize domain (remove https:// if present)
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

  try {
    const response = await fetch(`https://${cleanDomain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken 
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        throw new Error(`HTTP_ERROR: ${response.status} ${response.statusText}`);
    }

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

export const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
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
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { 
        edges { 
          node { 
            url 
            altText 
          } 
        } 
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount }
          }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;