import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public errorMessage!: string | null;
  private validationMessage: { [key: string]: { [key: string]: string  } } = {
  hotelName: {
    required: 'Le nom de l\'hotel est obligatoire'
  },
  price: {
    required: 'Le prix de l\'hotel est obligatoire'
  } 

  };

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
      description: ['', Validators.required],
      tags : this.fb.array([])

    });

    this.route.paramMap.subscribe(params =>{     // récuperation de id à chaque changement de nouveau id
      const id = Number(params.get('id'));   
      this.getSelectedHotel(id);   
    })
    
  }
  // Methode permettant de retourner la reference du tableau tags 
  // de convertir en formArrays 

  public get tags(): FormArray{
    return this.hotelForm.get('tags') as FormArray;
  }

  // Methode permettant d'ajouter des elements dans le tableau tag[]
  public addTags() : void {
   this.tags.push(new FormControl()) 
  }

  public deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
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
      id: this.hotel.id,
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description      
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags  || []));  // setControl permet de modifier la valeur d'un control d'un formulaire
  }

  public saveHotel(): void {  
    console.log('formulaire', this.hotelForm.value);

    if(this.hotelForm.valid){ // si le formulaire est valide alors
      if(this.hotelForm.dirty){// si le formulaire contient des données alors
        const hotel : IHotel = {  // on va reconstituer les données de l'hotel
         ...this.hotel,  // les valeures initiales de l'hotel
         ...this.hotelForm.value,  // ici les valeurs du formulaire au cas ou les valeurs  ont été modifié
         tags: this.fb.array([])
        };

        if(hotel.id === 0) {
          this.hotlListeService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error:(err) => this.errorMessage = err
          });
        }else {
          this.hotlListeService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          })
        }
      }
      
    }

  }

  public deleteHotel(): void {
    if(confirm(`Voulez-vous vraiment supprimer ${this.hotel.hotelName} ?`)){
      this.hotlListeService.deleteHotel(this.hotel.id).subscribe({
        next: () => this.router.navigate(['/hotels'])
      });
    }
   

  }

  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }

  public hideError(): void {
   this.errorMessage = null;

  }

}
