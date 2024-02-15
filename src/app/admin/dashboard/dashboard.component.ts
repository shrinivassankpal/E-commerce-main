import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
prdcts=new Array();
no=0;
no1:number=0;

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.get("products").subscribe((res:any)=>{
      this.prdcts=res;


    })
    this.anim();
  }



  anim(){
   let a= setInterval(()=>{
        this.no++;
        if(this.no==195){
          clearInterval(a);
        }
      },10);

      let b= setInterval(()=>{
        this.no1++;
        if(this.no1==this.prdcts.length){
          clearInterval(b);
        }

      },100);

  }

}
