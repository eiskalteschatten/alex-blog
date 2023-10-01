import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() required = false;
  @Input() type = 'text';
  @Input() formControlName: string | number | null = null;
}
