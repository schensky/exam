import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../../interceptors/mock-data/mock-data.interceptor";

export interface ICrud<T> {
  get(id?: number): Observable<IResponse<T>>
  create(data: T): Observable<IResponse<T>>
  update(id: number, data: T): Observable<IResponse<T>>
  delete(id: number): Observable<IResponse<T>>
}

export interface ICowEventBasic {
  eventId?: number
  cowId: number
  animalId: string
  type: string
  startDateTime: number
  reportingDateTime: number
  lactationNumber: number
  deletable: boolean
  daysInLactation: number
  ageInDays: number
}

export interface ICowHealthEvent extends ICowEventBasic {
  ageInDays: number
  endDate: number | null
  healthIndex: number
  minValueDateTime: number
}

export interface ICowAlertEvent extends ICowEventBasic{
  alertType: string
  daysInPregnancy: number
  duration: number
  endDateTime: number | null
  originalStartDateTime: number | null
}

export interface ICowHeatEvent extends ICowEventBasic {
  heatIndexPeak: number
}

export interface ICowGroupEvent extends ICowEventBasic {
  currentGroupId: number
  currentGroupName: string | null
  newGroupId: number | null
  newGroupName: string
}

export interface ICowDestinationEvent extends ICowEventBasic {
  cowEntryStatus: string
  destinationGroup: number
  destinationGroupName: string | null
}

export interface ICowBirthdayEvent extends ICowEventBasic {
  birthDateCalculated: boolean
}

export type CowEvent = ICowHealthEvent | ICowAlertEvent | ICowHeatEvent | ICowGroupEvent | ICowDestinationEvent | ICowBirthdayEvent

export type AnimalEvent = CowEvent // | SheepEvent

@Injectable({
  providedIn: 'root'
})
export class CowEventService implements ICrud<CowEvent> {
  private apiUrl = '/api/events/cow';

  constructor(
    private http: HttpClient
  ) { }

  create(data: CowEvent): Observable<IResponse<CowEvent>> {
    console.log('PUT', `${this.apiUrl}/create`, data);
    return this.http.put<IResponse<CowEvent>>(`${this.apiUrl}/create`, data)
  }

  get(id?: number): Observable<IResponse<CowEvent>> {
    console.log('GET', `${this.apiUrl}/get${id ? '/'+id : ''}`);
    return this.http.get<IResponse<CowEvent>>(`${this.apiUrl}/get${id ? '/'+id : ''}`)
  }

  update(id: number, data: CowEvent): Observable<IResponse<CowEvent>> {
    console.log('POST', `${this.apiUrl}/update/${id}`, data);
    return this.http.post<IResponse<CowEvent>>(`${this.apiUrl}/update/${id}`, data)
  }

  delete(id: number): Observable<IResponse<CowEvent>> {
    console.log('DELETE', `${this.apiUrl}/delete/${id}`);
    return this.http.delete<IResponse<CowEvent>>(`${this.apiUrl}/delete/${id}`)
  }
}
