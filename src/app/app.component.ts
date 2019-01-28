import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product/product.service";
import { IProduct } from "./shared/product.interface";

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private productService: ProductService) {}

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
