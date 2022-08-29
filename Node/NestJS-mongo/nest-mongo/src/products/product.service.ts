import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Product } from "./product.model";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description,
      price
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async fetchAllProducts() {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

  async getProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    };
  }

  async updateProduct(
    prodId: string,
    title: string,
    desc: string,
    price: number
  ) {
    const updateProduct = await this.findProduct(prodId);
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    updateProduct.save();
  }

  async deleteProduct(prodId: string) {
    let result;
    try {
      result = await this.productModel.deleteOne({ _id: prodId }).exec();
    } catch (error) {
      throw new NotFoundException("Could not find product.");
    }
  }

  async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Could not found this product");
    }
    return product;
  }
}
