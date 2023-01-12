import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { hotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit{

  public hotelForm!: FormGroup;
  public hotel!: IHotel;
  public pageTitle! : string
  constructor(
             private fb: FormBuilder,
             private route: ActivatedRoute,   // Récuperation de l'id
             private hotlListeService: hotelListService,
             private router : Router   // pour la navigation des routes
             ){}

  ngOnInit() { 

    this.hotelForm = this.fb.group({    
      hotelName: ['', Validators.required],
      price : ['', Validators.required],      
      rating: ['', Validators.required],
      description: ['', Validators.required]    

    });
    this.route.paramMap.subscribe(params =>{     // récuperation de id à chaque changement de nouveau id
      const id = Number(params.get('id'));   
      this.getSelectedHotel(id);   
    })
    
  }

  public getSelectedHotel(id : number): void {
   this.hotlListeService.getHotelbyId(id).subscribe(
    (hotel : IHotel | any) =>{
      this.displayHotel(hotel);
    })

  }

  public displayHotel(hotel : IHotel) : void {
    this.hotel = hotel

    if(this.hotel.id === 0 ) {
      this.pageTitle = 'Créer un hotel';
    }else{
      this.pageTitle = ` Modification hotel ${ this.hotel.hotelName } `;
    }

    this.hotelForm.patchValue({    // envoyer les données dans le formulaire de modification
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description
    })
  }

  public saveHotel(): void {  
    console.log('formulaire', this.hotelForm.value);

    if(this.hotelForm.valid){ // si le formulaire est valide alors
      if(this.hotelForm.dirty){// si le formulaire contient des données alors
        const hotel : IHotel = {  // on va reconstituer les données de l'hotel
         ...this.hotel ,  // les valeures actuelles de l'hotel
         ...this.hotelForm.value  // ici les valeurs du formulaire au cas ou les valeurs a ont été modifié
        };

        if(hotel.id === 0) {
          this.hotlListeService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted()
          });         

        }else {
          this.hotlListeService.updateHotel(this.hotelForm.value).subscribe({
            next: () => this.saveCompleted()
          })
        }
      }
      
    }

  }



  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }

}
