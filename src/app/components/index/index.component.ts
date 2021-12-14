import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent {

  constructor(private router: Router) {}

  public options: AnimationOptions = {
    path: 'assets/youbike.json',
  };

  public animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

  public navigateTo(page: string): void {
    this.router.navigate([page]);
  }

}
