import {Component, OnInit, EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {RequestOptions} from "@angular/http";
import {Headers} from "@angular/http";
import {Output} from "@angular/core";
import {Input} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

//================================= TASK SERVICE===============================================

@Injectable()
export class TaskService{
    tasks:any;

    constructor(private _http:Http){

    }
    ngOnInit(){

    }

    getTasks():Observable<Task[]>{

        return this._http.get('/api/tasks')
        .map(response => response.json());

    }
    addTask(task:Task){

      return this._http.post('/api/task/', task).map(response => {
       response.json();

      });
    }
    updateTask(task:Task){
      console.log(task);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
     return this._http.put('/api/tasks/'+task._id,JSON.stringify(task),options).map(response => {
        response.json(),
          ()=>console.log(response);
      });
    }

    deleteTask(task:Task){
    console.log(task.title);
    return this._http.delete('/api/task/'+task._id).map(response => {
    response.json();
  });
  }

}

/* getMashape(){

 let headers = new Headers({ 'Content-Type': 'application/json' });
 headers.append('X-Mashape-Key',`j6hkn5tpRcmshrp51a7Bx227HiI6p1LYIcajsn9ArkOuuEyNd2`);
 headers.append("Accept", "application/json");
 let body=JSON.stringify({"search":"Axis"});
 let options = new RequestOptions({ headers: headers });
 return this._http.post('https://mutualfundsnav.p.mashape.com/',body,options)
 .map(response => response.json());
 }*/

//===================================NEW TASK COMPONENT=============================================


@Component({
    selector: 'new-task',
    inputs:[],
    template: `
    <h4>Create Task</h4>
    <form class="form-inline" style="padding:5px;width: 100%;" (submit)="onSubmit()">
    <div class="form-group">
      
    <input class="form-control" [(ngModel)]="task.id" placeholder="ID" name="task.id">
    </div>
    <div class="form-group">
      
    <input class="form-control" [(ngModel)]="task.title" placeholder="Task Title" name="task.title">
    </div>
    
    <input type="submit" class="btn btn-default">
    </form>
    `


})
export class NewTaskComponent implements OnInit {

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  task:any;
    constructor(public taskService:TaskService) {
      this.task={title:"",id:""};
     }

    ngOnInit() {
    }

    onSubmit(){

        this.taskService.addTask(this.task).subscribe(task => {
          console.log(task);
          this.task={title:"",id:""}
        });
      this.notify.emit("Newtask");
    }


}
//==================================TASK LIST COMPONENT==============================================


@Component({
    selector: 'tasks',
    template: `<h2>Task List Application</h2>
            <new-task (notify)="onNotify($event)"></new-task>
            
            <ul class="list-group">
              
                <li class ="list-group-item"*ngFor="let task of tasks">
                <span *ngIf="task.complete" style="text-decoration:line-through;">{{task.title}}</span>
                <span *ngIf="!
                task.complete" >{{task.title}}</span>

                <input class="btn btn-info pull-right inpbtn" style="padding:5px" type="button" value="Completed!" (click)="completedTask(task)">

                <input class="btn btn-danger pull-right inpbtn" style="padding:5px"type="button" value ="Delete" (click)="removeTask(task)">
                
                </li>
               
            </ul>
            
    `,
    styles:[`.completed{
        text-decoration:line-through;
        color:red;
           }
           .inpbtn{
           padding: 3px 3px 3px 3px;
           }
`]

})
export class TasksComponent implements OnInit {
    tasks:Task[];
    task:Task;
    toggle:boolean=true;
    constructor(private taskService:TaskService) {
        this.taskService.getTasks().subscribe(tasks =>{
            this.tasks=tasks;

        });

     }


    ngOnInit() {
      this.getTasks();


  }


  getTasks(){
      this.taskService.getTasks().subscribe(
        // the first argument is a function which runs on success
        data => { this.tasks = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => console.log('done loading tasks')
      );

    }
    removeTask(task:Task){
     // console.log(task);
      this.taskService.deleteTask(task).subscribe(response =>{
        this.getTasks();
        return true;
      });
    }
    onNotify(message :string):void
    {
      this.getTasks();
    }
    completedTask(task:Task)
    {
      this.task=task;
      this.task.complete=task.complete?false:true;

      this.taskService.updateTask(this.task).subscribe(response =>{
        this.getTasks();
        return true;
      });
    }

}

/* getMashape(){
 this.taskService.getMashape().subscribe(
 // the first argument is a function which runs on success
 data => { this.mashape = data},
 // the second argument is a function which runs on error
 err => console.error(err),
 // the third argument is a function which runs on completion
 () => console.log('done loading mashape')
 );

 }*/
//=====================================EDIT COMPONENT===========================================
@Component({
  selector: 'edit',
  template: `<h1>Edit</h1>
<ul class="list-group">
              
                
               
                <li class ="list-group-item"*ngFor="let task of tasks">
                 <form class="form-inline" (submit)="onSubmit(task)">
                <div class="form-group">
                  
                <input value="{{task.id}}" [(ngModel)]="task.id" placeholder="ID" name="task.id">
                </div>
                <div class="form-group">
                  
                <input value="{{task.title}}" [(ngModel)]="task.title" placeholder="Task Title" name="task.title">
                </div>
                
                <input type="submit" value="Update" class="btn btn-default">
                
                </form>
                </li>
                
               
            </ul>
    
`
})

export class EditComponent implements OnInit{
  tasks:Task[];
  constructor(private taskService:TaskService) {
    this.taskService.getTasks().subscribe(tasks =>{
      this.tasks=tasks,
        ()=>console.log(tasks)
    });


  }
  ngOnInit() {
    this.getTasks();
  }
  getTasks(){
     this.taskService.getTasks().subscribe(
       (data) => { this.tasks = data},
       (err:Response) => console.error(err),
      () => console.log(this.tasks)
    );

  }
  onSubmit(task:Task){
    this.taskService.updateTask(task).subscribe(response =>{
      this.getTasks();
      return true;
    });
  }

}
//=====================================ROOT COMPONENT===========================================
@Component({
    selector: 'my-app',
    templateUrl: `app/app.component.html` ,
    providers:[TaskService],
    styleUrls : ['bower_components/bootstrap/dist/css/bootstrap-theme.css']
})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}

export interface Task{
    _id:string,
    title:string,
    id:number,
    complete:boolean
}
