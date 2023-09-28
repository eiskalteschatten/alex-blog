import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ButtonWithSpinnerComponent } from './button-with-spinner.component';

describe('ButtonWithSpinnerComponent', () => {
  let component: ButtonWithSpinnerComponent;
  let fixture: ComponentFixture<ButtonWithSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonWithSpinnerComponent],
      imports: [MatProgressSpinnerModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonWithSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading property', () => {
    component.loading = true;
    fixture.detectChanges();

    const loadingSpinner = fixture.debugElement.query(By.css('.spinner'));
    expect(loadingSpinner).toBeTruthy();
  });

  it('should set icon property', () => {
    component.icon = 'search-16';
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');
    expect(button['icon']).toEqual('search-16');
  });

  it('should set icon-only property', () => {
    component.iconOnly = 'true';
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');
    expect(button['iconOnly']).toEqual(true);
  });
});
