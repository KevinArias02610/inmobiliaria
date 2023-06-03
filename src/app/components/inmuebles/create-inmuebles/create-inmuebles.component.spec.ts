import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInmueblesComponent } from './create-inmuebles.component';

describe('CreateInmueblesComponent', () => {
  let component: CreateInmueblesComponent;
  let fixture: ComponentFixture<CreateInmueblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInmueblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
