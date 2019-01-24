import { Component, OnInit } from "@angular/core";
import { IProduct } from "./shared/product.interface";

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
  pageTitle: string = "Product Details";
  imageWidth: number = 150;
  showImg: boolean = false;
  _filterText: string = "";
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.filteredProducts = this.filterText && this.filterText.length > 0
      ? this.performFilter(this._filterText)
      : this.products;
  }
  filteredProducts: IProduct[];
  products: IProduct[] = [
    {
      id: "1",
      name: "Hammer",
      code: "hammer-202020",
      releaseData: new Date("10/01/2019"),
      price: 20,
      description: "Hammer is used to hamerr",
      starRating: 4.2,
      imageUrl: "https://bardoloi.com/assets/hammer-safe/hammer.png"
    },
    {
      id: "2",
      name: "Nails",
      code: "nails-202020",
      releaseData: new Date("10/01/2019"),
      price: 20,
      description: "nails is used to hamerr",
      starRating: 4.2,
      imageUrl:
        "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/DIY_Projects_and_Ideas/Tools_and_Hardware/Guides/nails-guide-625200-hero.jpg"
    }
  ];
  toggleImage(): void {
    this.showImg = !this.showImg;
  }
  performFilter(value: string): any {
    return this.products.filter((product: IProduct) => {
      return product.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1;
    });
  }
  ngOnInit(): void {
    this.filteredProducts = this.performFilter(this.filterText);
  }
}
