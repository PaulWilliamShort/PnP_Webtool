import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themes = ['light', 'dark', 'blue', 'red'];
  private themeVariables: { [key: string]: { [key: string]: string } } = {
    light: {
      '--background-primary': '#b5d4de',
      '--border-primary': '#3b9ab2',
      '--button-color-primary': '#ffffff',
      '--button-hover-color': '#2982a2',
      '--button-active-color': '#256f8a',
      '--background-gradient-1':' #e3edf7',
      '--settings-color': '#1f2d3d',
      '--h3-color': '#1f2d3d',
      '--label-color': '#2e3a59',
    },
    dark: {
      '--background-primary': 'black',
    },
    blue: {
      '--background-primary': '#b5d4de',
    },
    red: {
      '--background-primary': 'red',
    },
  };

  private currentTheme: string = 'light';

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.currentTheme = savedTheme;
      document.body.classList.add(`${savedTheme}-theme`);
      this.applyThemeVariables(savedTheme);
    }
  }

  setTheme(theme: string): void {
    if (this.themes.includes(theme)) {
      document.body.classList.remove(`${this.currentTheme}-theme`);
      this.currentTheme = theme;
      document.body.classList.add(`${theme}-theme`);
      localStorage.setItem('theme', theme);
      this.applyThemeVariables(theme);
    }
  }

  getTheme(): string {
    return this.currentTheme;
  }

  private applyThemeVariables(theme: string): void {
    const variables = this.themeVariables[theme];
    Object.keys(variables).forEach((key) => {
      document.documentElement.style.setProperty(key, variables[key]);
    });
  }
}
