const fetch = require('node-fetch');
require('dotenv').config();

const { SHOP_NAME, PASSWORD } = process.env;
const graphqlEndpoint = `https://${SHOP_NAME}.myshopify.com/admin/api/2023-01/graphql.json`;

async function executeGraphqlQuery(query) {
    try {
        const response = await fetch(graphqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': PASSWORD,
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data.data;
    } catch (error) {
        console.error('Error executing GraphQL query:', error);
        throw error;
    }
}

module.exports = { executeGraphqlQuery };
