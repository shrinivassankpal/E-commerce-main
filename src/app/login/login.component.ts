import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
frmdata:any;


constructor(private rout:Router , private toaster:ToastrService , private api:ApiService){}
ngOnInit(): void {
this.frmdata=new FormGroup({
username : new FormControl("" ,Validators.required),
password : new FormControl ("" , Validators.required)
})
}
login(data:any){
if(data.username== "admin" && data.password == "password"){
this.rout.navigate(['/admin']);
this.toaster.success("Successfully logined", "Success");
localStorage.setItem("user","admin");

}
else{
  this.toaster.error("Please enter valid username and password", "Error");

}

}
}
