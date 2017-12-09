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
    fecha:Date = new Date;
    boletas:IBoleta ;


    constructor(private _productService:ProductService){
        
    }
    sumar():number{
        this.totalf = 0;

        this.boleta.forEach((e:any) => {
            this.totalf = this.totalf + Number(e.total);
        });
        console.log("algo",this.boleta)
       return this.totalf;

    }
    filtrar1(){
        
        this.boletas.fechabol=this.fecha;
        this.filtrar();
        
        this.sumar();
        
        console.log("fecha",this.fecha);
        console.log("fecha",this.boletas.fechabol);
    }

    filtrar(){


        this._productService.getBoletasFiltro(this.boletas)
     .subscribe(reporte => {
        this.boleta = reporte;
        console.log("cd",this.boleta);
        
    },
        error => this.errorMessage = <any>error);
        console.log("ef",this.errorMessage)
    }


    ngOnInit(): void {
       
        this.boletas=<IBoleta>{
            fechabol:new Date(this.fecha),
        }

        this._productService.getBoleta()
                .subscribe(reporte => {
                    this.boleta = reporte;
                    this.sumar();
                    console.log("a",this.boleta);
                },
                    error => this.errorMessage = <any>error);

                    
                    console.log("b",this.errorMessage)
                   
    }
}
