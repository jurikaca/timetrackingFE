import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    seconds: number = 0;
    time_tracked: string = '00:00:00';
    is_started: boolean = false;
    is_running: boolean = false;
    is_paused: boolean = false;
    intervalID: any;

    constructor(){}

    ngOnInit(){
        //this.timerId = this.st.subscribe('1sec', () => this.callback());
    }

    startTimer(){
      this.is_started = true;
      this.is_running = true;
        this.intervalID = setInterval(() => {
            this.callback();
        },1000);
    }

    pauseTimer(){
        clearInterval(this.intervalID);
        this.is_paused = true;
        this.is_running = false;
    }

    resumeTimer(){
        this.is_paused = false;
        this.is_running = true;
        this.intervalID = setInterval(() => {
            this.callback();
        },1000);
    }

    stopTimer(){
        clearInterval(this.intervalID);
        document.getElementById('openModalButton').click();
    }

    saveTime(){
        this.resetTimer();
    }

    resetTimer(){
        this.is_paused = false;
        this.is_running = false;
        this.is_started = false;
        this.seconds = 0;
        this.time_tracked = '00:00:00';
    }

    callback() {
        this.seconds++;
        this.formatTime();
    }

    formatTime(){
        let sec_num = parseInt(this.seconds, 10);
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        this.time_tracked = hours+':'+minutes+':'+seconds;
    }
}
