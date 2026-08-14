import "./style.css";

import { Product, ProductData } from "./models/Product";

import { fetchProducts } from "./services/apiService";

const searchInput = document.getElementById("searchInput") as HTMLInputElement;

const productContainer = document.getElementById(
  "productContainer",
) as HTMLElement;

const status = document.getElementById("status") as HTMLElement;

let products: Product[] = [];

function showStatus(message: string, isError: boolean = false): void {
  status.textContent = message;

  status.className = isError
    ? "mb-6 rounded-lg bg-red-100 p-4 text-red-700"
    : "mb-6 rounded-lg bg-green-100 p-4 text-green-700";
}

function displayProducts(productsToDisplay: Product[]): void {
  productContainer.innerHTML = "";

  if (productsToDisplay.length === 0) {
    productContainer.innerHTML = `
            <p class="col-span-full text-center text-gray-500">
                No products found.
            </p>
        `;

    return;
  }

  productsToDisplay.forEach((product) => {
    const card = document.createElement("article");

    card.className =
      "overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl";

    card.innerHTML = `
            ${
              product.thumbnail
                ? `
                        <img
                            src="${product.thumbnail}"
                            alt="${product.title}"
                            class="h-48 w-full object-cover"
                        >
                    `
                : ""
            }

            <div class="p-5">

                <div class="mb-3 flex items-start justify-between gap-3">
                    <h2 class="text-lg font-bold">
                        ${product.title}
                    </h2>

                    <span class="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                        ${product.category}
                    </span>
                </div>

                <p class="mb-4 text-sm text-gray-600">
                    ${product.description}
                </p>

                <div class="space-y-2 border-t pt-4">

                    <div class="flex justify-between">
                        <span class="text-gray-500">
                            Original Price
                        </span>

                        <span class="font-semibold">
                            $${product.price.toFixed(2)}
                        </span>
                    </div>

                    <div class="flex justify-between">
                        <span class="text-gray-500">
                            Discount
                        </span>

                        <span class="font-semibold text-green-600">
                            -$${(
                              product.price - product.getPriceWithDiscount()
                            ).toFixed(2)}
                        </span>
                    </div>

                    <div class="flex justify-between">
                        <span class="text-gray-500">
                            After Discount
                        </span>

                        <span class="font-semibold">
                            $${product.getPriceWithDiscount().toFixed(2)}
                        </span>
                    </div>

                    <div class="flex justify-between">
                        <span class="text-gray-500">
                            Tax
                        </span>

                        <span class="font-semibold">
                            $${product.getTax().toFixed(2)}
                        </span>
                    </div>

                    <div class="mt-3 flex justify-between border-t pt-3">
                        <span class="font-bold">
                            Final Price
                        </span>

                        <span class="text-xl font-bold text-blue-600">
                            $${product.getFinalPrice().toFixed(2)}
                        </span>
                    </div>

                </div>

                <div class="mt-4 text-sm text-gray-500">
                    ⭐ ${product.rating}
                    · ${product.stock} in stock
                </div>

            </div>
        `;

    productContainer.appendChild(card);
  });
}

async function loadProducts(): Promise<void> {
  try {
    showStatus("Loading products...");

    const productData: ProductData[] = await fetchProducts();

    products = productData.map((data) => new Product(data));

    displayProducts(products);

    showStatus(`Successfully loaded ${products.length} products.`);
  } catch (error) {
    console.error(error);

    showStatus("Failed to load products.", true);
  }
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  );

  displayProducts(filteredProducts);
});

// Automatically load products when the page opens
loadProducts();
