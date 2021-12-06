import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent {

  public options: AnimationOptions = {
    path: 'assets/youbike.json',
  };

  public animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
