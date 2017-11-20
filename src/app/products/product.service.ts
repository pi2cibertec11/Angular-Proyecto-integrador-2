import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';



@Injectable()
export class ProductService {
    private _productUrl = "http://localhost:4268/api/platos/listarplatos";
    private _productUrl1 = "http://localhost:4268/api/platos/regplatos";

    constructor(private _http: Http) {

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct[]>response.json())
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.platoId === id))
    }

    private handleError(error: Response) {

        console.log("error", error);
        return Observable.throw(error.json().error || "server error");
    }

    regProducts(products: IProduct): Observable<Boolean> {
        return this._http.post(this._productUrl1, products)

            .map((Response: Response) => <Boolean>Response.json())


    }

}
