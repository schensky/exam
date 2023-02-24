import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
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
    console.log(request.method.toUpperCase(), request.url)
    console.log(request.method+' request: ', request.body)

    for(let el of urls) {
      if(request.url.includes(el.url+'/')){
        const responseBody = this.changeResDependOnReqMethod(el, request)

        if(!responseBody) break;

        console.log(request.method+' response:', responseBody)
        console.log('---------------------------------------------------')

        return of(new HttpResponse(
          request.method === 'DELETE'
            ? {status: 204 }
            : {status: 200, body: responseBody }
        ))
      }
    }
    return next.handle(request)
  }

  changeResDependOnReqMethod(el: IMockDataEl<AnimalEvent>, request: HttpRequest<unknown>): IResponse<AnimalEvent> | AnimalEvent | undefined {
    const qParams: CrudUrlQuery = this.urlParserService.getMethodAndId(request.url, el.url)
    const reqData = request.body as AnimalEvent

    if(!qParams){
      return undefined
    }

    if(qParams.method === 'create') {
      const newItemId = this.arrayHelperService.findMaxValueInObjArray(el.response.result, 'eventId')
      el.response.result.unshift({...reqData, ...{eventId: newItemId+1}})

      return {...reqData, ...{eventId: newItemId+1}}
    }else if(qParams.method === 'update' && qParams.id) {
      el.response.result =  el.response.result.map(ev => {
        if(ev.eventId === qParams.id){
          ev = {...ev, ...reqData}
        }

        return ev;
      })

      return el.response.result.find(ev => ev.eventId === qParams.id);
    }else if(qParams.method === 'delete' && qParams.id) {
      el.response.result =  el.response.result.filter(ev => ev.eventId !== qParams.id)

      return {} as AnimalEvent
    }else if(qParams.method === 'get') {
      if(qParams.id){
        el.response.result =  el.response.result.filter(ev => ev.eventId === qParams.id)
      }

      return el.response
    }else{
      return undefined
    }
  }


}
