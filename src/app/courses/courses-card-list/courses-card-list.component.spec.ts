import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../common/setup-test-data';
import { CoursesModule } from '../courses.module';
import { CoursesCardListComponent } from './courses-card-list.component';

describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(()=>{
    TestBed.configureTestingModule({
      imports:[CoursesModule]
    }).compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));


  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display the course list", () => {

    component.courses = setupCourses();
    fixture.detectChanges();
    //console.log(el.nativeElement.outerHTML);
    const cards = el.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12,"Unexpected number of cards");

  });


  it("should display the first course", () => {

    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    const card = el.query(By.css(".course-card:first-child"));
    const title = card.query(By.css(".mat-card-title"));
    const img = card.query(By.css(".mat-card-image"));
    expect(card).toBeTruthy("Could not find course card");
    expect(title.nativeElement.textContent).toEqual(course.titles.description);
    expect(img.nativeElement.src).toEqual(course.iconUrl);

  });


});


