import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Owner} from "../model/model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICarOwnersService} from "../service/service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input()owner:Owner
  formOwner:FormGroup;
  ownersCars:FormArray;
  addOwner: false;

get checkValid(){
  return this.formOwner.invalid
}
  constructor(public activeModal: NgbActiveModal, private fb:FormBuilder,private service:ICarOwnersService) { }


  ngOnInit(): void {
    this.buildForm()
    if(!this.addOwner) {
      this.setDefaultData(this.owner);
    }
    if(!this.addOwner) {
      this.addCar()
    }
  }

  buildForm(){
    this.formOwner = this.fb.group({
      id:null,
      firstName: new FormControl('', [ Validators.minLength(3), Validators.pattern("^[А-я,A-z,і]*$" )]),
      lastName:new FormControl('', [ Validators.minLength(3), Validators.pattern("^[А-я,A-z,і]*$" )]),
      middleName:new FormControl('', [ Validators.minLength(3), Validators.pattern("^[А-я,A-z,і]*$" )]),
      ownersCars: this.fb.array([

      ])
    })

    this.ownersCars = this.formOwner.get('ownersCars') as FormArray


  }

  setDefaultData(owner:Owner){
      this.formOwner.get('firstName')?.patchValue(owner.firstName)
      this.formOwner.get('lastName')?.patchValue(owner.lastName)
      this.formOwner.get('middleName')?.patchValue(owner.middleName)
    this.formOwner.get('id')?.patchValue(owner.id)
      const cars = this.owner.ownersCars;
      for (let i = 0;i < cars.length;i++){
        const test = this.fb.group({
          carNumber:  this.fb.control( cars[i].carNumber, [Validators.minLength(2),Validators.pattern("^[A-z]*$" )]),
            carName:  this.fb.control( cars[i].carName, [Validators.minLength(6),Validators.pattern("^[A-z]*$" )]),
            carModel: this.fb.control( cars[i].carModel, [Validators.minLength(2),Validators.pattern("^[A-z]*$" )]),
            carYear: this.fb.control(cars[i].carYear,  [Validators.minLength(4),Validators.pattern("^[0-9]*$" )])
        })
        this.ownersCars.push(test)
      }

  }

  saveClick() {
  if(!this.addOwner) {
    this.service.editOwner(this.formOwner.value, 0).subscribe(res => {
      this.service.dataSubject$.next(true)
      this.activeModal.close('Close click')
    })
  }else if(this.addOwner) {
    this.service.createOwner(this.formOwner.value).subscribe(res => {
      this.service.dataSubject$.next(true)
      this.activeModal.close('Close click')
    })
  }
  }

  addCar() {
    const addCar = this.fb.group({
      carModel: this.fb.control(null, [Validators.minLength(2),Validators.pattern("^[A-z]*$" )]),
      carNumber: this.fb.control(null, [Validators.minLength(6),Validators.pattern("^[A-Z,0-9]*$" )]),
      carName: this.fb.control(null, [Validators.minLength(2),Validators.pattern("^[A-z]*$" )]),
      carYear: this.fb.control(null, [Validators.minLength(4),Validators.pattern("^[0-9]*$" )])
    })
    this.ownersCars.push(addCar)
  }

  deleteCar(car: any, id:number) {
    this.ownersCars.removeAt(id);
  }
}
