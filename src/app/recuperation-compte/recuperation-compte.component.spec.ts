import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperationCompteComponent } from './recuperation-compte.component';

describe('RecuperationCompteComponent', () => {
  let component: RecuperationCompteComponent;
  let fixture: ComponentFixture<RecuperationCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperationCompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
