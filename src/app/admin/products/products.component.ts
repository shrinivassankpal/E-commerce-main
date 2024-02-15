import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  pddata:any;
  constructor(private api:ApiService , private toster:ToastrService){

  }
  ngOnInit(): void {
this.load();
  }
load(){
  this.api.get("products").subscribe((res:any)=>{
    this.pddata=res;
  })
}
  del(id:any){

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
        this.api.del("products/" + id).subscribe((res:any)=>{
          this.toster.success("Successfully Product Deleted " , "Deleted");
          this.load();
        })

    }


      })

  }
}
