import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
 declare var Razorpay:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  finaldata:any;
  subtotal=0;
  frmdata:any;
  orderarr=new Array();
  orderobj:any;
  id:any;
   options = {
    "key": "rzp_live_Ay9af2dQeUH8A6", // Enter the Key ID generated from the Dashboard
    "amount": "200", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Footwear", //your business name
    "description": "Ecommerce website",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",

    "handler": function (response:any){
      var event=new CustomEvent('payment.success', {detail :response, bubbles:true, cancelable:true});
      window.dispatchEvent(event);
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature)
    },
    "prefill": {
        "name": "vinayak morbale", //your customer's name
        "email": "vmorbale70@gmail.com",
        "contact": "8378874169"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
constructor(private api:ApiService){

}
  ngOnInit(): void {
    this.finaldata=JSON.parse(localStorage.getItem('products') ||  '[]');
    this.total();
    this.frmdata= new FormGroup({
      name:new FormControl("",Validators.required),
      address:new FormControl("",Validators.required),
      city:new FormControl("",Validators.required),
      state:new FormControl("",Validators.required),
      zipcode:new FormControl("",Validators.required),
      email:new FormControl("",Validators.required),
      mono:new FormControl("",Validators.required)
    })


  }

  total(){
    this.subtotal=0;
    this.finaldata.map((prd:any)=>{
      this.subtotal+=prd.price*prd.qty;
    })
  }
  orderplace(){
    this.orderobj ={...this.frmdata.value ,products:this.finaldata , total:this.subtotal ,status:"unpaid"};
    ///console.log(this.orderobj.name,this.orderobj.email,this.orderobj.mono);

    //this.orderarr.push(this.orderobj);
    this.api.post("orders" ,this.orderobj).subscribe((res:any)=>{
      this.id=res.id;
      //payment
      this.options.amount = "200";//(this.total * 100).toString();
    this.options.prefill.name = this.orderobj.name;
    this.options.prefill.email = this.orderobj.email;
    this.options.prefill.contact = this.orderobj.mono;

    var razorpay = new Razorpay(this.options);
    razorpay.open();
    razorpay.on('payment.failed',(response:any)=>{

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'payment faild',
        showConfirmButton: false,
        timer: 1500
      })

    });
  })


  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event:any):void{
  console.log("Payment Received");
  this.api.put("/orders/"+ this.id,{...this.orderobj,status:"paid"}).subscribe((result:any)=>{
  console.log("Status Updated");
  console.log(result);
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your Order successfully Placed',
    showConfirmButton: false,
    timer: 1500

  })
  localStorage.removeItem("products");
   })
  }

}
