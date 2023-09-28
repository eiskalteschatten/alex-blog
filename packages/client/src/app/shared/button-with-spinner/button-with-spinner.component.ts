import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-spinner',
  templateUrl: './button-with-spinner.component.html',
  styleUrls: ['./button-with-spinner.component.scss']
})
export class ButtonWithSpinnerComponent {
  @Input() loading = false;
  @Input() icon = 'save-16';
  @Input('icon-only') iconOnly = 'false';
}
