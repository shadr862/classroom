import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubmissionViewComponent } from './teacher-submission-view.component';

describe('TeacherSubmissionViewComponent', () => {
  let component: TeacherSubmissionViewComponent;
  let fixture: ComponentFixture<TeacherSubmissionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSubmissionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherSubmissionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
