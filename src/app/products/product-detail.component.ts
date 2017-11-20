import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageHelper } from '../shared/localStorageHelper';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Detalle del plato seleccionado';
  errorMessage: string;
  product: IProduct;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,public _localStorageHelper: LocalStorageHelper) {
  }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.getProduct(id);
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }
  Pedido():void {
    var clients  =   this._localStorageHelper.getObject('clients');
    
        if(clients==null){
            alert("Debe estar logueado");
            this._router.navigate(['clients/']);
        }else{
           
            alert("Agregado al carrito");
            
        }
    
   
       
 

}



}
