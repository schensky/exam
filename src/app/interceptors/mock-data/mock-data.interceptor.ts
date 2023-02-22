import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import cowsMockEvents from '../../data/cows-events.json';
import {AnimalEvent} from "../../services/cow-event/cow-event.service";
import {CrudUrlQuery, UrlParserService} from "../../services/url-parser/url-parser.service";
import {ArrayHelperService} from "../../services/array-helper/array-helper.service";

export interface IResponse<T> {
  offset: number
  limit: number
  total: number
  result: T[]
}

interface IMockDataEl<T> {
  url: string
  response: IResponse<T>
}

const urls: IMockDataEl<AnimalEvent>[] = [
  {
    url: '/api/events/cow',
    response: cowsMockEvents as IResponse<AnimalEvent>
  }
];

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {

  constructor(
    private urlParserService: UrlParserService,
    private arrayHelperService: ArrayHelperService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    for(let el of urls) {
      if(request.url.includes(el.url+'/')){
        const responseBody = this.transformResDepOnReqType(el, request)

        if(!responseBody) break;

        return of(new HttpResponse({status: 200, body: responseBody } ))
      }
    }
    return next.handle(request)
  }

  transformResDepOnReqType(el: IMockDataEl<AnimalEvent>, request: HttpRequest<unknown>): IResponse<AnimalEvent> | undefined {
    const qParams: CrudUrlQuery = this.urlParserService.getMethodAndId(request.url, el.url)
    const reqData = request.body as AnimalEvent

    if(!qParams){
      return undefined
    }

    if(qParams.method === 'create') {
      const newItemId = this.arrayHelperService.findMaxValueInObjArray(el.response.result, 'eventId')
      el.response.result.unshift({...reqData, ...{eventId: newItemId}})
      el.response.total++
    }else if(qParams.method === 'update' && qParams.id) {
        el.response.result =  el.response.result.map(ev => {
          if(ev.eventId === qParams.id){
            ev = {...ev, ...reqData}
          }

          return ev;
        })
    }else if(qParams.method === 'delete' && qParams.id) {
      el.response.result =  el.response.result.filter(ev => ev.eventId !== qParams.id)
      el.response.total--
    }else if(qParams.method === 'get') {
      if(qParams.id){
        el.response.result =  el.response.result.filter(ev => ev.eventId === qParams.id)
      }
    }else{
      return undefined
    }


    return el.response
  }


}
