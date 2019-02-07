import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CoinService } from './coin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { FormsModule } from '@angular/forms';




@NgModule({
    
  declarations: [
    AppComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    LoginComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpModule,FormsModule
  ],
  providers: [CoinService,AuthGuard,AuthenticationService,UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
