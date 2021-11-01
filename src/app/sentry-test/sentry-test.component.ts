import {Component, OnInit} from '@angular/core';
import * as Sentry from '@sentry/angular';
import {environment} from '../../environments/environment';

@Component({
  selector: 'ds-sentry-test',
  templateUrl: './sentry-test.component.html',
  styleUrls: ['./sentry-test.component.scss']
})
export class SentryTestComponent implements OnInit {

  // tslint:disable-next-line:no-empty
  constructor() {
  }

  ngOnInit(): void {
    Sentry.captureMessage(`Something went wrong in ${environment.production ? 'Production' : 'Development'}`,
      Sentry.Severity.Info);
  }

}
