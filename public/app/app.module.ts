import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent}  from './app.component';
import { NavbarComponent}  from './components/navbar/navbar.component';
import { FooterComponent}  from './components/footer/footer.component';
import { RegisterComponent,KeysPipe}  from './components/register/register.component';
import { LoginComponent}  from './components/login/login.component';

const appRoutes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
 

];

@NgModule({
  imports:      [ BrowserModule ,FormsModule,HttpModule,RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent,RegisterComponent,KeysPipe,NavbarComponent,FooterComponent,LoginComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
