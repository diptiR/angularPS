import { Component } from "@angular/core";
import { ProductService } from "./product.service";
import { IProduct } from "../shared/product.interface";
import { Router } from '@angular/router';

@Component({
    "templateUrl": "./product.html"
})

export class ProductComponent{
    constructor(private productService: ProductService, private route: Router) {}

    pageTitle: string = "Product Details";
    imageWidth: number = 150;
    message: string = "";
    showImg: boolean = false;
    _filterText: string = "";
  
    get filterText(): string {
      return this._filterText;
    }
  
    set filterText(value: string) {
      this._filterText = value;
      this.filteredProducts =
        this.filterText && this.filterText.length > 0
          ? this.performFilter(this._filterText)
          : this.products;
    }
    filteredProducts: IProduct[];
    products: IProduct[] = [];
  
    toggleImage(): void {
      this.showImg = !this.showImg;
    }
    performFilter(value: string): any {
      return this.products.filter((product: IProduct) => {
        return (
          product.productName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1
        );
      });
    }
    showDetails(product): void{
      this.route.navigate(['/product', product.productId]);
    }
    ngOnInit(): void {
      this.productService.getProducts().subscribe(products => {
        this.products = products;
        this.filteredProducts = this.products;
      });
      
    }
  
    ratingclicked(value: string): void {
      this.message = value;
    }
}