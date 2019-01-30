import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from "src/app/product/product.service";


@Component({
    'templateUrl': 'product-details.html'
})

export class ProductDetailsComponent implements OnInit {
    constructor(private route: ActivatedRoute, private productService: ProductService) {
    }

    selectedId: number;
    selectedProduct: any;

    ngOnInit(): void {
        this.selectedId = +this.route.snapshot.paramMap.get("id");
        this.productService.getProduct(this.selectedId).subscribe(
            product => {
               this.selectedProduct = product;
            }
        )
    }

}