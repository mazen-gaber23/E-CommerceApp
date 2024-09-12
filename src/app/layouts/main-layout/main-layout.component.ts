import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
goToTop(){
  window.scrollTo(0,0);
}
showBtn:boolean=false;
@HostListener('window:scroll') scrolledToTop(){
  let scrollTop=document.documentElement.scrollTop;
  if(scrollTop>500){
    this.showBtn=true;
  }
  else{
    this.showBtn=false;

  }
}
}
