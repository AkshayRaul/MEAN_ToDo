import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent,TasksComponent,NewTaskComponent,EditComponent}  from './app.component';

const appRoutes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'edit', component: EditComponent },

];

@NgModule({
  imports:      [ BrowserModule ,FormsModule,HttpModule,RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent ,TasksComponent,NewTaskComponent,EditComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
