import { AbstractControl } from "@angular/forms";


export function marksValidator(control: AbstractControl):{[key: string]:any} | null {
    console.log("validating marks");
    let mm : number  = control.get(['max_marks']).value; 
    let marks:number = control.get(['marks']).value;
    if( marks < mm ){
        console.log(marks +"and"+ mm)
        return null
    }
    else{

        console.log(marks <= mm )
        console.log(marks +"and"+ mm)
        return {notValid : true}

    }
}