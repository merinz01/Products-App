import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUri:string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }
  getProducts(){
    let url=`${this.baseUri}/products`
    return this.http.get(url);
  }
  newProduct(item){
    let url = `${this.baseUri}/add`
    return this.http.post(url,{'product':item})
    .subscribe((data)=>{console.log(data)})
  }
  showProduct(id:any){
    let url=`${this.baseUri}/edit/${id}`
    return this.http.get(url)
    // .subscribe((data)=>{console.log(data)})
  }
  editProduct(id:any,item){
    let url=`${this.baseUri}/update/${id}`
    return this.http.post(url,item)
    // .subscribe((data)=>{console.log(data)})
  }

  deleteProduct(id:any) {
    let url=`${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers })
  }

  }
  



