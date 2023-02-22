import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayHelperService {

  constructor() { }

  findMaxValueInObjArray(array: any[], property: string): number | any {
    const obj = array.reduce((prev, current) => {
      return (prev[property] > current[property]) ? prev : current;
    })

    return obj[property];
  }
}
