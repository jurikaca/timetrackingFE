import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from './../providers/config';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

    dtOptions: DataTables.Settings = {};

    constructor(){}

    ngOnInit() {
        this.dtOptions = {
            ajax: SERVER_URL + '/time/get_time',
            columns: [{
                title: 'ID',
                data: 'id'
            }, {
                title: 'Start Date',
                data: 'start_date'
            }, {
                title: 'Time Tracked',
                data: 'time_tracked_formatted'
            }, {
                title: 'Description',
                data: 'description'
            }]
        };
    }
}
