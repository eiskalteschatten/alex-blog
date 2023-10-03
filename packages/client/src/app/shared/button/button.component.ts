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
}
