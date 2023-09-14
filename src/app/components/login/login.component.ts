import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { userCredentials } from 'src/app/models/auth/user-credentials';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/shared/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public userCredentials!: userCredentials;
  public errors: string[] = []

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
    })
  }

  public logIn() {
    this.userCredentials = { ...this.userCredentials, ...this.loginForm.value };
    this.authService.login(this.userCredentials).subscribe(response => {
      this.authService.saveToken(response);
      this.router.navigate(['items'])
    }, error => this.errors = parseWebAPIErrors(error));

  }

}
