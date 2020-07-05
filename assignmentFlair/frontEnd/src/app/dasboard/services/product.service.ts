import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getProduct(){
    return this.http.get<products[]>(`${config.apiUrl}/product`)
      .pipe(map(data => data),
      );
  }

  public addProduct(product:products):Observable<products>{
    return this.http.post<products>(`${config.apiUrl}/addProduct`,product, {headers:new HttpHeaders({

      'Content-Type':'application/json'
    })}).pipe();

  }
    public delete(id:any){
      //let options = { params: httpParams };

    return this.http.delete(`${config.apiUrl}/delete/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }) 
  }
}
