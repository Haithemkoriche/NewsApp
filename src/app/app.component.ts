import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SpinnerModule } from 'primeng/spinner';
import { SliderComponent } from './slider/slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    DropdownModule,
    ButtonModule,
    SpinnerModule,
    SliderComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'NewsApp';
  articles: any[] = [];
  sources: string[] = [];
  isLoading = false;
  isAllArticlesLoaded = false;
  currentPage = 1;
  pageSize = 10;
  offlineMode = false;
  currentSlideIndex = 0;

  filters = {
    startDate: '',
    endDate: '',
    source: '',
    q: '',
  };
  resetFilters() {
    this.filters = {
      startDate: '',
      endDate: '',
      source: '',
      q: '',
    };

    this.currentPage = 1;

    this.fetchArticles();
  }
  saveArticleForOffline(article: any) {
    const savedArticles = JSON.parse(
      localStorage.getItem('saved-articles') || '[]'
    );

    const isAlreadySaved = savedArticles.some(
      (savedArticle: any) => savedArticle.url === article.url
    );

    if (!isAlreadySaved) {
      savedArticles.push(article);

      localStorage.setItem('saved-articles', JSON.stringify(savedArticles));

      alert('Article saved for offline reading');
    } else {
      alert('Article already saved');
    }
  }
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.checkNetworkStatus();
    window.addEventListener('online', this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
    this.fetchSources();
    this.fetchArticles();
  }
  checkNetworkStatus() {
    this.offlineMode = !navigator.onLine;
  }
  onNetworkStatusChange() {
    this.checkNetworkStatus();
    if (!this.offlineMode) {
      this.fetchArticles();
    }
  }
  isValidArticle(article: any): boolean {
    return (
      article.title &&
      article.title !== '[Removed]' &&
      article.source?.name &&
      article.publishedAt &&
      article.description &&
      article.url
    );
  }
  fetchArticles() {
    if (this.offlineMode) {
      this.loadCachedArticles();
      return;
    }
    this.isLoading = true;
    if (this.currentPage === 1) {
      this.articles = [];
    }
    const params: { [key: string]: string } = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString(),
      q: this.filters['q'] || 'news',
    };

    if (this.filters['startDate']) params['from'] = this.filters['startDate'];
    if (this.filters['endDate']) params['to'] = this.filters['endDate'];
    if (this.filters['source']) params['sources'] = this.filters['source'];

    params['q'] = this.filters['q'] || 'news';

    const cacheKey = this.generateCacheKey(params);
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      this.articles = JSON.parse(cachedData);
      this.isLoading = false;
      console.log('Loaded articles from cache');
      return;
    }

    this.newsService.getArticles('everything', params).subscribe({
      next: (response: any) => {
        this.articles = response.articles.filter(this.isValidArticle);
        localStorage.setItem(cacheKey, JSON.stringify(this.articles));
        this.isLoading = false;
      },

      // next: (response: any) => {
      //   if (response.articles.length < this.pageSize) {
      //     this.isAllArticlesLoaded = true; // No more articles to load
      //   }
      //   this.articles = [...this.articles, ...response.articles]; // Append new articles
      //   this.isLoading = false;
      //   // Cache the new articles
      //   localStorage.setItem(cacheKey, JSON.stringify(this.articles));
      // },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 0) {
          alert('Network error. Please check your internet connection.');
        } else if (err.status === 400) {
          alert('Bad request. Please check the filters or try again later.');
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
        console.error('Error fetching articles:', err);
      },
    });
  }
  loadCachedArticles() {
    const cachedArticles = localStorage.getItem('cached-articles');
    if (cachedArticles) {
      this.articles = JSON.parse(cachedArticles);
    }
  }
  cacheArticlesForOffline() {
    localStorage.setItem('cached-articles', JSON.stringify(this.articles));
    localStorage.setItem('cached-articles-timestamp', new Date().toISOString());
  }
  handleError(error: any) {
    if (error.status === 0) {
      alert('Network error. Please check your internet connection.');
    } else if (error.status === 400) {
      alert('Bad request. Please check the filters or try again later.');
    } else {
      alert('An unexpected error occurred. Please try again later.');
    }
  }
  loadMoreArticles() {
    if (!this.isAllArticlesLoaded) {
      this.currentPage++;
      this.fetchArticles();
    }
  }

  generateCacheKey(params: { [key: string]: string }): string {
    return `articles-${JSON.stringify(params)}`;
  }

  fetchSources() {
    this.sources = ['bbc-news', 'cnn', 'the-verge', 'google-news', 'abc-news'];
  }

  applyFilters() {
    this.fetchArticles();
  }
  resetArticles() {
    this.articles = [];
    this.currentPage = 1;
    this.isAllArticlesLoaded = false;
  }
  goToFirstPage() {
    this.resetArticles();
    this.fetchArticles();
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.resetArticles();
    this.fetchArticles();
  }
  getPages(): number[] {
    const totalPages = Math.ceil(this.articles.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.resetArticles();
      this.currentPage--;
      this.fetchArticles();
    }
  }

  nextPage() {
    if (!this.isAllArticlesLoaded) {
      this.currentPage++;
      this.fetchArticles();
    }
  }
  isArticleCacheValid(): boolean {
    const cachedTimestamp = localStorage.getItem('cached-articles-timestamp');
    if (!cachedTimestamp) return false;

    const cachedDate = new Date(cachedTimestamp);
    const currentDate = new Date();
    const hoursDifference =
      (currentDate.getTime() - cachedDate.getTime()) / (1000 * 3600);

    return hoursDifference < 24;
  }
  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.articles.length) %
      this.articles.length;
  }

  nextSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex + 1) % this.articles.length;
  }
}
