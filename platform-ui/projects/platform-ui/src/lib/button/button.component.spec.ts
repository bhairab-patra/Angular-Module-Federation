import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ButtonComponent] }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('defaults to primary / md', () => {
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
  });

  it('does not emit when disabled', () => {
    component.disabled = true;
    const spy = jasmine.createSpy();
    component.buttonClick.subscribe(spy);
    component.onClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('emits when enabled', () => {
    const spy = jasmine.createSpy();
    component.buttonClick.subscribe(spy);
    component.onClick(new MouseEvent('click'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('includes variant in hostClasses', () => {
    component.variant = 'danger';
    expect(component.hostClasses).toContain('pui-btn--danger');
  });
});
