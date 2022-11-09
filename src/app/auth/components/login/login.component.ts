import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig, MessageService } from 'primeng/api';

import { LoginRequestModel } from '../../models/auth.model';
import { ApiControlService } from '../../services/api-control.service';
import { generateLoginUser } from '../../utils/generate.util';
import { parseJwt } from '../../utils/parse-token.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private apiControlService: ApiControlService,
    private router: Router,
    public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  public onSubmit(): void {
    const loginUser: LoginRequestModel = generateLoginUser(
      this.loginForm.value,
    );

    this.apiControlService.loginIn(loginUser).subscribe((res) => {
      this.apiControlService.getUser(parseJwt(res.token).userId).subscribe();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successful login!',
        life: 5000,
      });
      setTimeout(() => {
        this.router.navigate(['boards']);
      }, 2000);
    });
  }

  private initializeForm(): void {
    this.loginForm = new FormGroup({
      loginInput: new FormControl('', [Validators.required]),
      passwordInput: new FormControl('', [Validators.required]),
    });
  }
}
