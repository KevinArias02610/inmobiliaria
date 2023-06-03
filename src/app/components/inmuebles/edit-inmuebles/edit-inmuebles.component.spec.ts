import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInmueblesComponent } from './edit-inmuebles.component';

describe('EditInmueblesComponent', () => {
  let component: EditInmueblesComponent;
  let fixture: ComponentFixture<EditInmueblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInmueblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
