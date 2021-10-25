import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const owners = [
      {id: 1, firstName: 'Остап', middleName:'Тарасович', lastName:'Вишня',
        ownersCars : [
          {carNumber: 'BC2020BI', carName:'Volkswagen',carModel:'Golf', carYear: 2000}
        ]
      },
      {id: 2, firstName: 'Андрій', middleName:'Володимирович', lastName:'Груз',
        ownersCars : [
          {carNumber: 'BC2020BI', carName:'Volkswagen',carModel:'Passat', carYear: 2000},
          {carNumber: 'BC2020BI', carName:'Volkswagen',carModel:'Toureg', carYear: 2005}
        ]},
      {id: 3, firstName: 'Сергій', middleName:'Андрійович', lastName:'Бариста',
        ownersCars : [
          {carNumber: 'BC2020BI', carName:'Volkswagen',carModel:'Golf', carYear: 2003},
          {carNumber: 'BC2020BI', carName:'Toyota',carModel:'Camry', carYear: 2010},
          {carNumber: 'BC2020BI', carName:'FORD',carModel:'Focus', carYear: 2014}
        ]},
      {id: 4, firstName: 'Маркіян', middleName:'Романович', lastName:'Мажор',
        ownersCars : [
          {carNumber: 'BC2020BI', carName:'Mazda',carModel:'6', carYear: 2002}
        ]},
    ]
    return {owners};
  }
}
