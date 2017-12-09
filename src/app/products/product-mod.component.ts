import { Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router'
import { IProduct } from './product';
import {ProductService} from './product.service';
import { LocalStorageHelper} from '../shared/localStorageHelper';

@Component({
    templateUrl: './product-mod.component.html',
  
    providers:[ProductService]
    
})
export class ProductModComponent{
    products:IProduct;
    ngOnInit():void{
        var platos  =  (this._localStorageHelper.getObject('platos'));
        this.products=<IProduct>{
           
            platoNombre:platos["platoNombre"],
            platodescrip: platos["platodescrip"],
            platoprice: platos["platoprice"],
            imageUrl: platos["imageUrl"],
        }
    }
    
    constructor(private _localStorageHelper : LocalStorageHelper,private _productService:ProductService,private _router: Router){
    
    }
    Modificar(){
        
        let respuesta= this._productService.modProducts(this.products)
        .subscribe(
         (data)=>{console.log("a",data.valueOf());
         if(data!=false){
         alert(" Actualizacion exitosa");
         console.log("respuesta",data);
         this._router.navigate(['products/']);
         }else{
          alert("Se produjo un error intentelo nuevamente");
          console.log("respuesta",data);
         }
     }
     
        )
        
       
    }
    
    }