import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import { environment } from './src/environment/environtment-pru';

export abstract class IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}

export function applicationHttpClientCreator(http: HttpClient): HttpBaseService {
    return new HttpBaseService(http);
}

@Injectable()
export class HttpBaseService {

    // private api = SERVER_URL;
    private api= environment.api;

    public constructor(public http: HttpClient) {
    }

  
}
