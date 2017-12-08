
import { Component, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { IClient } from './client';
import { ClientService } from './client.service';
import { PasswordValidation } from './client-validation';

@Component({
    templateUrl: './client-reg.component.html',
    providers:[ClientService],
})
export class ClientRegComponent {
    public pageTitle: string = 'Crear Cuenta';
    errorMessage: string;
    form: FormGroup;

    clients: IClient;
    

    
    ngOnInit():void{
       
        this.clients=<IClient>{
            
            NombreCliente:"",
            ApellidosCliente:"",
            Dni:0,           
            Direccion:"",
            TelefonoCliente:0,
            Email:"",
            Password:"", 
            esAdmin:false,    
           
        }
       
    }

constructor(private _clientService:ClientService, fb:FormBuilder,private _router: Router){
    this.form = fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword // your validation method
      })
}

Registrar(){
    
   let respuesta= this._clientService.postClients(this.clients)
   .subscribe((data)=>{console.log("a",data.valueOf());
       if(data!=false){
       alert(" Registro exitoso");
       console.log("respuesta",data);
       this._router.navigate(['clients/']);
       }else{
        alert("Datos incorrectos");
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




