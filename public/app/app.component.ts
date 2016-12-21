import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {RegService} from './services/register/register.service';

//=====================================ROOT COMPONENT===========================================
@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: `app.component.html` ,
    providers:[RegService],

})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}
