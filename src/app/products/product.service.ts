import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import {IBoleta} from './boleta';
import {IDBoleta} from './detalleboleta';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';



@Injectable()
export class ProductService {
    private _productUrl = "http://localhost:4268/api/platos/listarplatos";
    private _productUrl1 = "http://localhost:4268/api/platos/regplatos";
    private _productUrl3="http://localhost:4268/api/platos/actualizarPlatos";
        private _productUrl4="http://localhost:4268/api/boleta/regboleta";
        private _productUrl5="http://localhost:4268/api/detalleboleta/regboleta";
        private _productUrl6="http://localhost:4268/api/detalleboleta/numero";

        private _productUrl7="http://localhost:4268/api/boleta/ListarBoleta";
        private _productUrl8="http://localhost:4268/api/boleta/ListarBoleta2";
    constructor(private _http: Http) {

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct[]>response.json())
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getBoleta(): Observable<IBoleta[]> {
        return this._http.get(this._productUrl7)
            .map((response: Response) => <IBoleta[]>response.json())
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getNumero() {
        return this._http.get(this._productUrl6)
            .map((response: Response) => response.json())
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.platoId === id))
    }

    getBoletasFiltro(fecha: Date): Observable<IBoleta> {
        return this._http.get(this._productUrl8)
        .map((response: Response) => <IBoleta[]>response.json())
        //.do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }
    private handleError(error: Response) {

        console.log("error", error);
        return Observable.throw(error.json().error || "server error");
    }

    regProducts(products: IProduct): Observable<Boolean> {
        return this._http.post(this._productUrl1, products)

            .map((Response: Response) => <Boolean>Response.json())


    }
    regPed(boleta: IBoleta): Observable<Boolean> {
        return this._http.post(this._productUrl4, boleta)

            .map((Response: Response) => <Boolean>Response.json())


    }

    regDetPed(detalleboleta: IDBoleta): Observable<Boolean> {
        return this._http.post(this._productUrl5, detalleboleta)

            .map((Response: Response) => <Boolean>Response.json())


    }
    modProducts(products: IProduct): Observable<Boolean> {
        return this._http.put(this._productUrl3, products)

            .map((Response: Response) => <Boolean>Response.json())


    }

}
