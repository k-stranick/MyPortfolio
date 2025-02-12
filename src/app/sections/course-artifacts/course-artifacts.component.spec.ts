import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseArtifactsComponent } from './course-artifacts.component';

describe('CourseArtifactsComponent', () => {
  let component: CourseArtifactsComponent;
  let fixture: ComponentFixture<CourseArtifactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseArtifactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
