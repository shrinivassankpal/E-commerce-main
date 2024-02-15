import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  frmdata:any;
  id:any;
constructor(private api:ApiService ,private toster:ToastrService ,private router:ActivatedRoute){
  this.id=router.snapshot.paramMap.get("id");


}
  ngOnInit(): void {
    this.frmdata = new FormGroup(
      {
        name: new FormControl("",Validators.required),
        price: new FormControl("",Validators.min(1)),
        mrp : new FormControl("",Validators.required),
        avatar: new FormControl("",Validators.required),
        category: new FormControl("" , Validators.required),
        des: new FormControl("" , Validators.required),
        IsValid : new FormControl("")
      }
    )

    if(this.id !=null){
      this.api.get("products/"  +  this.id).subscribe((res:any)=>{
        this.frmdata.patchValue({
          name: res.name,
          price: res.price,
          mrp : res.mrp,
          avatar: res.avatar,
          category: res.category,
          des: res.des,
          IsValid : res.IsValid
        })
      })
    }
  }

save(data:any){
  if(this.id !=  null){
    this.api.put("products/" + this.id,data).subscribe(()=>{
      this.toster.success("product Updated successfully","Success");
    })
  }
else{
  this.api.post("products" , data).subscribe(()=>{
    this.toster.success("product added successfully","Success");
  })
}

}
}
