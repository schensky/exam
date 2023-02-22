import { Injectable } from '@angular/core';

interface ICrudUrlQuery {
  method: string
  id: number | undefined
}

export type CrudUrlQuery = ICrudUrlQuery | undefined

@Injectable({
  providedIn: 'root'
})
export class UrlParserService {

  constructor() { }

  /*
   *
   *   get 'Method'(update) and 'Id'(34719) from urls like:
   *   /api/events/cow/update/34719
   *
   */
  getMethodAndId(url: string, apiUrl: string): CrudUrlQuery {
    let reQParams = new RegExp(`${apiUrl}\/(\\w+)\/?(\\d+)?$`)
    let reQParamsRes = url.match(reQParams)

    if(!reQParamsRes || reQParamsRes.length < 2) return undefined

    return {
      method: (reQParamsRes[1] ? reQParamsRes[1] : ''),
      id: (reQParamsRes[2] ? +reQParamsRes[2] : undefined),
    } as ICrudUrlQuery;
  }
}
