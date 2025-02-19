// src/services/shopify.js folder
const SHOPIFY_URL = 'https://api.escuelajs.co/api/v1/products';
//const ACCESS_TOKEN = import.meta.env.VITE_TAEILLO_API;

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${SHOPIFY_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}; 

// Example response format:
// [
//   {
//     title: "3 X 6 Kids Mattress",
//     productType: "bed and beddings",
//     variants: [
//       {
//         title: "blue",
//         price: "61976.00"
//       },
//       {
//         title: "yellow",
//         price: "61976.00"
//       }
//     ]
//   }
// ]