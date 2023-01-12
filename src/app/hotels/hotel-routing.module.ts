import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { hotelListComponent } from './hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelEditGuard } from './shared/guards/hotel-edit.guard';



@NgModule({
  declarations: [],
  imports: [
     RouterModule.forChild([
      {
        path : 'hotels/:id', component: HotelDetailComponent,
        canActivate: [HotelDetailGuard]    // permet de proteger cette route si URL a une erreur
      },
       {path : 'hotels', component: hotelListComponent },
       {path : 'hotels/:id/edit', component: HotelEditComponent,
       canDeactivate: [HotelEditGuard] // lorsque on clique sur le bouton annuler il verifie si le formulaire est vide ou pas
                                       // si c pa vide il affiche une alerte pour te dire si il doit vraiment annuler
      },                               // permet de prevenir la perte des données
    ])
  ], exports: [RouterModule]
})
export class HotelRoutingModule { }
