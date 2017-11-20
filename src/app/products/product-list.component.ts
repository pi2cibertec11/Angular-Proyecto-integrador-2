import { Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router'
import { IProduct } from './product';
import {ProductService} from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers:[ProductService]
    
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Lista de platillos';
    imageWidth: number = 80;
    imageMargin: number = 5;
    showImage: boolean = false;
    errorMessage: string;


    

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
    
    constructor(private _productService:ProductService){
        
    }


    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                    error => this.errorMessage = <any>error);
    }
}
