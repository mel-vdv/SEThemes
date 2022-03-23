import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauComponent } from './niveau.component';

describe('NiveauComponent', () => {
  let component: NiveauComponent;
  let fixture: ComponentFixture<NiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
