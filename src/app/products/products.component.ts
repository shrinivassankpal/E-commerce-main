import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  info:any;
  category:any;
  constructor(private api:ApiService , private route:ActivatedRoute){
this.category=route.snapshot.paramMap.get("category");


  }



  ngOnInit(): void {
this.load();

  }

  load(){

  this.api.get("products").subscribe((result:any)=>{
    this.info=result;

    if(this.category != null)
    {
      this.info = result.filter((data:any)=>{
        if(data.category == this.category)
        return data;
      })
    }
  })


  }



}
