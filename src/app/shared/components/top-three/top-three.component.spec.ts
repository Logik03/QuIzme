import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreeComponent } from './top-three.component';

describe('TopThreeComponent', () => {
  let component: TopThreeComponent;
  let fixture: ComponentFixture<TopThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
