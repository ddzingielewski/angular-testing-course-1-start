import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';
import { Course } from '../model/course';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;
  const beginnerCourses: Course[] = setupCourses().filter(c => c.category == 'BEGINNER');
  const advancedCourses: Course[] = setupCourses().filter(c => c.category == 'ADVANCED');

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);
    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      coursesService = TestBed.inject(CoursesService);
    });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display only beginner courses", () => {
    //given+when
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    //then
    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs");
  });


  it("should display only advanced courses", () => {

    //given+when
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    //then
    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs");

  });


  it("should display both tabs", () => {
    //given+when
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    //then
    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(2, "Expected to find 2 tabs");
  });


  it("should display advanced courses when tab clicked", (done: DoneFn) => {

    //given+when
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    //then
    const tabs = el.queryAll(By.css(".mat-tab-label"));

    click(tabs[1]);
    fixture.detectChanges();

    setTimeout(() => {
      const cardTitles = el.queryAll(By.css(".mat-tab-body-active .mat-card-title"));
      console.log(cardTitles);
      expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
      done();
    }, 1000);
  });

  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

    //given+when
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    //then
    const tabs = el.queryAll(By.css(".mat-tab-label"));

    click(tabs[1]);
    fixture.detectChanges();
    flush();

    const cardTitles = el.queryAll(By.css(".mat-tab-body-active .mat-card-title"));
    console.log(cardTitles);
    expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

  }));

  // it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {

  //   //given+when
  //   coursesService.findAllCourses.and.returnValue(of(setupCourses()));
  //   fixture.detectChanges();

  //   //then
  //   const tabs = el.queryAll(By.css(".mat-tab-label"));

  //   click(tabs[1]);
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     const cardTitles = el.queryAll(By.css(".mat-tab-body-active .mat-card-title"));
  //     console.log("Inside waitForAsync");
  //     expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
  //     expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
  //   });
  // }));

});


