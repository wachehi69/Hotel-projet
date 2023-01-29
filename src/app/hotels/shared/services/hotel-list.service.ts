import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,  of,  throwError } from "rxjs";
import { catchError, map,  tap } from "rxjs/operators";
import { IHotel } from "../models/hotel";

@Injectable({
    providedIn : 'root'
})
export class hotelListService {

  private readonly HOTEL_API_URL = 'api/hotels'; 

    constructor(private http: HttpClient){}

    public getHotels() : Observable<IHotel[]> {    
     return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
       tap(hotels => console.log('hotel service' , hotels)),
       catchError(this.handleError)
     );

    }

    public getHotelbyId(id : number): Observable<IHotel| any>  {   
    const url = `${this.HOTEL_API_URL}/${id}`

      if(id === 0){  // il s'agit d'un ajout sinon c'est une modifiaction
       return of(this.getDefaultHotel());
      }
      
     return this.http.get<IHotel>(url).pipe(
      catchError(this.handleError)
     );
    
    }

    private getDefaultHotel() : IHotel  {
      return {
        id: 0,
        hotelName: '',
        description: '',
        price: 0,
        rating: 0,
        imageUrl: ''
      };
    }

    public updateHotel(hotel: IHotel): Observable<IHotel> {
      const url = `${this.HOTEL_API_URL}/${hotel.id}222`
      return this.http.put<IHotel>(url, hotel).pipe(
       catchError(this.handleError)
      );
    }

    public createHotel(hotel : IHotel): Observable<IHotel> {
      hotel = {
        ...hotel,
        imageUrl: 'assets/img/hotel-room.jpg',
        id: 5   
      }
      const url = `${this.HOTEL_API_URL}`;
     return this.http.post<IHotel>(url, hotel).pipe(
       catchError(this.handleError)
     );
    }

    public deleteHotel(id: number) : Observable<{}> {
      const url = `${this.HOTEL_API_URL}/${id}`;
      return this.http.delete<IHotel>(url).pipe(
        catchError(this.handleError)
      );
    }


    public handleError(error: HttpErrorResponse) {

      let errorMessage: string;
      if (error.error instanceof ErrorEvent) {
        // client-side or network error occurend . Handle it according 
        console.error('An error occurend : ', error.error.message)  
        errorMessage = `An error occurred : ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong
        console.error(
          `Backend returned code ${error.status}, `+
          `body was: ${error.error.message} `   );
          
        errorMessage = `Backend returned code ${error.status}, `+
                        `body was: ${error.error.message} `;    
      }    
      return throwError('Something bad happened try again later' + 
      '\n' + 
      errorMessage);
    }
}