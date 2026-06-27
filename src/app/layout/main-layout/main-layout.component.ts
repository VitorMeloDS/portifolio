import { ChangeDetectionStrategy, Component, inject, afterNextRender } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ScrollTopComponent } from '../../shared/components/scroll-top/scroll-top.component';
import { HeroComponent } from '../../features/hero/hero.component';
import { AboutComponent } from '../../features/about/about.component';
import { SkillsComponent } from '../../features/skills/skills.component';
import { ProjectsComponent } from '../../features/projects/projects.component';
import { ExperienceComponent } from '../../features/experience/experience.component';
import { EducationComponent } from '../../features/education/education.component';
import { ContactComponent } from '../../features/contact/contact.component';
import { NAVIGATION } from '../../data/portfolio.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    FooterComponent,
    ScrollTopComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
  ],
  template: `
    <a href="#hero" class="skip-link">Pular para o conteúdo</a>
    <div class="mesh-bg"></div>
    <app-header />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-experience />
      <app-education />
      <app-contact />
    </main>
    <app-footer />
    <app-scroll-top />
  `,
})
export class MainLayoutComponent {
  private readonly scrollSpy = inject(ScrollSpyService);

  constructor() {
    afterNextRender(() => {
      this.scrollSpy.init(NAVIGATION.map((n) => n.id));
    });
  }
}
