import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmailValidatorService } from '../services/email-validator.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  /* email validations */

  /* FormControl - is a class provided by Angular's Reactive Forms module. It represents a single input field in a form. */
  // Tip: Empty string on a FormControl parameter mean the initial value is empty
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', Validators.required);
  message = new FormControl('', Validators.required);

  errorMessage: string = '';
  nameRequiredMessage: string = '';
  messageRequired: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private emailValidator: EmailValidatorService
  ) {
    this.Observablefunc();
  }

  /* checking if the the input email has a value and it's valid */
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  /* function of 2 same function for checking error */

  errorInputFunc = (type: string) => {
    switch (type) {
      case 'name':
        if (this.name.hasError('required')) {
          this.nameRequiredMessage = 'You must enter a name';
        } else {
          this.nameRequiredMessage = '';
        }
        break;
      case 'message':
        if (this.message.hasError('required')) {
          this.messageRequired = 'You must enter a message';
        } else {
          this.messageRequired = '';
        }
        break;
    }
  };

  /* function that will called to check the input if has a valid or a value */

  Observablefunc = () => {
    /* Merge - is merging different behaviors into one */
    /* Pipe - allows you to modify data of the observable while subscribe will just let you use the data */
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    this.name.valueChanges.subscribe(() => this.errorInputFunc('name'));
    this.message.valueChanges.subscribe(() => this.errorInputFunc('message'));
  };

  /* ---------------------submitting the form  ------------------------*/

  data: any;

  messageForm = this.formBuilder.group({
    fullName: this.name,
    email: this.email,
    fullMessage: this.message,
  });
  onSubmit = (): void => {
    if (this.messageForm.valid) {
      this.emailValidator.getEmail(
        this.messageForm.value.email ? this.messageForm.value.email : ''
      );
      this.apiData();
    } else {
    }
    /* this.messageForm.reset(); */
  };

  apiData = (): void => {
    this.emailValidator.getApiData().subscribe((data) => {
      this.data = data.is_valid_format.value;
      console.log(this.data);
    });
  };
}
