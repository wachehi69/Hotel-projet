import { Component, OnInit } from "@angular/core";
import { IHotel } from "../shared/models/hotel";
import { hotelListService } from "../shared/services/hotel-list.service";


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']

})
export class hotelListComponent implements OnInit{

  constructor( private hotlListeService: hotelListService) {


  }
  
  public title = 'liste hotels';
  public showBadge: boolean = true;
  public receiveRating!: string;
  public errMessage!: string;

  public hotels: IHotel[] = [];

  private  _hotelFilter = 'mot';
  public filteredHotel : IHotel [] = [];

  ngOnInit(): void {
    this.hotlListeService.getHotels().subscribe({
      next: (hotels: IHotel[]) => {
            this.hotels = hotels;
            this.filteredHotel = this.hotels; 
        },

      error: (err: string) => this.errMessage = err      
    });     
       
    this.hotelFilter = '';
  }
  

  toggleIsNewBadge(): boolean {
    this.showBadge = !this.showBadge
    return this.showBadge;
  }
  
  public get hotelFilter(): string{
    return this._hotelFilter;
  }

  public set hotelFilter(filter: string) {
    this._hotelFilter = filter;
    this.filteredHotel = this.hotelFilter ? this.filterHotels(filter) : this.hotels;

  }

  private filterHotels(criteria: string): IHotel[]{
    criteria = criteria.toLowerCase();
    const resultat = this.hotels.filter(     
      (hotel: IHotel) => hotel.hotelName.toLowerCase().indexOf(criteria) !== -1
      );      
      return resultat;
  }

  // methode permettant chercher des hotels

  public searchHotel(criteria: string) : IHotel[] {
   const listHotelfilter : IHotel[] = [];
   for(const hotel of this.hotels){
    if(hotel.hotelName.toLowerCase().indexOf(criteria) !== -1 ){
      listHotelfilter.push(hotel)
    }
   
   }
   return listHotelfilter
  }

 public receiveRatingClicked(message: string): void{
  this.receiveRating = message;
 }

  

}