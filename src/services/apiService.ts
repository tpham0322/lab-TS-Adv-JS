import { ApiError, NetworkError } from "../utils/errorHandler";
import { ProductData } from "../models/Product";

const API_URL = "https://dummyjson.com/products";

interface ProductResponse {
  products: ProductData[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchProducts(): Promise<ProductData[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch products: ${response.statusText}`,
        response.status
      );
    }

    const data: ProductResponse = await response.json();

    return data.products;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new NetworkError(
      "Unable to connect to the product API."
    );
  }
}

export async function fetchProductById(
  id: number
): Promise<ProductData> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new ApiError(
        `Product with ID ${id} was not found.`,
        response.status
      );
    }

    const product: ProductData = await response.json();

    return product;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new NetworkError(
      "Unable to connect to the product API."
    );
  }
}