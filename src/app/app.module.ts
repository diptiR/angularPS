import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ConvertToSpacePipe } from "./shared/convertToSpaces";

@NgModule({
  declarations: [AppComponent, ConvertToSpacePipe],
  imports: [BrowserModule, CommonModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
