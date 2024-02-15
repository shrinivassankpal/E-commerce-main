import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
no=0;

  constructor(private api:ApiService){
    this.api.countvalue.subscribe((result:any)=>{
      this.no=result;


    })
  }
  ngOnInit(): void {
    if(localStorage.getItem("products")!=null){
      let count=JSON.parse(localStorage.getItem("products")|| '[]');
      this.no=count.length;
    }


  }

}
