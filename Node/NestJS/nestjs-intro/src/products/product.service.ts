import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from './product.model';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    fetchAllProducts(){
        return [...this.products];
    }

    getProduct(prodId: string){
        const [product,_] = this.findProduct(prodId);
        return {...product}; 
    }

    updateProduct(prodId: string, title: string, desc: string, price: number ){
        const [product, index] = this.findProduct(prodId);
        const updateProduct = {...product};
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.desc = desc;
        }
        if(price){
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;
    }

    deleteProduct(prodId: string){
        const [_,index] = this.findProduct(prodId);
        this.products.splice(index,1);

    }

    findProduct(id: string) : [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not found this product');
        }
        return [product, productIndex];
    }
}