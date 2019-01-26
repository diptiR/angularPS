import { Injectable } from "@angular/core";
import { IProduct } from "./shared/product.interface";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  getProducts(): IProduct[] {
    return [
      {
        id: "1",
        name: "Hammer",
        code: "hammer-202020",
        releaseData: new Date("10/01/2019"),
        price: 20,
        description: "Hammer is used to hamerr",
        starRating: 2,
        imageUrl: "https://bardoloi.com/assets/hammer-safe/hammer.png"
      },
      {
        id: "2",
        name: "Nails",
        code: "nails-202020",
        releaseData: new Date("10/01/2019"),
        price: 20,
        description: "nails is used to hamerr",
        starRating: 3.6,
        imageUrl:
          "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/DIY_Projects_and_Ideas/Tools_and_Hardware/Guides/nails-guide-625200-hero.jpg"
      }
    ];
  }
}
