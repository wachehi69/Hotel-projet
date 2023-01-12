import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { hotelListService } from '../shared/services/hotel-list.service';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit{


  public hotel: IHotel | undefined = <IHotel>{};
  constructor(
    private route: ActivatedRoute,   // permet de recuperer l'id route
    private hotelListService: hotelListService,
    private router: Router  // permet de naviguer d'une page à l'autre
    ){}

  ngOnInit(): void {

    const id : number = Number(this.route.snapshot.paramMap.get('id'));
     this.hotelListService.getHotels().subscribe((hotels : IHotel []) => {        
      this.hotel = hotels.find(hotel => hotel.id === id);
       console.log("hotel ", this.hotel)
      })
    
  }

 public  backToList() : void {
   this.router.navigate(['/hotels']);

  }

}
