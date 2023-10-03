import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() iconButton = false;
  @Input() deleteButton = false;
  @Input() large = false;
  @Input() primary = false;
  @Input() icon?: string; // TODO: what to do about this?
  @Input() iconRight?: string; // TODO: what to do about this?
  @Input() showLoader = false;
  @Input() fullWidth = false;
  @Input() centerContent = false;
  @Input() blackOrWhite = false;
  @Input() transparentBg = false;
  @Input() type = 'button';
  @Input() disabled = false;

  get classes(): any {
    return {
      'full-width': this.fullWidth,
      primary: this.primary,
      'icon-button': this.iconButton,
      'delete-button': this.deleteButton,
      large: this.large,
      'black-or-white': this.blackOrWhite,
      'transparent-bg': this.transparentBg,
    };
  }
}
