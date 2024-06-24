import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfessionalsComponent } from './edit-professionals.component';

describe('EditProfessionalsComponent', () => {
  let component: EditProfessionalsComponent;
  let fixture: ComponentFixture<EditProfessionalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfessionalsComponent]
    });
    fixture = TestBed.createComponent(EditProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
