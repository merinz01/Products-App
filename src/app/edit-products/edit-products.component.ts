import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductModel } from '../product-list/product.model';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  title:string = "Edit Product";

public updateProduct: ProductModel;


  constructor(private productService: ProductService,
              private router: Router,
              private actRoute: ActivatedRoute) { }
 

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.showProduct(id);
  }

  showProduct(id){
    this.productService.showProduct(id)
    .subscribe((data)=>{
     this.updateProduct=JSON.parse(JSON.stringify(data))
  })
  }

  editProducts()
  {
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log('called product with id :'+ id);

    if (window.confirm('Are you sure?')) {
    this.productService.editProduct(id,this.updateProduct)
    .subscribe((data)=>{
    this.router.navigate(['/']);
    console.log('Content updated successfully!' + data);
    alert('Product Updated successfully!!');

    }),(err)=>{console.log(err)}
  }
}
}
