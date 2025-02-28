import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
})
export class AppComponent {
  themes = ['light', 'dark', 'red'];
  isSettingsOpen = false;
  selectedTheme: string;
  selectedLanguage = 'en';

  constructor(private cdRef: ChangeDetectorRef, private translate: TranslateService, private themeService: ThemeService) {
    this.selectedTheme = this.themeService.getTheme();
    this.translate.addLangs(['en', 'de', 'fr']);
    this.translate.setDefaultLang('de');
    const savedLang = localStorage.getItem('language') || 'de';
    this.translate.use(savedLang);
    this.selectedLanguage = savedLang;
  }

  changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
    this.selectedTheme = theme;
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('language', lang);
    location.reload();
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    console.log("Settings Open:", this.isSettingsOpen);
    this.cdRef.detectChanges();
  }
  
  logout() {
    console.log('User logged out');
    window.location.href = '/login';
  }
}
