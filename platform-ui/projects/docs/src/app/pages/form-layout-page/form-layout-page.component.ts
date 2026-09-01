import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CardComponent,
  ButtonComponent,
  LabelComponent,
  PuiInputComponent,
  PuiPasswordInputComponent,
  PuiSelectComponent,
  PuiRadioGroupComponent,
  PuiCheckboxComponent,
  PuiTextareaComponent,
  PuiSwitchComponent,
  PuiMultiSelectComponent,
  PuiComboboxComponent,
  PuiDatepickerComponent,
  SelectOption,
  RadioOption,
} from '@bhairab-patra/platform-ui';
import type { MultiSelectOption, ComboboxOption } from '@bhairab-patra/platform-ui';
import { DocPageComponent } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

const COUNTRY_OPTIONS: SelectOption[] = [
  { label: 'India', value: 'in' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
];

const GENDER_OPTIONS: RadioOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const INTEREST_OPTIONS: MultiSelectOption[] = [
  { label: 'Loans', value: 'loans' },
  { label: 'Leasing', value: 'leasing' },
  { label: 'Insurance', value: 'insurance' },
  { label: 'Investments', value: 'investments' },
  { label: 'Credit Cards', value: 'credit-cards' },
];

const CONTACT_METHOD_OPTIONS: ComboboxOption[] = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'SMS', value: 'sms' },
  { label: 'WhatsApp', value: 'whatsapp' },
];

type FileTab = 'ts' | 'html' | 'scss';

@Component({
  selector: 'docs-form-layout-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    ReactiveFormsModule,
    CardComponent,
    ButtonComponent,
    LabelComponent,
    PuiInputComponent,
    PuiPasswordInputComponent,
    PuiSelectComponent,
    PuiRadioGroupComponent,
    PuiCheckboxComponent,
    PuiTextareaComponent,
    PuiSwitchComponent,
    PuiMultiSelectComponent,
    PuiComboboxComponent,
    PuiDatepickerComponent,
    DocPageComponent,
    CodeBlockComponent,
  ],
  templateUrl: './form-layout-page.component.html',
  styleUrls: ['./form-layout-page.component.scss'],
})
export class FormLayoutPageComponent {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  countryOptions = COUNTRY_OPTIONS;
  genderOptions = GENDER_OPTIONS;
  interestOptions = INTEREST_OPTIONS;
  contactMethodOptions = CONTACT_METHOD_OPTIONS;

  submitted = false;
  lastSubmitted = '';

  form: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    // Password strength errors come from pui-lib-password-input's own
    // NG_VALIDATORS (minLength/requireUpper/requireNumber), wired
    // automatically via formControlName — no need to duplicate it here.
    password: ['', Validators.required],
    dob: [null as Date | null],
    gender: ['', Validators.required],
    country: ['', Validators.required],
    interests: [[] as (string | number)[]],
    contactMethod: ['' as string | number | null],
    bio: [''],
    subscribe: [false],
    acceptTerms: [false, Validators.requiredTrue],
  });

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.lastSubmitted = '';
      this.cdr.markForCheck();
      return;
    }
    this.lastSubmitted = JSON.stringify(this.form.value, null, 2);
    this.cdr.markForCheck();
  }

  onReset(): void {
    this.form.reset({ interests: [], subscribe: false, acceptTerms: false });
    this.submitted = false;
    this.lastSubmitted = '';
    this.cdr.markForCheck();
  }

  getFieldError(field: string, label: string): string {
    const control = this.form.get(field);
    if (!control) return '';
    if (!(control.touched || this.submitted)) return '';
    const errors = control.errors;
    if (!errors) return '';

    if (errors['required']) return `${label} is required.`;
    if (errors['email']) return 'Enter a valid email address.';
    if (typeof errors['passwordStrength'] === 'string') return errors['passwordStrength'];

    const missing: string[] = [];
    if (errors['minlength']) missing.push(`at least ${errors['minlength'].requiredLength} characters`);
    if (errors['maxlength']) missing.push(`at most ${errors['maxlength'].requiredLength} characters`);
    if (missing.length) return `${label} must have ${missing.join(', ')}.`;

    return `${label} is invalid.`;
  }

  activeTab: FileTab = 'ts';
  copied = '';

  setTab(t: FileTab): void {
    this.activeTab = t;
    this.cdr.markForCheck();
  }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  files: Record<FileTab, string> = {
    ts:
      `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CardComponent,
  ButtonComponent,
  PuiInputComponent,
  PuiPasswordInputComponent,
  PuiSelectComponent,
  PuiRadioGroupComponent,
  PuiCheckboxComponent,
  PuiTextareaComponent,
  PuiSwitchComponent,
  PuiMultiSelectComponent,
  PuiComboboxComponent,
  PuiDatepickerComponent,
  LabelComponent,
  SelectOption,
  RadioOption,
} from '@bhairab-patra/platform-ui';
import type { MultiSelectOption } from '@bhairab-patra/platform-ui';
import type { ComboboxOption } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    ButtonComponent,
    PuiInputComponent,
    PuiPasswordInputComponent,
    PuiSelectComponent,
    PuiRadioGroupComponent,
    PuiCheckboxComponent,
    PuiTextareaComponent,
    PuiSwitchComponent,
    PuiMultiSelectComponent,
    PuiComboboxComponent,
    PuiDatepickerComponent,
    LabelComponent,
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent {
  form: FormGroup;

  countryOptions: SelectOption[] = [
    { label: 'India', value: 'in' },
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
  ];

  genderOptions: RadioOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  interestOptions: MultiSelectOption[] = [
    { label: 'Loans', value: 'loans' },
    { label: 'Leasing', value: 'leasing' },
    { label: 'Insurance', value: 'insurance' },
    { label: 'Investments', value: 'investments' },
    { label: 'Credit Cards', value: 'credit-cards' },
  ];

  contactMethodOptions: ComboboxOption[] = [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'SMS', value: 'sms' },
    { label: 'WhatsApp', value: 'whatsapp' },
  ];

  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // passwordStrength errors now come from pui-lib-password-input's own
      // NG_VALIDATORS (minLength/requireUpper/requireNumber), wired
      // automatically via formControlName — no need to duplicate it here.
      password: ['', Validators.required],
      dob: [null as Date | null],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      interests: [[] as (string | number)[]],
      contactMethod: ['' as string | number | null],
      bio: [''],
      subscribe: [false],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Customer Details form is invalid:', this.form.value);
      return;
    }
    console.log('Customer Details submitted:', this.form.value);
  }

  getFieldError(field: string, label: string): string {
    const control = this.form.get(field);
    if (!control) return '';
    if (!(control.touched || this.submitted)) return '';
    const errors = control.errors;
    if (!errors) return '';

    if (errors['required']) return \`\${label} is required.\`;
    if (errors['email']) return 'Enter a valid email address.';
    if (typeof errors['passwordStrength'] === 'string')
      return errors['passwordStrength'];

    const missing: string[] = [];
    if (errors['minlength'])
      missing.push(\`at least \${errors['minlength'].requiredLength} characters\`);
    if (errors['maxlength'])
      missing.push(\`at most \${errors['maxlength'].requiredLength} characters\`);
    if (errors['lettersOnly'])
      missing.push('letters only (no numbers, symbols, or spaces)');
    if (errors['noNumbers'] && !errors['lettersOnly'])
      missing.push('no numbers');
    if (errors['noSpaces'] && !errors['lettersOnly']) missing.push('no spaces');
    if (errors['textCase'] === 'upper') missing.push('uppercase letters only');
    if (errors['textCase'] === 'lower') missing.push('lowercase letters only');
    if (missing.length) return \`\${label} must have \${missing.join(', ')}.\`;

    if (errors['pattern']) return \`\${label} format is invalid.\`;

    return \`\${label} is invalid.\`;
  }
}`,

    html:
      `<pui-lib-card>
  <div card-header class="form-title">Customer Details</div>

  <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="field">
      <pui-lib-label text="Full Name" [required]="true"></pui-lib-label>
      <pui-lib-input
        placeholder="Enter full name"
        formControlName="fullName"
        [required]="true"
        [clearable]="true"
        [error]="getFieldError('fullName', 'Full Name')">
      </pui-lib-input>
    </div>

    <div class="field">
      <pui-lib-label text="Email" [required]="true"></pui-lib-label>
      <pui-lib-input
        type="email"
        placeholder="you@example.com"
        formControlName="email"
        [required]="true"
        [error]="getFieldError('email', 'Email')">
      </pui-lib-input>
    </div>

    <div class="field">
      <pui-lib-label
        text="Password"
        [required]="true"
        [showInfo]="true"
        info="At least 8 characters, one uppercase letter and one number."
        infoPosition="right">
      </pui-lib-label>
      <pui-lib-password-input
        placeholder="Enter password"
        formControlName="password"
        [showStrength]="true"
        [showRules]="true"
        [minLength]="10"
        [requireUpper]="true"
        [requireNumber]="true"
        [copyable]="true"
        [error]="getFieldError('password', 'Password')">
      </pui-lib-password-input>
    </div>

    <div class="field">
      <pui-lib-label text="Date of Birth"></pui-lib-label>
      <pui-lib-datepicker
        placeholder="Select date of birth"
        formControlName="dob"
        [clearable]="true">
      </pui-lib-datepicker>
    </div>

    <div class="field">
      <pui-lib-label text="Gender" [required]="true"></pui-lib-label>
      <pui-lib-radio-group
        [options]="genderOptions"
        formControlName="gender"
        [error]="getFieldError('gender', 'Gender')">
      </pui-lib-radio-group>
    </div>

    <div class="field">
      <pui-lib-label text="Country" [required]="true"></pui-lib-label>
      <pui-lib-select
        placeholder="Select country"
        [options]="countryOptions"
        formControlName="country"
        [error]="getFieldError('country', 'Country')">
      </pui-lib-select>
    </div>

    <div class="field">
      <pui-lib-label
        text="Areas of Interest"
        [showInfo]="true"
        info="You can select more than one option."
        infoPosition="right">
      </pui-lib-label>
      <pui-lib-multiselect
        placeholder="Select interests…"
        [options]="interestOptions"
        formControlName="interests">
      </pui-lib-multiselect>
    </div>

    <div class="field">
      <pui-lib-label text="Preferred Contact Method"></pui-lib-label>
      <pui-lib-combobox
        placeholder="Select or type…"
        [options]="contactMethodOptions"
        formControlName="contactMethod">
      </pui-lib-combobox>
    </div>

    <div class="field">
      <pui-lib-label text="Bio / Notes"></pui-lib-label>
      <pui-lib-textarea
        placeholder="Tell us a bit about yourself…"
        formControlName="bio">
      </pui-lib-textarea>
    </div>

    <pui-lib-switch label="Subscribe to newsletter" formControlName="subscribe"></pui-lib-switch>

    <pui-lib-checkbox
      label="I accept the terms and conditions"
      formControlName="acceptTerms"
      [error]="getFieldError('acceptTerms', 'Accepting the terms')">
    </pui-lib-checkbox>

    <div class="form-actions">
      <pui-lib-button variant="primary" size="md" type="button" label="Submit" (buttonClick)="onSubmit()"></pui-lib-button>
      <pui-lib-button variant="ghost" type="button" label="Reset" (buttonClick)="form.reset()"></pui-lib-button>
    </div>

    <p class="form-msg form-msg--error" *ngIf="submitted && form.invalid">
      Please fill all required fields correctly.
    </p>
    <p class="form-msg form-msg--success" *ngIf="submitted && form.valid">
      Submitted — check the browser console for the captured values.
    </p>
  </form>
</pui-lib-card>`,

    scss:
      `.form-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--pui-neutral-900);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.form-msg {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.form-msg--error {
  color: var(--pui-error);
}

.form-msg--success {
  color: var(--pui-success-dark);
}`,
  };
}
