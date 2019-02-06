import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
      { path: 'create', 
        component: CreateComponent 
      },
      {
        path: 'edit/:id',
        component: EditComponent
      },
      { path: 'index',
        component: IndexComponent
      }
                        
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
