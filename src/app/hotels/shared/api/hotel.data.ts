import {InMemoryDbService, RequestInfo}  from 'angular-in-memory-web-api'
import { max } from 'rxjs';
import { IHotel } from '../models/hotel';

export class HotelData implements InMemoryDbService {

    createDb(): Record<string, IHotel[]> {
     const hotels: IHotel[] =[
        {
            id: 1,
            hotelName: "Buea sweet life",
            description: "Belle vue au bord de la mer",
            price: 230.5,
            imageUrl : "assets/img/hotel-room.jpg",
            rating: 3.5      
          },
          {
           id:2,
           hotelName: "Marrakech",
           description: "Profiter de la vue sur les montagnes",
           price: 145.5,
           imageUrl : "assets/img/the-interior.jpg",
           rating: 5
         },
         {
            id:3,
           hotelName: "venise",
           description: "Profiter de la vue sur les montagnes",
           price: 145.5,
           imageUrl : "assets/img/indoors.jpg",
           rating: 4.5
         
         },
         {
           id:4,
           hotelName: "Cap town city",
           description: "Profiter de la vue sur les montagnes",
           price: 145.5,
           imageUrl : "assets/img/window.jpg",
           rating: 3.5
         }

     ];
     return {hotels};
        
    }
    // Pour que ce methode marche doit être absolument nommé genId(), pour qu'elle fonctionne
    genId(hotels: IHotel[]): number {
      return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
    }

}