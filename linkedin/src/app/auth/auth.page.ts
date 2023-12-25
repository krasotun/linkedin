import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

type Submission = 'login' | 'join';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form')
  form!: NgForm;

  submissionType: Submission = 'login';

  constructor() {}

  ngOnInit() {}

  onSubmit(): void {
    const { email, password } = this.form.value;
    if (!email || !password) return;

    if (this.submissionType === 'login') {
      console.log(1, 'handle login', email, password);
    } else if ((this.submissionType = 'join')) {
      const { firstName, lastName } = this.form.value;
      if (!firstName || !lastName) return;
      console.log(2, 'handle join', email, password, firstName, lastName);
    }
  }

  toggleText(): void {
    if (this.submissionType === 'login') {
      this.submissionType = 'join';
    } else if ((this.submissionType = 'join')) {
      this.submissionType = 'login';
    }
  }
}
