import {Component, OnInit, EventEmitter, PipeTransform, Pipe} from '@angular/core';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {RequestOptions} from "@angular/http";
import {Headers} from "@angular/http";
import {Output} from "@angular/core";
import {Input} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {RegService} from '../../services/register/register.service';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value:any, args:string[]) : any {
    let keys:any = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
@Component({
    moduleId:module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
      data : data;
      constructor(private registerService:RegService) {

     }
       ngOnInit() {
        this.data={
          Username:"",
          Email_id:"",
          Password:""
        }
     }
     register(data:data){

     }
}
export interface data{
 Username : string,
 Email_id : string,
 Password :string
}
