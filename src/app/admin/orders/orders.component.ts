import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order:any;

  constructor(private api:ApiService){}

  ngOnInit(): void {
this.api.get("orders").subscribe((res:any)=>{
  this.order=res;
})
  }

}
