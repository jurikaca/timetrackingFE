import { Component, OnInit } from '@angular/core';
import { TimeService } from './../providers/time-service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

    loader:         boolean = false; // boolean value whether to show loader or not
    search:         string = ''; // search value
    start:          number = 0; // start value to paginate items on table
    limit:          number = 10; // number of items to show per page
    items_length:   number = 0; // total items length loaded from server
    pagination:     any = []; // array to store pagination buttons logic
    times_logged:   any; // table data loaded from server
    order:          any; // order object to use when columns get click

    constructor(
        private _timeService: TimeService
    ){
        this.order = {
            field   : 'id', // the field to order
            asc     : false // order type
        };
    }

    ngOnInit() {
        this.initTable();
    }

    /**
     * function to get table data from server
     */
    loadRecords(){
        let params = {};
        params['start'] = this.start;
        params['limit'] = this.limit;
        if(this.order.field != ''){
            params['field'] = this.order.field;
            params['asc'] = this.order.asc;
        }
        if(this.search != ''){
            params['search'] = this.search;
        }
        this.loader = true;
        this._timeService.getTime(params).then(response => {
            this.loader = false;
            this.items_length = response.items_length;
            this.times_logged = response.data;
            this.paginate();
        });

    }

    /**
     * function to order table items
     *
     * @param field, the field to order
     */
    orderTable(field){
        if(this.order.field == field){
            this.order.asc = !this.order.asc;
        }else{
            this.order.asc = false;
        }
        this.order.field = field;
        this.loadRecords();
    }

    /**
     * function to initialize table
      */
    initTable(){
        this.start = 0;
        this.limit = 10;
        this.loadRecords();
    }

    /**
     * function to navigate on next page
     */
    goNext(){
        if(this.start + this.limit < this.items_length){
            this.start += this.limit;
            this.loadRecords();
        }
    }

    /**
     * function to navigate on previous page
     */
    goPrev(){
        if(this.start >= this.limit){
            this.start -= this.limit;
            this.loadRecords();
        }
    }

    /**
     * function to navigate on a page
     * @param page_num, page number to navigate
     */
    goToPage(page_num){
        this.start = this.limit * page_num;
        this.loadRecords();
    }

    /**
     * function to create paginations array for loading pagination buttons
     */
    paginate(){
        this.pagination = [];
        if(this.items_length > this.limit){
            for(let i=0; i<this.items_length; i += this.limit){
                this.pagination.push({
                    selected : this.start == i ? true : false,
                });
            }
        }
    }

    /**
     * function to round a number to bigest value
     *
     * @param value, number to round
     * @returns {number}
     */
    round(value){
        return Math.ceil(value);
    }
}
