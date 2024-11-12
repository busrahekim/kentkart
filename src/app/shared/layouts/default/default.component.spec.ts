import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComponent } from './default.component';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'KentKart System'
    );
  });

  it('should display the correct description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'An international company that provides public transportation fare collection services'
    );
  });

  it('should have the correct componentTitle', () => {
    expect(component.componentTitle).toBe('KentKart System');
  });

  it('should have the correct componentDesc', () => {
    expect(component.componentDesc).toBe(
      'An international company that provides public transportation fare collection services, where hundreds of thousands of instant data are processed, analyzed and reported.'
    );
  });
});
