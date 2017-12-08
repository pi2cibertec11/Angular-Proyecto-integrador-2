import { Component, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { IClient } from './client';
import { ClientService } from './client.service';
import { PasswordValidation } from './client-validation';
import { LocalStorageHelper} from '../shared/localStorageHelper';

@Component({
    templateUrl: './client-mod.component.html',
    providers:[ClientService],
})
export class ClientModComponent {
    public pageTitle: string = 'Modificar Cuenta';
    errorMessage: string;
    form: FormGroup;
    
    clients: IClient;
    

    
    ngOnInit():void{
       
       var clientesw  =  (this._localStorageHelper.getObject('clients'));
      // var clientss=this._localStorageHelper.getItem('clientss');
    
       // console.log("array?",clientesw)
        
        this.clients=<IClient>{
            
            NombreCliente:clientesw["NombreCliente"],
            ApellidosCliente:clientesw["ApellidosCliente"],
            Dni:clientesw["Dni"],           
            Direccion:clientesw["Direccion"],
            TelefonoCliente:clientesw["TelefonoCliente"],
            Email:clientesw["Email"],
            Password:clientesw["Password"] 
              
           
        }
       
    }

constructor(private _clientService:ClientService, fb:FormBuilder,private _router: Router,private _localStorageHelper : LocalStorageHelper){
    this.form = fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword // your validation method
      })
}

Modificar2(){
    
   let respuesta= this._clientService.postClients(this.clients)
   .subscribe((data:boolean)=>{
       if(data=true){
       alert(" Actualización exitosa");
       console.log("respuesta",data);
       this._router.navigate(['clients/']);
       }else{
        alert("hubo un error intente de nuevo");
        console.log("respuesta",data);
       }
   })
   
   
}
Modificar(){
    let respuesta= this._clientService.putClientes(this.clients)
    .subscribe((data)=>{console.log("a",data.valueOf());
        if(data!=false){
        alert(" Actualización exitosa por favor ingrese nuevamente");
        console.log("respuesta",data);
        this._localStorageHelper.removeItem('clients');
        this._router.navigate(['clients/']);
        }
        else{
         alert("Lo sentimos ese número de DNI ya se encuentra en uso");
         console.log("respuesta",data);
        }
    })
}
   
Mensaje(){
    console.log('click');
         
}
onSubmit() {
    console.log(this.form);
  }



}



