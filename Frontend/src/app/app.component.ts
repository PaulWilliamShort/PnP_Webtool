import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
})
export class AppComponent {
  isSettingsOpen = false;
  selectedTheme = 'light';
  selectedLanguage = 'en';

  constructor(private cdRef: ChangeDetectorRef, private translate: TranslateService) {
    this.translate.addLangs(['en', 'de', 'fr']);
    this.translate.setDefaultLang('de');
    const savedLang = localStorage.getItem('language') || 'de';
    this.translate.use(savedLang);
    this.selectedLanguage = savedLang;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('language', lang);
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    console.log("Settings Open:", this.isSettingsOpen);
    this.cdRef.detectChanges();
  }

  // changeLanguage(event: Event, lang: string) {
  //   const target = event.target as HTMLSelectElement;
  //   this.selectedLanguage = target.value;
  //   console.log(`Language changed to: ${this.selectedLanguage}`);
  // }

  changeTheme(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTheme = target.value;
    document.body.setAttribute('data-theme', this.selectedTheme);
    console.log(`Theme changed to: ${this.selectedTheme}`);
  }

  logout() {
    console.log('User logged out');
    window.location.href = '/login';
  }
}
