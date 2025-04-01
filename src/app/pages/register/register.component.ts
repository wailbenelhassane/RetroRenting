import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() imageURL: string = 'assets/images/login.jpg';
  @Input() logoURL: string = 'assets/images/logo.png';
}
