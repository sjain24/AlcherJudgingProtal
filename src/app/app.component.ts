import { Component, OnInit} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DataService } from './data.service';
import { RegistrationService } from './registration.service';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit{
    public myForm: FormGroup;
    public totalCriteria = 1;
    public errorMsg;
    EditRowId: any ='';
    public i:number = 0;
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;


    public criteria_data = [];
    public participant_data=[];
    
    constructor(private fb: FormBuilder , private _dataservice : DataService , private _registrationService: RegistrationService, private idle: Idle, private keepalive: Keepalive) {
          // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() =>{
      this.idleState = 'No longer idle.';
      this.reset();
      // console.log("You are active again , check for idle started ");
    });
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      console.log("Timed Out hiding all active rows");
      this.reset();
      this.timedOut = true;
      this.Edit(0);
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    // idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    this.reset();
    }
    ngOnInit() {
        this._dataservice.getParticipant()
        .subscribe(data => this.participant_data = data);
        this._dataservice.getCriteria()
        .subscribe(data => this.criteria_data = data,
                   error => this.errorMsg = error);

        var arr = [];
        for(var i = 0; i < this.participant_data.length; i++){
          arr.push(this.buildParticipant(this.participant_data[i] , i));
        }
        this.myForm = this.fb.group({
            participants: this.fb.array(arr)
        });
        
        
      }

    reset(){
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }  
    loadApidata(){
        var arr = [];
        for(var i = 0; i < this.participant_data.length; i++){
          arr.push(this.buildParticipant(this.participant_data[i] , i));
        }
        this.myForm = this.fb.group({
            participants: this.fb.array(arr)
        });
      }
   
    
    buildParticipant(participants , index): FormGroup{
      var arr2 = [];
      for(var j = 0; j < this.criteria_data.length; j++){
        arr2.push(this.buildCriteria(this.criteria_data[j] , j));
      }
      return this.fb.group({
        id: [index +1],
        registrationNo: [participants.registrationNo],
        criteriaArray: this.fb.array(arr2),
        dataSaveCheck: false,
      })
    }
     
    buildCriteria(criteria , index): FormGroup{
      return this.fb.group({
        criteriaName: criteria.criteriaName,
        marks: [''],
        max_marks: criteria.mm, 
      })
    } 

    get Participants(){
      return this.myForm.get('participants') as FormArray;
    }
 

  Edit(val){
     this.EditRowId = val;   
  }


  save(formData) {
    console.log(formData.value);
    for(let i = 0  ; i < this.participant_data.length ; i++){
      this.Participants.at(i).get('dataSaveCheck').setValue(true);
    }
    console.log(this.myForm.value);
    this._registrationService.register(this.myForm.value)
      .subscribe(
        response => console.log('Success!' , response),
        error => console.error('Error!', error)
      );
  }
  saveCandidateForm(CandidateForm , i){
    console.log(CandidateForm.value);
    this.Participants.at(i).get('dataSaveCheck').setValue(true);
    this._registrationService.register(CandidateForm.value)
    .subscribe(
      response => console.log('Success!' , response),
      error => console.error('Error!', error)
    );
  }
  changeButtonColor(i){
    this.Participants.at(i).get('dataSaveCheck').setValue(false);
  }

}


