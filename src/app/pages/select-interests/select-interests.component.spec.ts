import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInterestsComponent } from './select-interests.component';

describe('SelectInterestsComponent', () => {
  let component: SelectInterestsComponent;
  let fixture: ComponentFixture<SelectInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectInterestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
