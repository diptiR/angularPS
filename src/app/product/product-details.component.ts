import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from "src/app/product/product.service";


@Component({
    'templateUrl': 'product-details.html'
})

export class ProductDetailsComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {
    }

    selectedId: number;
    selectedProduct: any;

    next(): void {
        this.selectedId++;
        this.router.navigate(['/product', this.selectedId]);
    }

    previous(): void {
        this.selectedId--;
        this.router.navigate(['/product', this.selectedId]);
    }

    getProduct(): void {
        this.productService.getProduct(this.selectedId).subscribe(
            product => {
                this.selectedProduct = product;
            }
        )
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.selectedId = +params.get("id");
            this.getProduct();
        })
    }

}