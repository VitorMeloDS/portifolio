import { Component, inject, OnInit } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SeoService } from './core/services/seo.service';
import { PORTFOLIO_DATA, SITE_URL } from './data/portfolio.data';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  template: `<app-main-layout />`,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: PORTFOLIO_DATA.personal.name,
      description: PORTFOLIO_DATA.personal.summary,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/assets/images/profile-640.webp`,
    });
  }
}
