import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
 name:  'replaceComma'  
})
export class ReplaceComma implements PipeTransform{

    transform(value: string): string {
        if(!!value){  // ni NaN et ni indefine
         return value.replace(/,/g, '.');
        }else {
            return '';
        }       
    }

}