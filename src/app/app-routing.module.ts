import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [ 
  { path:'',
    redirectTo:'products',
    pathMatch:'full' 
  },
  {
    path:"products",
    component: ProductListComponent,
  }     ,           
  { path:'add',
    component: NewProductComponent,
    canActivate:[AuthGuard]
  },
                       
  { path:'edit/:id',
    component: EditProductsComponent,
    canActivate:[AuthGuard]
   },

  { path:'login',
    component: LoginComponent },

  { path:'register',
    component: RegisterComponent }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
