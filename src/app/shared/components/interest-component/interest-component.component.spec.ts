import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestComponentComponent } from './interest-component.component';

describe('InterestComponentComponent', () => {
  let component: InterestComponentComponent;
  let fixture: ComponentFixture<InterestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
