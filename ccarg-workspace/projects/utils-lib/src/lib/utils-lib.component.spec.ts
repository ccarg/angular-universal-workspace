import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilsLibComponent } from './utils-lib.component';

describe('UtilsLibComponent', () => {
  let component: UtilsLibComponent;
  let fixture: ComponentFixture<UtilsLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilsLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
