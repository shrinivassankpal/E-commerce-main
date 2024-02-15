import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
info:any;
  id:any;
  qty =1;
  cart = new Array;
  prdct:any;



  constructor( private api:ApiService ,private rout:ActivatedRoute , private router:Router, private toastr: ToastrService ){

    this.id=rout.snapshot.paramMap.get("id");
    //alert(this.id);

  }

  ngOnInit(): void {

    this.api.get("/products/" + this.id).subscribe((result:any)=>{
      this.info=result;

    });


  }



min(){
if(this.qty>1){
  this.qty-=1;
}
}
plus(){
  this.qty+=1;


}
addtocart(){
  let obj = {id:this.info.id, name:this.info.name, avatar:this.info.avatar, price:this.info.price, qty:this.qty };

  this.cart = JSON.parse(localStorage.getItem("products") || "[]");


 let prdadd=false;
   for(let i =1;i<this.cart.length;i++){
     if(this.cart[i].id==obj.id){
       prdadd=true;
       alert("Product already in cart");
       break;
     }

   }
   if(!prdadd){
     this.cart.push(obj);
   localStorage.setItem("products", JSON.stringify(this.cart));

    this.toastr.success('Product Successfully added to cart' , 'Success');
    this.api.updatecount(this.cart.length);
    


   }
   else{
    this.toastr.error("Product Already Added To Cart", "Error");
   }

}


}
