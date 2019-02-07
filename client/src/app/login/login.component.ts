import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    model: any = {};
    loading = false;
    error = '';

  constructor(
          private router: Router,
          private authenticationService: AuthenticationService
          
  ) { }

  ngOnInit() {
   // reset login status
     // this.authenticationService.logout();
  }
  
  
  login() {
      this.loading = true;
      console.log('aaaaa',this.model)
      
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(result => {
              if (result === true) {
                  this.router.navigate(['/index']);
              } else {
                  this.error = 'Username or password is incorrect';
                  this.loading = false;
              }
          });
  }

}
