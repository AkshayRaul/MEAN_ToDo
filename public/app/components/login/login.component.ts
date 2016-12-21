import {Component, OnInit, EventEmitter, PipeTransform, Pipe} from '@angular/core';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Component({
    moduleId:module.id,
    selector: 'log',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    data :data;
      constructor() {
        this.data={
          Username:"",
          Password:""
        }
     }
       ngOnInit() {

     }
}
export interface data{
  Username:string,
  Password:string
}
