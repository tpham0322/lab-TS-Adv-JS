import { calculateDiscount } from "../utils/discountCalculator";
import { calculateTax } from "../utils/taxCalculator";

export interface ProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail?: string;
}

export class Product {
  public id: number;
  public title: string;
  public description: string;
  public category: string;
  public price: number;
  public discountPercentage: number;
  public rating: number;
  public stock: number;
  public brand?: string;
  public thumbnail?: string;

  constructor(data: ProductData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.price = data.price;
    this.discountPercentage = data.discountPercentage;
    this.rating = data.rating;
    this.stock = data.stock;
    this.brand = data.brand;
    this.thumbnail = data.thumbnail;
  }

  public getPriceWithDiscount(): number {
    const discount = calculateDiscount(
      this.price,
      this.discountPercentage
    );

    return this.price - discount;
  }

  public getTax(): number {
    return calculateTax(this.getPriceWithDiscount(), this.category);
  }

  public getFinalPrice(): number {
    return this.getPriceWithDiscount() + this.getTax();
  }

  public displayDetails(): void {
    console.log("-----------------------------------");
    console.log(`Product: ${this.title}`);
    console.log(`ID: ${this.id}`);
    console.log(`Category: ${this.category}`);
    console.log(`Price: $${this.price.toFixed(2)}`);
    console.log(`Discount: ${this.discountPercentage}%`);
    console.log(
      `Discount Amount: $${calculateDiscount(
        this.price,
        this.discountPercentage
      ).toFixed(2)}`
    );
    console.log(
      `Price After Discount: $${this.getPriceWithDiscount().toFixed(2)}`
    );
    console.log(`Tax: $${this.getTax().toFixed(2)}`);
    console.log(`Final Price: $${this.getFinalPrice().toFixed(2)}`);
    console.log(`Rating: ${this.rating}`);
    console.log(`Stock: ${this.stock}`);

    if (this.brand) {
      console.log(`Brand: ${this.brand}`);
    }

    console.log("-----------------------------------");
  }
}