import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
//import { includeHTML, fetchJSON, setMultipleImages } from "./main.js";
//import { cleanAllInputs, showErrors, validateAllFieldsForm } from "./utils/validationForm.js";
//import { processLogin } from "./services/authService.js";

// Interfaces
interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginData {
  [key: string]: any;
}

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() imageURL: string = 'assets/images/login.jpg';
  @Input() logoURL: string = 'assets/images/logo.png';

  /*constructor() {
    this.initializeComponent();
  }

  private async initializeComponent(): Promise<void> {
    await includeHTML();
    await this.loadImages();
    this.validateForm();
  }

  private async loadImages(): Promise<void> {
    const loginData: LoginData | null = await fetchJSON<LoginData>("../public/data-json/loginContent.json");
    if (loginData) {
      setMultipleImages(loginData);
    } else {
      console.error("No login data found.");
    }
  }

  private validateForm(): void {
    const loginForm = document.getElementById("login-form") as HTMLFormElement;

    loginForm.addEventListener("submit", (event: Event): void => {
      event.preventDefault();

      cleanAllInputs("login-form");

      const errors: string[] = validateAllFieldsForm();
      showErrors(errors, "login-form");

      if (errors.length > 0) {
        return;
      }

      const password = document.getElementById("password") as HTMLInputElement;
      const username = document.getElementById("username") as HTMLInputElement;

      const credentials: LoginCredentials = {
        username: username.value,
        password: password.value
      };

      processLogin(credentials, password);
    });
  }*/
}
