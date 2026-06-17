import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('defaults elevated=true, clickable=false', () => {
    expect(component.elevated).toBeTrue();
    expect(component.clickable).toBeFalse();
  });

  it('hostClasses includes elevated class', () =>
    expect(component.hostClasses).toContain('pui-card--elevated'));

  it('hostClasses includes clickable when set', () => {
    component.clickable = true;
    expect(component.hostClasses).toContain('pui-card--clickable');
  });

  it('trendIcon maps correctly', () => {
    component.data = { title: 'T', trend: 'up' };
    expect(component.trendIcon).toBe('▲');
    component.data = { title: 'T', trend: 'down' };
    expect(component.trendIcon).toBe('▼');
    component.data = { title: 'T', trend: 'neutral' };
    expect(component.trendIcon).toBe('—');
  });
});
