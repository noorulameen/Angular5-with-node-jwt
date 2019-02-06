import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CoinService } from './coin.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    
  declarations: [
    AppComponent,
    IndexComponent,
    CreateComponent,
    EditComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule
  ],
  providers: [CoinService],
  bootstrap: [AppComponent]
})

export class AppModule { }
