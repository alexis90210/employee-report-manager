import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsLoadingComponent } from './is-loading.component';

describe('IsLoadingComponent', () => {
  let component: IsLoadingComponent;
  let fixture: ComponentFixture<IsLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
