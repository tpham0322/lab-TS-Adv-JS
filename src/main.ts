import {
  Product,
  ProductData
} from "./models/Product";

import {
  fetchProducts,
  fetchProductById
} from "./services/apiService";

import { handleError } from "./utils/errorHandler";

async function main(): Promise<void> {
  try {
    console.log("Fetching products...\n");

    const productData: ProductData[] = await fetchProducts();

    const products: Product[] = productData.map(
      (data) => new Product(data)
    );

    console.log(`Successfully fetched ${products.length} products.\n`);

    // Display the first five products
    products.slice(0, 5).forEach((product) => {
      product.displayDetails();
    });

    // Demonstrate fetching a single product
    console.log("\nFetching a single product...\n");

    const singleProductData = await fetchProductById(1);
    const singleProduct = new Product(singleProductData);

    console.log("Single Product:");
    singleProduct.displayDetails();

  } catch (error) {
    handleError(error);
  }
}

main();