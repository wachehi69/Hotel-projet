import { FormGroup } from "@angular/forms";

export class GlobalGenericValidator {

    constructor(
        private validatorMessages :  { [key: string]: { [key: string]: string  } }
    )
    { }


    public createErrorMessage(container: FormGroup) :  { [key: string]: string } { // container c'est le nom du formulaire
    const errorMessages :any =  {}

    // on va parcourrir les differents élements du formulaire
    for(const controlName in container.controls) {
        if(container.controls.hasOwnProperty(controlName)){ // hasOwnProperty return true or false si la clé que je vais donner dans controleName
                                                            // fait parti de notre formulaire
            const selectedControl = container.controls[controlName]; // on va sauvegarder le resultat de l'erreur dans selectedControl
        
            if(this.validatorMessages[controlName]) {    // on va verifier si l'erreur est presente dans validatorMessages
            errorMessages[controlName] = '';             // initilisation

            if((selectedControl.dirty || selectedControl.touched) && selectedControl.errors){// si selectcontrol n'est pas vide ou 
                                                                                             // ce control a été touché
                                                                                                // et que une erreur est apparu alors
              Object.keys(selectedControl.errors).map((errorMessageKey: string) => {   // donc on va parcourir l'ensemble des cles des ces erreurs
                if(this.validatorMessages[controlName][errorMessageKey]){              // et les affichées à chaque fois dans notre errorMessage
                    errorMessages[controlName] += this.validatorMessages[controlName][errorMessageKey] + ' ' ;
                }

              })
            }

            }
        }
    }

     return errorMessages;   
    } 
}