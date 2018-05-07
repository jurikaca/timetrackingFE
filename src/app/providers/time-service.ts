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

    /**
     * post data to server, save time logged on db
     *
     * @param data
     * @returns {Promise<any>}
     */
    logTime(data){
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('time_tracked', data.seconds);
        urlSearchParams.append('date_finished', data.date_finished);
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

    /**
     * get logged times data to show on table
     *
     * @param data, order, filter values
     * @returns {Promise<any>}
     */
    getTime(data){
        let query = '?';
        for(let key in data){
            query += key + '=' + data[key] + '&';
        }
        return this.http.get(
            TimeURL+'/get_time' + query,
            {
                withCredentials : false
            })
            .map(res => res.json())
            .toPromise();
    }

    /**
     * function to format seconds on time format 'HH:ii:ss'
     *
     * @param seconds, integer ex. 34
     * @returns {string}, format 'HH:ii:ss'
     */
    formatTime(seconds_input) : string{
        let hours   = Math.floor(seconds_input / 3600);
        let minutes = Math.floor((seconds_input - (hours * 3600)) / 60);
        let seconds = seconds_input - (hours * 3600) - (minutes * 60);
        let time_tracked = '';

        if (hours < 10) {
            time_tracked += "0"+hours.toFixed(0)+":";
        }else{
            time_tracked += hours.toFixed(0)+":";
        }
        if (minutes < 10) {
            time_tracked += "0"+minutes.toFixed(0)+":";
        }else{
            time_tracked += minutes.toFixed(0)+":";
        }
        if (seconds < 10) {
            time_tracked += "0"+seconds.toFixed(0);
        }else{
            time_tracked += seconds.toFixed(0);
        }
        return time_tracked;
    }

    /**
     * function to generate actual date and time 'yyyy-mm-dd hh:ii'
     *
     * @returns {string}
     */
    formatDate(date_input){
        date_input = new Date(date_input);
        var dd = date_input.getDate();
        var mm = date_input.getMonth()+1; //January is 0!
        var hh = date_input.getHours();
        var ii = date_input.getMinutes();

        var yyyy = date_input.getFullYear();
        var date = ''+yyyy+'-';
        if(mm<10){
            date += '0'+mm+'-';
        }else{
            date += mm+'-';
        }
        if(dd<10){
            date += '0'+dd+' ';
        }else{
            date += dd+' ';
        }
        if(hh<10){
            date += '0'+hh+':';
        }else{
            date += hh+':';
        }
        if(ii<10){
            date += '0'+ii;
        }else{
            date += ii;
        }
        return date;
    }
}