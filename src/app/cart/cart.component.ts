import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  info:any;
 subtotal=0;
  ngOnInit(): void {
     this.info=JSON.parse(localStorage.getItem("products") || '[]');

 this.total();

  }
  qtychange(){

  /*  let b:any;
 for(let i=0;i<=this.info.length;i++){
  if(i==id){
 b=this.info[i];
    this.info[i]['qty']=b.qty;
    localStorage.setItem("products", JSON.stringify(this.info));
    this.total();
  }
 } */
 localStorage.setItem("products", JSON.stringify(this.info));
 this.total();

  }


  total(){
    /* let mul:any;

    for(let i=0;i<this.info.length;i++){
    mul = this.info[i].price * this.info[i].qty;
    this.subtotal+=mul;
    } */
    this.subtotal=0;
   this.info.map((prd:any)=>{
 this.subtotal+= prd.price * prd.qty;
   });
  }

  del(product:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        const index: number = this.info.indexOf(product);
    if (index !== -1) {
        this.info.splice(index, 1);
    }

        localStorage.setItem("products", JSON.stringify(this.info));
        this.total();
      }
    })
  }
  keycheck(event:any){
    alert(event.keyCode)
    if(event.keyCode==45 || event.keyCode==48){
      return false;
    }
    else{
      return true;
    }
  }
}
