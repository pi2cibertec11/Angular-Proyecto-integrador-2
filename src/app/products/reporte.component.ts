import { Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router'
import { IProduct } from './product';
import {ProductService} from './product.service';
import { LocalStorageHelper } from '../shared/localStorageHelper';
import {IBoleta} from './boleta';
import {IDBoleta} from './detalleboleta';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './reporte.component.html',
    styleUrls: ['./product-list.component.css'],
    providers:[ProductService]
    
})
export class ReporteComponent implements OnInit {
    pageTitle: string = 'Reporte de ventas';
   
    errorMessage: string;
    productos:IProduct;
    pro2: any[];
    totalf:number;
    boleta:IBoleta []=[];
    detalleboleta:IDBoleta;
    numero:number;
    fecha:Date ;
    boletas:IBoleta ;


    constructor(private _productService:ProductService){
        
    }

    filtrar(){

     this._productService.getBoletasFiltro(this.fecha)
     .subscribe(reporte => {
        this.boletas = reporte;
        console.log("cd",this.boletas);
        
    },
        error => this.errorMessage = <any>error);
        console.log("ef",this.errorMessage)
    }


    ngOnInit(): void {
      

        this._productService.getBoleta()
                .subscribe(reporte => {
                    this.boleta = reporte;
                    console.log("a",this.boleta);
                },
                    error => this.errorMessage = <any>error);

                    
                    console.log("b",this.errorMessage)
    }
}
