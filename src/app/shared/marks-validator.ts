import { AbstractControl } from "@angular/forms";


export function marksValidator(control: AbstractControl):{[key: string]:any} | null {
    // console.log("validating marks");
    const mm :number  = control.get(['max_marks']).value; 
    const marks:number = control.get(['marks']).value;
    // console.log(typeof mm);
    // console.log(typeof marks);
    if( marks <= mm && marks >= 0 ){
        // console.log(marks +"and"+ mm)
        return null
    }
    else{
        // console.log("marks entered:"+marks +" and "+ "maxmarks:"+ mm)
        // console.log("marks <= mm ? "+ (marks <= mm) )
        return {notValid : true}

    }
}