import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NewsService } from './services/news.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockNewsService: jasmine.SpyObj<NewsService>;

  beforeEach(async () => {
    mockNewsService = jasmine.createSpyObj('NewsService', ['getArticles']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: NewsService, useValue: mockNewsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch sources on init', () => {
    spyOn(component, 'fetchSources');
    component.ngOnInit();
    expect(component.fetchSources).toHaveBeenCalled();
  });

  it('should fetch articles on init', () => {
    spyOn(component, 'fetchArticles');
    component.ngOnInit();
    expect(component.fetchArticles).toHaveBeenCalled();
  });

  describe('Pagination', () => {
    beforeEach(() => {
      mockNewsService.getArticles.and.returnValue(of({
        articles: [
          {
            title: 'Test Article',
            source: { name: 'Test Source' },
            publishedAt: new Date().toISOString(),
            description: 'Test Description',
            url: 'http://test.com'
          }
        ],
        totalResults: 20
      }));
    });

    it('should go to next page', () => {
      (component as any).totalResults = 20;
      component.currentPage = 1;
      component.nextPage();
      expect(component.currentPage).toBe(2);
      expect(mockNewsService.getArticles).toHaveBeenCalled();
    });

    it('should not go beyond total pages', () => {
      (component as any).totalResults = 20;
      component.currentPage = 2;
      component.pageSize = 10;
      component.nextPage();
      expect(component.currentPage).toBe(2);
    });

    it('should go to previous page', () => {
      component.currentPage = 2;
      component.previousPage();
      expect(component.currentPage).toBe(1);
      expect(mockNewsService.getArticles).toHaveBeenCalled();
    });

    it('should not go below first page', () => {
      component.currentPage = 1;
      component.previousPage();
      expect(component.currentPage).toBe(1);
    });

    it('should calculate correct number of pages', () => {
      (component as any).totalResults = 25;
      component.pageSize = 10;
      const pages = component.getPages();
      expect(pages.length).toBe(3);
      expect(pages).toEqual([1, 2, 3]);
    });
  });

  describe('Article Filtering', () => {
    it('should apply filters and reset to first page', () => {
      component.currentPage = 3;
      component.filters = {
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        source: 'test-source',
        q: 'test query'
      };

      spyOn(component, 'fetchArticles');
      component.applyFilters();

      expect(component.currentPage).toBe(1);
      expect(component.fetchArticles).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle network error', () => {
      spyOn(window, 'alert');
      component.handleError({ status: 0 });
      expect(window.alert).toHaveBeenCalledWith('Network error. Please check your internet connection.');
    });

    it('should handle bad request error', () => {
      spyOn(window, 'alert');
      component.handleError({ status: 400 });
      expect(window.alert).toHaveBeenCalledWith('Bad request. Please check the filters or try again later.');
    });

    it('should handle unexpected error', () => {
      spyOn(window, 'alert');
      component.handleError({ status: 500 });
      expect(window.alert).toHaveBeenCalledWith('An unexpected error occurred. Please try again later.');
    });
  });
});
