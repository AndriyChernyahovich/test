import {Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  openModal() {
        const refModal = this.modalService.open(ModalComponent)
        refModal.componentInstance.addOwner = true;
  }


}
