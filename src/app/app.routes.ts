import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';


export const routes: Routes = [
    {path:'', component:AuthLayoutComponent,children:[
        {path:'',redirectTo:"signin",pathMatch:'full'},
{path:'signup',component:SignupComponent},
{path:'signin',component:SigninComponent},
    ]},
    {path:'', component:MainLayoutComponent,children:[
        {path:'',redirectTo:"home",pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'categories',component:CategoriesComponent},
        {path:'brands',component:BrandsComponent},
        {path:'products',component:ProductsComponent},
        {path:'cart',component:CartComponent},
        {path:'orders',component:OrdersComponent},
    ]},
    {path:'**',component:NotfoundComponent},
];
