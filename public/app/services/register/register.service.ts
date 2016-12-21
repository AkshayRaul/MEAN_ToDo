import {Component, OnInit, EventEmitter, PipeTransform, Pipe} from '@angular/core';
import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Http} from '@angular/http';
import {data} from '../../components/register/register.component';
@Injectable()
export class RegService{
    User:data;

    constructor(private _http:Http){

    }
    ngOnInit(){

    }

    getUsers(){

        return this._http.get('http://ankitesh.pythonanywhere.com/api/v1.0/get_books_data')
        .map(response => response.json());

    }
    regUser(User:data){
    
    let payload=JSON.stringify({payload:{"Username":User.Username,"Email_id":User.Email_id,"Password":User.Password}});
     return this._http.post('http://ankitesh.pythonanywhere.com/api/v1.0/get_book_summary',payload)
        .map(response => response.json());


    }   
    

}
