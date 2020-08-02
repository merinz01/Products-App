import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registeredUser = {username:"",email:"",password:""};


  constructor(private _user:AuthService,private _router:Router) { }

  registerUser()
  {
    this._user.registerUser(this.registeredUser)
    .subscribe(
      res=>{
        console.log(this.registeredUser);
      // localStorage.setItem('token',res["token"]),
      this._router.navigate(['/login'])
      },
      err => console.log(err)
    )
  }



  ngOnInit(): void {
  }

}
