import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizDetailComponent } from './teacher-quiz-detail.component';

describe('TeacherQuizDetailComponent', () => {
  let component: TeacherQuizDetailComponent;
  let fixture: ComponentFixture<TeacherQuizDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherQuizDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
