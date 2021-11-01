import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentryTestComponent } from './sentry-test.component';

describe('SentryTestComponent', () => {
  let component: SentryTestComponent;
  let fixture: ComponentFixture<SentryTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentryTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
