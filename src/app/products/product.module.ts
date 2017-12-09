import { NgModule } from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {PopupModule} from 'ng2-opd-popup';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductGuardService } from './product-guard.service';
import { ProductService } from './product.service';
import { SharedModule } from './../shared/shared.module';
import {ProductRegComponent} from './product-reg.component';
import {ClienteGuard} from '../clients/client.guard';
import {ProductModComponent} from './product-mod.component';
import {ProductCarroComponent} from './product-carro.component';
import {ReporteComponent} from './reporte.component';


@NgModule({
  imports: [
    PopupModule.forRoot(),
    RouterModule.forChild([
        { path: 'products', component: ProductListComponent },
        { path: 'reporte', component: ReporteComponent },
       
        { path: 'productmod', component: ProductModComponent },
        { path: 'productcarro', component: ProductCarroComponent },
        { path: 'productsreg', component: ProductRegComponent, canActivate:[ClienteGuard] },
        { path: 'products/:id',
          canActivate: [ ProductGuardService ],
          component: ProductDetailComponent }
    ]),
    SharedModule
  ],

  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductModComponent,
    ReporteComponent,
    
    ProductCarroComponent,
    ConvertToSpacesPipe,
    ProductRegComponent
  ],
  providers: [
    ProductService,
    ProductGuardService,
    ClienteGuard
  ]
})
export class ProductModule { }
