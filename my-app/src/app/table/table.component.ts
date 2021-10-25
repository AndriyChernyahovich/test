import { Component, OnInit } from '@angular/core';
import {Owner} from "../model/model";
import {ICarOwnersService} from "../service/service";
import { FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  form: FormGroup
  constructor(private service:ICarOwnersService, private modalService: NgbModal) { }
  tableTH = ['№', 'Фамилия','Имя','Отчество', 'Количество авто']
  owners: Owner[] = []

  ngOnInit(): void {

    this.getOwners()
    this.service.dataSubject$.subscribe((res)=> {
      this.getOwners()
    })
  }

  getOwners(){
    this.service.getOwners()
    this.service.getOwners().subscribe(res=> this.owners = res)

    console.log( this.service.owners)
  }



  deleteOwners(owner: Owner) {
    const id = owner.id
    if(id){
      this.service.deleteOwner(id).subscribe(res=> console.log(res))
    }
    this.getOwners()
  }
  createOwners(owner: Owner){
    console.log(owner.firstName)
    }

  openModal(owner:Owner) {
      if (owner.id != null) {
        this.service.getOwnerById(owner.id).subscribe(res => {
         const refModal = this.modalService.open(ModalComponent)
          refModal.componentInstance.owner = res
        })
      }

  }
}
