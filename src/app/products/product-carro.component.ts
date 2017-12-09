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
    templateUrl: './product-carro.component.html',
    styleUrls: ['./product-list.component.css'],
    providers:[ProductService]
    
})

export class ProductCarroComponent implements OnInit {
    pageTitle: string = 'Lista de platillos añadidos al carrito';
    imageWidth: number = 80;
    imageMargin: number = 5;
    showImage: boolean = false;
    errorMessage: string;
    productos:IProduct;
    pro2: any[];
    totalf:number;
    boleta:IBoleta;
    detalleboleta:IDBoleta;
    numero:number;
    

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];



    onRatingClicked(message: string): void {
        this.pageTitle = 'Lista de platos: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
              product.platoNombre.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    
    constructor(private _router: Router,private _productService:ProductService,public _localStorageHelper: LocalStorageHelper){
        var clients  =   this._localStorageHelper.getObject('clients');
        console.log("clients",clients);
    }
    sumar():number{
        this.totalf = 0;

        this.pro2.forEach((e:any) => {
            this.totalf = this.totalf + Number(e.platoprice);
        });
       return this.totalf;
    }

    RegistrarPed(){
        
        let respuesta= this._productService.regPed(this.boleta)
        .subscribe(
         (data)=>{console.log("a",data.valueOf());
         if(data!=false){
         alert(" Registro exitoso");
         console.log("respuesta",data);
         this._router.navigate(['products/']);
         }else{
          alert("Datos incorrectos");
          console.log("respuesta",data);
         }
     }
     
        )
        
       
    }
    RegistrarDetPed(){
        
        let respuesta= this._productService.regDetPed(this.detalleboleta)
        .subscribe(
         (data)=>{console.log("a",data.valueOf());
         if(data!=false){
         alert(" Registro exitoso");
         console.log("respuesta",data);
         this._router.navigate(['products/']);
         }else{
          alert("Datos incorrectos");
          console.log("respuesta",data);
         }
     }
     
        )
        
       
    }


    Registroboleta(){
        try{
           this.RegistrarPed();
           this.RegistroMasivo();
        }catch (Exception){
           alert ("error");
        }
    }

  buscar():number{
    this._productService.getNumero()
    .subscribe(numero => {
        this.numero = numero;
        
    },
        error => this.errorMessage = <any>error);

   return this.numero;
  }

    RegistroMasivo(){
        

        this.pro2.forEach((e:any) => {
            
            this.detalleboleta=<IDBoleta>{

                 idbol:this.numero,
                 platoId:e.platoId,
                 platoNombre:e.platoNombre,
                 platoprice:e.platoprice,
                
             }
             this.RegistrarDetPed();
             console.log("detalle",this.detalleboleta)
          
         });

    }


    ngOnInit(): void {
       
        var nom  =  (this._localStorageHelper.getObject('clients'));
        
        var pro= JSON.stringify(this._localStorageHelper.getObject('arreglo'));
        this.pro2=JSON.parse(pro);
        console.log("arreglo",this.pro2);
        //this._localStorageHelper.removeItem('arreglo');
        this.products=this.pro2;
        this.filteredProducts =this.products;
        this.sumar();
        this.buscar();
        this.boleta=<IBoleta>{
            
            IDCliente:nom["IDCliente"],
            NombreCliente:nom["NombreCliente"],
            total:this.totalf
    
         }
         
         
         
      
         
       // this._productService.getProducts()
             //   .subscribe(products => {
              //      this.products = products;
              //      this.filteredProducts = this.products;
            //    },
            //        error => this.errorMessage = <any>error);
    }


}
