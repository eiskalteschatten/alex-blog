import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'blog-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() required = false;
  @Input() type = 'text';
  @Input() control: any = new FormControl();
  @Input() label = '';
  @Input() fullWidth = false;
  @Input() large = false;
  @Input() error?: string;
  @Input() icon?: string; // TODO: how should I handle this?

  value = '';
  isFocused = false;

  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
