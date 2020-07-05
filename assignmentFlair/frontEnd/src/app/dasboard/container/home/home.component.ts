import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { products } from '../../models/products.model'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product:any
  products:products[]
  constructor(private auth:AuthService, private router:Router, private productList:ProductService) { }
  showFiller = false;

  ngOnInit(): void {
this.productList.getProduct().subscribe(data=>{
 
    console.log(data);
    this.products=data;
  } );
 
    }

    delete(id){
      console.log(id);
      this.productList.delete(id).subscribe(res=>console.log(res));


    }



  logOut(){
    this.auth.logout().subscribe(success=>{
      if(success){
        this.router.navigate(['/login']);
      }
    });
  }

}
