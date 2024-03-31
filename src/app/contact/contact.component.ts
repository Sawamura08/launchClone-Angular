import { Component, NgModule } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmailValidatorService } from '../services/email-validator.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnDestroy {
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
    private emailValidator: EmailValidatorService,
    private cdr: ChangeDetectorRef
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

  // for loading
  loadingWrapper: boolean = true;
  invalid: boolean = false;
  lodingCardText = 'loading';
  valid: boolean = false;

  /* ! - is for setting that this vairable will be not null or undefined  */
  /* note that Subscription is needed for ngDestroy */
  apiSubscription!: Subscription;
  loading: boolean = false;

  messageForm = this.formBuilder.group({
    fullName: this.name,
    email: this.email,
    fullMessage: this.message,
  });
  onSubmit = (): void => {
    // check if the email is valid
    if (this.messageForm.valid) {
      this.emailValidator.getEmail(
        this.messageForm.value.email ? this.messageForm.value.email : ''
      );

      this.sendEmail();
    } else {
    }
    /* this.messageForm.reset(); */
  };

  // function for getting the data of API
  apiData = () => {
    // return promise is needed for me to use the await since the promise must return a value that the promise is resolve or rejected
    return new Promise((resolve, reject) => {
      this.apiSubscription = this.emailValidator.getApiData().subscribe({
        next: (data) => {
          this.data = data.deliverability;
          this.isEmailValid(this.data);
          resolve('solve');
        },
        error: (error) => {
          console.log(error);
          reject('Email is Invalid');
        },
      });
    });
  };

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }

  // async will be called to run the loading then call the apidata then wait until it finished then call the finally;
  async sendEmail() {
    try {
      this.loading = true;
      const result = await this.apiData();

      // checking if the result in promise is resolve or rejected
      if (result === 'solve') {
        console.log('goods');
      } else {
        console.log('blee');
      }
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      window.location.reload();
    }
  }

  isEmailValid = (type: string) => {
    this.loadingWrapper = false;
    if (type === 'DELIVERABLE') {
      this.valid = true;
      this.lodingCardText = 'Email is valid!';
    } else {
      this.invalid = true;
      this.lodingCardText = 'Email is Invalid!';
    }
  };
}
