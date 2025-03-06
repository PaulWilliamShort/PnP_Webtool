import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themes = ['light', 'dark', 'brown'];
  private themeVariables: { [key: string]: { [key: string]: string } } = {
    light: {
      '--background-color-main': '#e3edf7', // Hellblauer Haupt-Hintergrund
      '--background-primary': '#b5d4de',
      '--border-primary': '#3b9ab2',
      '--button-color-primary': '#3b9ab2',
      '--button-hover-color': '#2982a2',
      '--button-active-color': '#256f8a',
      '--background-gradient-1': '#e3edf7',
      '--background-gradient-2': '#c9e4ef', // Weicher Verlauf ins Helle
      '--settings-background': '#b5d4de', // Helles Blau für Settings
      '--settings-color': '#1f2d3d',
      '--h3-color': '#1f2d3d',
      '--label-color': '#2e3a59',
      '--menu--button-color-primary': '#ffffff',
      '--clear-console-button': '#d9534f',
      '--console-background': '#fff',
      '--console-text': '#2e3a59',
      '--unchecked-radio': '#444',
      '--standard-radio-label': '#2E3A59',
      '--card-text-color': '#2E3A59',
      '--hover-radio': '#3b9ab2',
      '--log-text': '#3b9ab2',
      '--create-background': '#70e000',
      '--input-background': '#e3edf7',
      '--upload-background': '#3b9ab2',
      '--import-background': '#b5d4de'
    },
    dark: {
      '--background-color-main': '#1b1b2f', // Sehr dunkles Grau-Blau
      '--background-primary': '#1e1e2e',
      '--border-primary': '#3a3f5a',
      '--button-color-primary': '#2b2d42',
      '--button-hover-color': '#3f445b',
      '--button-active-color': '#70e000',
      '--background-gradient-1': '#232634',
      '--background-gradient-2': '#1a1c26', // Noch dunkler für sanften Verlauf
      '--settings-background': '#1e1e2e',
      '--settings-color': '#282c3f',
      '--h3-color': '#70e000',
      '--label-color': '#70e000',
      '--menu--button-color-primary': '#70e000',
      '--clear-console-button': '#d9534f',
      '--console-background': '#2b2d42',
      '--console-text': '#70e000',
      '--unchecked-radio': '#444',
      '--standard-radio-label': '#777',
      '--card-text-color': '#70E000',
      '--hover-radio': '#70e000',
      '--log-text': '#70e000',
      '--create-background': '#1b1b2f',
      '--input-background': '#2b2d42',
      '--upload-background': '#3a3f5a',
      '--import-background': '#2b2d42'
    },
    brown: {
      '--background-color-main': '#c4a484', // Hellerer Braunton für Hintergrund
      '--background-primary': '#3b2c1e',
      '--border-primary': '#5a4232',
      '--button-color-primary': '#6d4c3d',
      '--button-hover-color': '#8b5e4e',
      '--button-active-color': '#c69c6d',
      '--background-gradient-1': '#e8d5b7',
      '--background-gradient-2': '#f4e3d7',
      '--settings-background': '#3b2c1e',
      '--settings-color': '#543d2c',
      '--h3-color': '#c69c6d',
      '--label-color': '#d2a679',
      '--menu--button-color-primary': '#c69c6d',
      '--clear-console-button': '#b44e4e',
      '--console-background': '#e8d5b7',
      '--console-text': '#c69c6d',
      '--unchecked-radio': '#444',
      '--standard-radio-label': '#c69c6d',
      '--card-text-color': '#c69c6d',
      '--hover-radio': '#c69c6d',
      '--log-text': '#5a4232',
      '--create-background': '#70e000',
      '--input-background': '#5a4232',
      '--upload-background': '#6d4c3d',
      '--import-background': '#5a4232'
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
