import { Component } from '@angular/core';
import { TimeService } from './providers/time-service';
import { ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    seconds:        number = 0; // store seconds tracked by timer
    time_tracked:   string = '00:00:00'; // time tracked displayed on time format, variable to show real time the timer
    is_started:     boolean = false; // true if timer has started
    is_running:     boolean = false; // true if timer is running
    is_paused:      boolean = false; // true if timer is paused
    is_stopped:     boolean = false; // true if timer is stopped
    intervalID:     any; // variable to store setInterval function

    time_hours:     number = 0; // time on hours when logging time without timer
    time_logged:    string = '00:00:00'; // time format to show on modal when logging time
    description:    string = ''; // description of time logged
    free_time_log:  boolean = false; // true if user is loggin time without timer

    constructor(
        private _timeService: TimeService,
        private toasterService: ToasterService
    ){}

    /**
     * function to set interval for measuring seconds
     *
     * @returns {NodeJS.Timer}
     */
    initInterval() : any{
        return setInterval(() => {
            this.seconds++;
            this.time_tracked = this.formatTime(this.seconds);
        },1000);
    }

    /**
     * function to start timer
     */
    startTimer(){
        this.is_started = true;
        this.is_running = true;
        this.intervalID = this.initInterval();
    }

    /**
     * function to pause timer
     */
    pauseTimer(){
        if(this.is_paused === false){
            clearInterval(this.intervalID);
            this.is_paused = true;
            this.is_running = false;
        }
    }

    /**
     * function to resume timer if paused
     */
    resumeTimer(){
        if(this.is_paused === true){
            this.is_paused = false;
            this.is_running = true;
            this.intervalID = this.initInterval();
        }
    }

    /**
     * function to stop timer
     */
    stopTimer(){
        if(this.is_stopped === false){
            this.is_stopped = true;
            clearInterval(this.intervalID);
            this.logTrackedTime();
        }
    }

    /**
     * function to open modal for logging tracked time
     */
    logTrackedTime(){
        this.free_time_log = false;
        this.description = '';
        document.getElementById('openModalButton').click();
        this.time_logged = this.time_tracked;
    }

    /**
     * function to open modal for logging time without tracking it
     */
    logFreeTime(){
        this.time_hours = 0;
        this.free_time_log = true;
        this.time_logged = '00:00:00';
        this.description = '';
        document.getElementById('openModalButton').click();
    }

    /**
     * function to log time, post data to server for storing time logged
     */
    saveTime(){
        let seconds = this.free_time_log === true ? Math.round(this.time_hours * 3600) : this.seconds;
        this._timeService.logTime(
            {
                seconds                 :   seconds,
                time_tracked_formatted  :   this.formatTime(seconds),
                description             :   this.description
            }
        ).then(response => {
            if(response.success){
                this.resetTimer();
                document.getElementById('close').click();
                this.toasterService.pop('success', 'Success', response.msg);
            }else{
                console.log(response);
            }
        });
    }

    /**
     * function to reset timer and all related properties
     */
    resetTimer(){
        this.is_paused = false;
        this.is_running = false;
        this.is_started = false;
        this.is_stopped = false;
        this.seconds = 0;
        this.time_tracked = '00:00:00';
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
}
