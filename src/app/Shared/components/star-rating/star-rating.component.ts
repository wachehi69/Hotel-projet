import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
 selector: 'app-star-rating',
 templateUrl: './star-rating.component.html',
 styleUrls: ['./star-rating.component.css']

})
export class StarRatingComponent implements OnChanges{

    @Output() 
    public starRatingClicked: EventEmitter<string> = new EventEmitter<string>();

    public starWidth!: number;   // taille que prendra l'etoile correspondante
    @Input()
    public rating: number = 2    // le nmbre d'etoile correspondante

    ngOnChanges(){
      this.starWidth = this.rating * 125 / 5 ;  
    }


    public sendRating() : void {
      this.starRatingClicked.emit(`La note est de ${this.rating}`)



    }



}