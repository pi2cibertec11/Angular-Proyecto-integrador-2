import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IClient } from './client';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { LocalStorageHelper} from '../shared/localStorageHelper';


@Injectable()
export class ClientService {
    clients: IClient;
    headers: Headers;
    options: RequestOptions;
    
    private _clienttUrl0="http://localhost:4268/api/clientes/login";
    private _clienttUrl = "http://localhost:4268/api/clientes/regclientes";
    private _clientUrl2 ="http://localhost:4268/api/clientes/ActualizarClientes";
    
    constructor(private _http: Http,private _localStorageHelper : LocalStorageHelper) {
        console.log("clients service");
        var clients  =   this._localStorageHelper.getObject('clients');
        console.log("clients",clients);
    }
    getClientes() {
        return this.clients;
    }
 
   
     postClients(clients: IClient) {
        return this._http.post(this._clienttUrl, clients)

            .map((Response: Response) => <Boolean>Response.json())

            
    }

    putClientes(clients:IClient){
        return this._http.put(this._clientUrl2,clients)
        .map((Response:Response)=><Boolean> Response.json())
    }


    LoginClients(clients: IClient): Observable<IClient> {
        var body={
            Email:clients.Email,
            Password:clients.Password
        };
        var request = this._http.post(this._clienttUrl0,body);
        return request.map((response:Response)=><IClient>response.json())
        .do(data=>this.clients=data)
        .catch(this.handleError);
        
               
    }                       
    private handleError(error: Response) {


        console.log("error", error);
        return Observable.throw(error.json().error || "server error");
    }


    logout(): void {
        
        this.clients = null;
        this._localStorageHelper.removeItem('clients');
        this._localStorageHelper.removeItem('arreglo');
        this._localStorageHelper.removeItem('tarjeta');
    }


   
}