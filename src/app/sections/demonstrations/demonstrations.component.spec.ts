import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationsComponent } from './demonstrations.component';

describe('DemonstrationsComponent', () => {
  let component: DemonstrationsComponent;
  let fixture: ComponentFixture<DemonstrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonstrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemonstrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
