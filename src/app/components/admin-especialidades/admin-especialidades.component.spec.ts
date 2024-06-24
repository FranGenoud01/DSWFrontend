import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEspecialidadesComponent } from './admin-especialidades.component';

describe('AdminEspecialidadesComponent', () => {
  let component: AdminEspecialidadesComponent;
  let fixture: ComponentFixture<AdminEspecialidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEspecialidadesComponent]
    });
    fixture = TestBed.createComponent(AdminEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
