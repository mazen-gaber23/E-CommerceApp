import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider-banner',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './slider-banner.component.html',
  styleUrl: './slider-banner.component.scss'
})
export class SliderBannerComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    rtl:true,
    autoplay: true,
    autoplayTimeout: 2550,
    slideTransition: 'linear',
    smartSpeed: 2500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 1000,
    navText: [],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

}
