import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassDetailComponent } from './student-class-detail.component';

describe('StudentClassDetailComponent', () => {
  let component: StudentClassDetailComponent;
  let fixture: ComponentFixture<StudentClassDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentClassDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
