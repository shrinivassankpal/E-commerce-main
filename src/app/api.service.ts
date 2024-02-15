import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private count =new BehaviorSubject(0);
  countvalue = this.count.asObservable();



url="https://6423f0add6152a4d4802a635.mockapi.io/BCA/V/";

  constructor(private http:HttpClient) { }

get(path:any){
 return this.http.get(this.url + path);
}
post(path:any,data:any){
  return this.http.post(this.url+path,data);
}
del(path:any){
  return this.http.delete(this.url +path);
}
put(path:any,data:any){
  return this.http.put(this.url+path,data);
}


 updatecount(cartqty:any){
  this.count.next(cartqty);
 }


 
}
