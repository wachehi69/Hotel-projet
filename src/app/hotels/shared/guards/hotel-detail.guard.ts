import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const id = +next.url[1].path;  // pour recupere l'id qui a été utilisé
      if(isNaN(id) || id <=0 ){  // on va proteger notre URL si notre id n'est pas un nombre(NaN) ou si le nombre < 0
        alert('Hotel est inconnu');
        this.router.navigate(['/hotels'])
        return false;
      }
    return true;
  }  
}
