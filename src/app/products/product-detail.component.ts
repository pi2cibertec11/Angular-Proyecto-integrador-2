import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../clients/client.service';
import { LocalStorageHelper } from '../shared/localStorageHelper';
import { IProduct } from './product';
import { ProductService } from './product.service';
import {IClient} from '../clients/client';


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Detalle del plato seleccionado';
  errorMessage: string;
  product: IProduct;
  clients:IClient;
   oldItems = JSON.parse(localStorage.getItem('arreglo')) || [];
  
  arregloDeProductos : IProduct[]= [];


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,public _localStorageHelper: LocalStorageHelper, private _clienteService:ClientService) {
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
          
          //var wd=this._localStorageHelper.saveObject('platos',this.product);
          
          this.oldItems.push(this.product);
          
         // console.log("platos",wd);
      
          
          this._localStorageHelper.saveObject('arreglo',this.oldItems);
          
      
          
         
          this._router.navigate(['productcarro/']);
            alert("Agregado al carrito");
            
        }
 

}

modificar(){
  const id = +this._route.snapshot.paramMap.get('id');
  this.getProduct(id);
  this._localStorageHelper.saveObject('platos',this.product);
  console.log("plato",id)
  this._router.navigate(['productmod/']);
}

esAdministrador():boolean{
  this.clients=this._clienteService.getClientes();
  var esAdmin=false;
  if(this.clients!=null){
      esAdmin=this.clients.esAdmin;
  }return esAdmin;
}


}
