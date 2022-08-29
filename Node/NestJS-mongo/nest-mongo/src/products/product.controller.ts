import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async addProduct(
    @Body("title") prodTitle: string,
    @Body("description") prodDesc: string,
    @Body("price") prodPrice: number
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.fetchAllProducts();
    return products.map(prod => ({
        id: prod.id,
        title: prod.title,
        description: prod.description,
        price: prod.price
    }));
  }

  @Get(":id")
  getProduct(@Param("id") prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") prodId: string,
    @Body("title") prodTitle: string,
    @Body("description") prodDesc: string,
    @Body("price") prodPrice: number
  ) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  async deleteProduct(
    @Param("id") prodId: string
  ){
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
