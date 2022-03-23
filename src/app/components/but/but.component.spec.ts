import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButComponent } from './but.component';

describe('ButComponent', () => {
  let component: ButComponent;
  let fixture: ComponentFixture<ButComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
