import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ProductDetailsGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const id = +next.url[1].path;
    return id > 0 && id < 6;
  }
}
