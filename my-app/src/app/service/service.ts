import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {Owner} from "../model/model";



@Injectable({
  providedIn: 'root',
})
export class ICarOwnersService {
  dataSubject$ = new BehaviorSubject<boolean>(false)
  owners:Observable<Owner[]> = new Observable<Owner[]>();

  private ownersUrl = 'api/owners/'

  constructor(private http: HttpClient) {
  }

  getOwnerById(ownerId:number){
    return this.http.get<any[]>(this.ownersUrl + ownerId)
  }

  getOwners(): Observable<any> {
   this.owners = this.http.get<any[]>(this.ownersUrl).pipe(
      retry(2),
      catchError((err) => {
        return throwError(err)
      })
    )
    return this.owners;
  }

  deleteOwner(idOwner: number): Observable<any> {
    return this.http.delete(this.ownersUrl + idOwner)
  }

  editOwner(owner: Owner, ownerId:number){
    return this.http.put(this.ownersUrl + ownerId,owner)
  }
  createOwner(owner: Owner) {
    return this.http.post(this.ownersUrl, owner).pipe(
      retry(2),
      catchError((err) =>{
        return throwError(err)
      } )
    )
  }

}
