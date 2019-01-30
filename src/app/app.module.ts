import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { ConvertToSpacePipe } from "./shared/convertToSpaces";
import { StarRatingComponent } from "./shared/star.component";
import { ProductComponent } from "./product/product.component";
import { WelcomeComponent } from "./home/welcome.component";
import { ProductDetailsComponent } from "src/app/product/product-details.component";

@NgModule({
  declarations: [
    AppComponent,
    ConvertToSpacePipe,
    StarRatingComponent,
    ProductComponent,
    ProductDetailsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "product", component: ProductComponent },
      { path: "product/:id", component: ProductDetailsComponent },
      { path: "welcome", component: WelcomeComponent },
      { path: "", component: WelcomeComponent, pathMatch: "full" },
      { path: "**", component: WelcomeComponent, pathMatch: "full" },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
