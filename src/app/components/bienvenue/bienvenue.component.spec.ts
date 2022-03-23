import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenueComponent } from './bienvenue.component';

describe('BienvenueComponent', () => {
  let component: BienvenueComponent;
  let fixture: ComponentFixture<BienvenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
