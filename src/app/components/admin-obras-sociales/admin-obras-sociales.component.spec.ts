import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminObrasSocialesComponent } from './admin-obras-sociales.component';

describe('AdminObrasSocialesComponent', () => {
  let component: AdminObrasSocialesComponent;
  let fixture: ComponentFixture<AdminObrasSocialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminObrasSocialesComponent]
    });
    fixture = TestBed.createComponent(AdminObrasSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
