import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { SERVER_URL } from './config';
import 'rxjs/Rx';

let TimeURL = SERVER_URL + '/time';

@Injectable()
export class TimeService {
    headers = new Headers();

    constructor(
        public http: Http
    ){
        this.http = http;
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    logTime(data){
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('time_tracked', data.seconds);
        urlSearchParams.append('time_tracked_formatted', data.time_tracked_formatted);
        urlSearchParams.append('description', data.description);
        let body = urlSearchParams.toString();

        return this.http.post(
            TimeURL+'/log_time',
            body,
            {
                withCredentials : false,
                headers: this.headers
            })
            .map(res => res.json())
            .toPromise();
    }
}