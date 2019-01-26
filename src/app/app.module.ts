import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ConvertToSpacePipe } from "./shared/convertToSpaces";
import { StarRatingComponent } from "./shared/star.component";

@NgModule({
  declarations: [AppComponent, ConvertToSpacePipe, StarRatingComponent],
  imports: [BrowserModule, CommonModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
