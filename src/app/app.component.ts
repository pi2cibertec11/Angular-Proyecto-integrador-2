import { Component,ChangeDetectorRef} from '@angular/core';
import {ProductService} from './products/product.service';
import {ClientService} from './clients/client.service';
import {IClient} from './clients/client';
import { LocalStorageHelper} from './shared/localStorageHelper';

@Component({
  selector: 'pm-root',
  template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/welcome']">Inicio</a></li>
                    <li><a [routerLink]="['/products']">Lista de Platillos</a></li>
                    <li><a  *ngIf="usuarioLogueado()" [routerLink]="['/clients']">Iniciar Sesión</a></li>
                    <li><a  *ngIf="!usuarioLogueado()"  [routerLink]="['/productcarro']">Ver carrito de compras</a></li>
                    <li><a  *ngIf="esAdministrador()"  [routerLink]="['/productsreg']">Registrar Platillos</a></li>
                    <li><a  *ngIf="!usuarioLogueado()" [routerLink]="['/clientsmod']"> Actualizar Datos </a></li>
                    <li><a  *ngIf="esAdministrador()" [routerLink]="['/reporte']"> Reporte de ventas </a></li>
                </ul>
                <ul class='nav navbar-nav2'>
                <li><a *ngIf="existeUsuario()" style="float:right" [routerLink]="['/clients']" (click)="salir()" >Salir </a></li>
                </ul>
                </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
    `,
    providers: [ProductService]
})
export class AppComponent {
  pageTitle: string = 'Proyecto Integrador 2';

  
 clients:IClient;


  constructor(private _clienteService:ClientService,public _localStorageHelper:LocalStorageHelper){

   
    
  }

  esAdministrador():boolean{
      this.clients=this._clienteService.getClientes();
      var esAdmin=false;
      if(this.clients!=null){
          esAdmin=this.clients.esAdmin;
      }return esAdmin;
  }

  salir():void{
      this._clienteService.logout();

  }

  usuarioLogueado():boolean{
    
    if(this._localStorageHelper.getObject('clients') !=null){
        return false;
    }else{
        
        return true;
    }
    
}
  existeUsuario():boolean{
    
    if(this._localStorageHelper.getObject('clients')!=null){
        return true;
    }else{
        
        return false;
    }  }
  
}