// src/services/shopify.js folder
const CJ_GRAPHQL_ENDPOINT = "https://ads.api.cj.com/query";

const CJ_ACCESS_TOKEN = import.meta.env.VITE_CJ_ACCESS_TOKEN; // CJ Token

const fetchProducts = async (queryProducts) => {
  const query = `
    query {
      products(
        companyId: "7500110", 
        keywords: "${queryProducts}", 
        partnerIds: [6741121, 7008509, 6322281, 6293473], 
        limit: 5
      ) {
        totalCount
        count
        resultList {
          title
          imageLink
          brand
          targetCountry
          serviceableAreas
          description
          price {
            amount
            currency
          }
          link
          linkCode(pid: "101415884", shopperId: "15650185") {
            clickUrl
            imageUrl
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(CJ_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CJ_ACCESS_TOKEN}`, // uncomment if auth is needed
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    console.log("Fetched CJ products:", data.products.resultList);
    return data.products.resultList;
  } catch (error) {
    console.error("Error fetching CJ products:", error);
    throw error;
  }
};

export default fetchProducts;
