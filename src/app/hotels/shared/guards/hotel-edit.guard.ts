import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {
  canDeactivate(
    component: HotelEditComponent): boolean {
      if(component.hotelForm.dirty) {   // pour acceder à mon formulaire HotelEditComponent et verifier si le formulaire contient des élts
                                       // on utilise l'objet component, dirty : veut dire que le formulaire contient des elets
       const hotelName = component.hotelForm.get('hotelName')?.value || 'Nouveau hotel';
      return confirm(`Voulez vous annuler les changements effectués sur ${hotelName}`)
      }
    return true;
  }
  
}
