import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { SortOptions } from '../../../core/cache/models/sort-options.model';
import { OpenaireBrokerTopicObject } from '../../../core/openaire/models/openaire-broker-topic.model';
import { hasValue } from '../../../shared/empty.util';
import { PaginationComponentOptions } from '../../../shared/pagination/pagination-component-options.model';
import { OpenaireStateService } from '../../openaire-state.service';

/**
 * Component to display the OpenAIRE Broker topic list.
 */
@Component({
  selector: 'ds-openaire-broker-topic',
  templateUrl: './openaire-broker-topics.component.html',
  styleUrls: ['./openaire-broker-topics.component.scss'],
})
export class OpenaireBrokerTopicsComponent implements OnInit {
  /**
   * The number of OpenAIRE Broker topics per page.
   */
  public elementsPerPage = 10;
  /**
   * The pagination system configuration for HTML listing.
   * @type {PaginationComponentOptions}
   */
  public paginationConfig: PaginationComponentOptions;
  /**
   * The OpenAIRE Broker topic list sort options.
   * @type {SortOptions}
   */
  public paginationSortConfig: SortOptions;
  /**
   * The OpenAIRE Broker topic list.
   */
  public topics$: Observable<OpenaireBrokerTopicObject[]>;
  /**
   * The total number of OpenAIRE Broker topics.
   */
  public totalElements$: Observable<number>;
  /**
   * Array to track all the component subscriptions. Useful to unsubscribe them with 'onDestroy'.
   * @type {Array}
   */
  protected subs: Subscription[] = [];

  /**
   * Initialize the component variables.
   * @param {ActivatedRoute} activatedRoute
   * @param {OpenaireStateService} openaireStateService
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private openaireStateService: OpenaireStateService,
  ) { }

  /**
   * Component intitialization.
   */
  ngOnInit(): void {
    this.paginationConfig = new PaginationComponentOptions();
    this.paginationConfig.id = 'openaire_broker_topic';
    this.paginationConfig.pageSize = this.elementsPerPage;
    this.paginationConfig.currentPage = 1;
    this.paginationConfig.pageSizeOptions = [ 5, 10, 20, 30, 50 ];
    this.subs.push(
      this.activatedRoute.data.pipe(
        map((data) => {
          if (data.openaireBrokerTopicsParams.currentPage) {
            this.paginationConfig.currentPage = data.openaireBrokerTopicsParams.currentPage;
          }
          if (data.openaireBrokerTopicsParams.pageSize) {
            if (this.paginationConfig.pageSizeOptions.includes(data.openaireBrokerTopicsParams.pageSize)) {
              this.paginationConfig.pageSize = data.openaireBrokerTopicsParams.currentPage;
            } else {
              this.paginationConfig.pageSize = this.paginationConfig.pageSizeOptions[0];
            }
          }
          this.topics$ = this.openaireStateService.getOpenaireBrokerTopics();
          this.totalElements$ = this.openaireStateService.getOpenaireBrokerTopicsTotals();
        })
      )
      .subscribe()
    );
  }

  /**
   * First OpenAIRE Broker topics loading after view initialization.
   */
  ngAfterViewInit(): void {
    this.subs.push(
      this.openaireStateService.isOpenaireBrokerTopicsLoaded().pipe(
        take(1)
      ).subscribe(() => {
        this.getOpenaireBrokerTopics();
      })
    );
  }

  /**
   * Returns the information about the loading status of the OpenAIRE Broker topics (if it's running or not).
   *
   * @return Observable<boolean>
   *    'true' if the topics are loading, 'false' otherwise.
   */
  public isTopicsLoading(): Observable<boolean> {
    return this.openaireStateService.isOpenaireBrokerTopicsLoading();
  }

  /**
   * Returns the information about the processing status of the OpenAIRE Broker topics (if it's running or not).
   *
   * @return Observable<boolean>
   *    'true' if there are operations running on the topics (ex.: a REST call), 'false' otherwise.
   */
  public isTopicsProcessing(): Observable<boolean> {
    return this.openaireStateService.isOpenaireBrokerTopicsProcessing();
  }

  /**
   * Set the current page for the pagination system.
   *
   * @param {number} page
   *    the number of the current page
   */
  public setPage(page: number) {
    if (this.paginationConfig.currentPage !== page) {
      this.paginationConfig.currentPage = page;
      this.getOpenaireBrokerTopics();
    }
  }

  /**
   * Dispatch the OpenAIRE Broker topics retrival.
   */
  protected getOpenaireBrokerTopics(): void {
    this.openaireStateService.dispatchRetrieveOpenaireBrokerTopics(
      this.elementsPerPage,
      this.paginationConfig.currentPage
    );
  }

  /**
   * Unsubscribe from all subscriptions.
   */
  ngOnDestroy(): void {
    this.subs
      .filter((sub) => hasValue(sub))
      .forEach((sub) => sub.unsubscribe());
  }
}