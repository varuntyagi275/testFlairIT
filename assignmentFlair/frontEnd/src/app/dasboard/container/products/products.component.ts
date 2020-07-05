import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { products } from '../../models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
profileForm= new FormGroup({
id:new FormControl(''),
name:new FormControl(''),
});
    constructor(private productList:ProductService) { }
    products:products[]
  ngOnInit(): void {
    this.productList.getProduct().subscribe(data=>{
 
      console.log(data);
      this.products=data;
    } );
   
      }
   

  

  submit(){
   // console.log(this.profileForm.value);
   console.log(this.profileForm.value)
    this.productList.addProduct(this.profileForm.value).subscribe(
      (data:products)=>console.log(data),
    (error:any)=>console.log(error))
      
  }

}
