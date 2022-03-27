import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinduoComponent } from './finduo.component';

describe('FinduoComponent', () => {
  let component: FinduoComponent;
  let fixture: ComponentFixture<FinduoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinduoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinduoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
