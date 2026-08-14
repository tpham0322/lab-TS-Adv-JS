import "./style.css";

import {
    Product,
    ProductData
} from "./models/Product";

import {
    fetchProducts
} from "./services/apiService";


const searchInput =
    document.getElementById(
        "searchInput"
    ) as HTMLInputElement;

const productContainer =
    document.getElementById(
        "productContainer"
    ) as HTMLElement;

const status =
    document.getElementById(
        "status"
    ) as HTMLElement;


let products: Product[] = [];


/*
 * Display status messages
 */
function showStatus(
    message: string,
    isError: boolean = false
): void {

    status.textContent = message;

    status.className = isError
        ? "mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700"
        : "mb-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700";
}


/*
 * Display product cards
 */
function displayProducts(
    productsToDisplay: Product[]
): void {

    productContainer.innerHTML = "";


    /*
     * No products found
     */
    if (productsToDisplay.length === 0) {

        productContainer.innerHTML = `
            <div class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                        />
                    </svg>

                </div>

                <h3 class="text-lg font-bold text-slate-900">
                    No products found
                </h3>

                <p class="mt-1 text-sm text-slate-500">
                    Try searching for a different product,
                    category, or brand.
                </p>

            </div>
        `;

        return;
    }


    /*
     * Create product cards
     */
    productsToDisplay.forEach(
        (product) => {

            const card =
                document.createElement("article");


            /*
             * Card styling
             */
            card.className =
                "group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";


            /*
             * Calculate pricing
             */
            const discount =
                product.price -
                product.getPriceWithDiscount();

            const priceAfterDiscount =
                product.getPriceWithDiscount();

            const tax =
                product.getTax();

            const finalPrice =
                product.getFinalPrice();


            /*
             * Product card HTML
             */
            card.innerHTML = `

                <!-- Product Image -->
                <div class="relative overflow-hidden bg-slate-100">

                    ${
                        product.thumbnail
                            ? `
                                <img
                                    src="${product.thumbnail}"
                                    alt="${product.title}"
                                    class="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                                >
                            `
                            : `
                                <div class="flex h-52 items-center justify-center text-sm text-slate-400">
                                    No image available
                                </div>
                            `
                    }


                    <!-- Discount Badge -->
                    ${
                        product.discountPercentage > 0
                            ? `
                                <div class="absolute left-4 top-4">

                                    <span class="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                                        ${product.discountPercentage.toFixed(0)}% OFF
                                    </span>

                                </div>
                            `
                            : ""
                    }

                </div>


                <!-- Product Information -->
                <div class="p-5">


                    <!-- Title and Category -->
                    <div class="mb-3 flex items-start justify-between gap-3">

                        <h2 class="text-lg font-bold leading-tight text-slate-900">
                            ${product.title}
                        </h2>

                        <span class="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-700">
                            ${product.category}
                        </span>

                    </div>


                    <!-- Description -->
                    <p class="mb-5 line-clamp-2 text-sm leading-6 text-slate-500">
                        ${product.description}
                    </p>


                    <!-- Pricing Box -->
                    <div class="rounded-xl bg-slate-50 p-4">

                        <div class="space-y-2">


                            <!-- Original Price -->
                            <div class="flex items-center justify-between text-sm">

                                <span class="text-slate-500">
                                    Original Price
                                </span>

                                <span class="font-medium text-slate-700">
                                    $${product.price.toFixed(2)}
                                </span>

                            </div>


                            <!-- Discount -->
                            <div class="flex items-center justify-between text-sm">

                                <span class="text-slate-500">
                                    Discount
                                </span>

                                <span class="font-semibold text-emerald-600">
                                    -$${discount.toFixed(2)}
                                </span>

                            </div>


                            <!-- After Discount -->
                            <div class="flex items-center justify-between text-sm">

                                <span class="text-slate-500">
                                    After Discount
                                </span>

                                <span class="font-medium text-slate-700">
                                    $${priceAfterDiscount.toFixed(2)}
                                </span>

                            </div>


                            <!-- Tax -->
                            <div class="flex items-center justify-between text-sm">

                                <span class="text-slate-500">
                                    Tax
                                </span>

                                <span class="font-medium text-slate-700">
                                    $${tax.toFixed(2)}
                                </span>

                            </div>


                            <!-- Divider + Final Price -->
                            <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">

                                <span class="font-bold text-slate-900">
                                    Final Price
                                </span>

                                <span class="text-2xl font-bold text-blue-600">
                                    $${finalPrice.toFixed(2)}
                                </span>

                            </div>

                        </div>

                    </div>


                    <!-- Rating and Stock -->
                    <div class="mt-4 flex items-center justify-between text-sm">


                        <!-- Rating -->
                        <div class="flex items-center gap-1.5">

                            <span class="text-lg text-amber-400">
                                ★
                            </span>

                            <span class="font-semibold text-slate-700">
                                ${product.rating.toFixed(1)}
                            </span>

                            <span class="text-slate-400">
                                rating
                            </span>

                        </div>


                        <!-- Stock -->
                        <div>

                            <span class="${
                                product.stock > 10
                                    ? "text-emerald-600"
                                    : "text-orange-600"
                            } font-semibold">

                                ${product.stock}

                            </span>

                            <span class="text-slate-400">
                                in stock
                            </span>

                        </div>

                    </div>


                    <!-- Brand -->
                    ${
                        product.brand
                            ? `
                                <div class="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-400">

                                    Brand:

                                    <span class="font-semibold text-slate-600">
                                        ${product.brand}
                                    </span>

                                </div>
                            `
                            : ""
                    }

                </div>

            `;


            productContainer.appendChild(card);
        }
    );
}


/*
 * Fetch products from the API
 */
async function loadProducts(): Promise<void> {

    try {

        /*
         * Show loading message
         */
        showStatus(
            "Loading products..."
        );


        /*
         * Fetch product data
         */
        const productData:
            ProductData[] =
            await fetchProducts();


        /*
         * Convert API objects into
         * Product class instances
         */
        products =
            productData.map(
                (data) =>
                    new Product(data)
            );


        /*
         * Display products
         */
        displayProducts(products);


        /*
         * Show success message
         */
        showStatus(
            `Successfully loaded ${products.length} products.`
        );


        /*
         * Hide success message
         * after three seconds
         */
        setTimeout(() => {

            status.className = "hidden";

        }, 3000);

    } catch (error) {

        console.error(error);


        /*
         * Display error message
         */
        showStatus(
            "Unable to load products. Please try again later.",
            true
        );
    }
}


/*
 * Search products
 */
searchInput.addEventListener(
    "input",
    () => {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        /*
         * Filter by:
         * - Product name
         * - Category
         * - Brand
         */
        const filteredProducts =
            products.filter(
                (product) => {

                    const title =
                        product.title
                            .toLowerCase();

                    const category =
                        product.category
                            .toLowerCase();

                    const brand =
                        product.brand
                            ?.toLowerCase() ?? "";


                    return (
                        title.includes(searchTerm) ||
                        category.includes(searchTerm) ||
                        brand.includes(searchTerm)
                    );
                }
            );


        /*
         * Display filtered results
         */
        displayProducts(
            filteredProducts
        );
    }
);


/*
 * Automatically load products
 * when the page opens.
 */
loadProducts();