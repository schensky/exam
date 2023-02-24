import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../../interceptors/mock-data/mock-data.interceptor";
import {BirthEvent, IBirthEvent} from "../../classes/BirthEvent";
import {BreedingEvent, IBreedingEvent} from "../../classes/BreedingEvent";
import {CalvingEvent, ICalvingEvent} from "../../classes/CalvingEvent";
import {ChangeGroupEvent, IChangeGroupEvent} from "../../classes/ChangeGroupEvent";
import {DistressEvent, IDistressEvent} from "../../classes/DistressEvent";
import {DryOffEvent} from "../../classes/DryOffEvent";
import {HerdEntryEvent, IHerdEntryEvent} from "../../classes/HerdEntryEvent";
import {ISystemHealthEvent, SystemHealthEvent} from "../../classes/SystemHealthEvent";
import {ISystemHeatEvent, SystemHeatEvent} from "../../classes/SystemHeatEvent";
import {EventBasic} from "../../classes/EventBasic";

export interface ICrud<T> {
  create(data: T): Observable<T>
  get(id: number): Observable<T>
  getAll(): Observable<IResponse<T>>
  update(id: number, data: fieldObj): Observable<T>
  delete(id: number): Observable<null>
}

export interface IBuildingEventStructure {
  type: string
  model: any
}

export type fieldObj = { [key: string]: string | number | boolean }

export type CowEvent = IBirthEvent | IBreedingEvent | ICalvingEvent | IChangeGroupEvent | IDistressEvent | DryOffEvent | IHerdEntryEvent | ISystemHealthEvent | ISystemHeatEvent
export type AnimalEvent = CowEvent // | SheepEvent

@Injectable({
  providedIn: 'root'
})
export class CowEventService implements ICrud<CowEvent> {
  private readonly apiUrl = '/api/events/cow';

  public readonly fullEventList: IBuildingEventStructure[] = [
    {type: 'birth', model: BirthEvent },
    {type: 'breeding', model: BreedingEvent },
    {type: 'calving', model: CalvingEvent },
    {type: 'changeGroup', model: ChangeGroupEvent },
    {type: 'distress', model: DistressEvent },
    {type: 'dryOff', model: DryOffEvent },
    {type: 'herdEntry', model: HerdEntryEvent },
    {type: 'systemHealth', model: SystemHealthEvent },
    {type: 'systemHeat', model: SystemHeatEvent }
  ]

  constructor(
    private http: HttpClient
  ) {

  }

  create(data: CowEvent): Observable<CowEvent> {
    return this.http.post<CowEvent>(`${this.apiUrl}/create`, data)
      .pipe(catchError(error => {
        // handle errors
        return throwError(error)
      }))
  }

  getAll(): Observable<IResponse<CowEvent>> {
    return this.http.get<IResponse<CowEvent>>(`${this.apiUrl}/get`)
      .pipe(catchError(error => {
        // handle errors
        return throwError(error)
      }))
  }

  get(id: number): Observable<CowEvent> {
    return this.http.get<CowEvent>(`${this.apiUrl}/get/${id}`)
      .pipe(catchError(error => {
        // handle errors
        return throwError(error)
      }))
  }

  update(id: number, data: fieldObj): Observable<CowEvent> {
    return this.http.put<CowEvent>(`${this.apiUrl}/update/${id}`, data)
      .pipe(catchError(error => {
        // handle errors
        return throwError(error)
      }))
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/delete/${id}`)
      .pipe(catchError(error => {
        // handle errors
        return throwError(error)
      }))
  }

  getCommonEventFields(): string[] {
    return Object.getOwnPropertyNames(new EventBasic);
  }
}
