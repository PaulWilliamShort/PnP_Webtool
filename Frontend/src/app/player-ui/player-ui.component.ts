import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, FormsModule, TranslateModule],
})
export class PlayerUiComponent implements OnInit {
  players = [
    { name: 'Player 1', image: 'assets/player1.jpg' },
    { name: 'Player 2', image: 'assets/player2.jpg' },
    { name: 'Player 3', image: 'assets/player3.jpg' },
    { name: 'Player 4', image: 'assets/player4.jpg' }
  ];

  dices = [4, 6, 8, 10, 20];
  selectedDices: number[] = [];
  consoleLogs: string[] = [];
  life = 100;

  stats: { name: string; value: number }[] = [];
  abilities: { name: string; value: number }[] = [];
  inventory: { name: string; value: number }[] = [];
  healthStates: string[] = [];
  exhaustionStates: string[] = [];

  selectedHealth!: string;
  selectedExhaustion!: string;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.initializeTranslations();
    this.initializeDeck();
  }

  private initializeTranslations() {
    this.translate.get([
      'HEALTHY', 'HEALTH_INJURED', 'HEALTH_WOUND_1', 'HEALTH_WOUND_2', 'HEALTH_WOUND_3',
      'FIT','EXHAUSTION_MINUS_1', 'EXHAUSTION_MINUS_2'
    ]).subscribe(translations => {

      this.healthStates = [
        translations['HEALTHY'],
        translations['HEALTH_INJURED'],
        translations['HEALTH_WOUND_1'],
        translations['HEALTH_WOUND_2'],
        translations['HEALTH_WOUND_3']
      ];
      this.selectedHealth = this.healthStates[0];

      this.exhaustionStates = [
        translations['FIT'],
        translations['EXHAUSTION_MINUS_1'],
        translations['EXHAUSTION_MINUS_2']
      ];
      this.selectedExhaustion = this.exhaustionStates[0];
    });
  }

  selectDice(dice: number) {
    this.selectedDices.push(dice);
    this.translate.get('DICE_SELECTED', { dice }).subscribe(translatedText => {
      this.consoleLogs.push(translatedText);
    });
  }

  throwDice() {
    if (this.selectedDices.length === 0) {
      this.translate.get('NO_DICE_SELECTED').subscribe(translatedText => {
        this.consoleLogs.push(translatedText);
      });
      return;
    }

    let totalSum = 0;
    this.selectedDices.forEach(dice => {
      const result = Math.ceil(Math.random() * dice);
      totalSum += result;
      this.translate.get('DICE_ROLLED', { dice, result }).subscribe(translatedText => {
        this.consoleLogs.push(translatedText);
      });
    });

    this.translate.get('TOTAL_DICE_SUM', { totalSum }).subscribe(translatedText => {
      this.consoleLogs.push(translatedText);
    });

    this.selectedDices = [];
  }

  clearDice() {
    this.consoleLogs = [];
    this.selectedDices = [];
  }

  adjustLife(amount: number) {
    this.life += amount;
    this.translate.get('LIFE_ADJUSTED', { amount, life: this.life }).subscribe(translatedText => {
      this.consoleLogs.push(translatedText);
    });
  }

  addStat() {
    this.translate.get('NEW_STAT').subscribe(translatedText => {
      this.stats.push({ name: translatedText, value: 0 });
    });
  }

  removeStat(index: number) {
    this.stats.splice(index, 1);
  }

  addAbility() {
    this.translate.get('NEW_ABILITY').subscribe(translatedText => {
      this.abilities.push({ name: translatedText, value: 0 });
    });
  }

  removeAbility(index: number) {
    this.abilities.splice(index, 1);
  }

  addItem() {
    this.translate.get('NEW_ITEM').subscribe(translatedText => {
      this.inventory.push({ name: translatedText, value: 0 });
    });
  }

  removeItem(index: number) {
    this.inventory.splice(index, 1);
  }

  pokerDeck: string[] = [];
  drawnCard: string | null = null;

  initializeDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    this.pokerDeck = [];
    suits.forEach(suit => {
      values.forEach(value => {
        this.pokerDeck.push(`${value} ${suit}`);
      });
    });

    this.shuffleDeck();
  }

  shuffleDeck() {
    this.pokerDeck.sort(() => Math.random() - 0.5);
  }

  drawCard() {
    if (this.pokerDeck.length > 0) {
      this.drawnCard = this.pokerDeck.pop() || null;
      this.translate.get('DREW_POKER_CARD', { card: this.drawnCard }).subscribe(translatedText => {
        this.consoleLogs.push(translatedText);
      });
    } else {
      this.drawnCard = null;
      this.translate.get('POKER_DECK_EMPTY').subscribe(translatedText => {
        this.consoleLogs.push(translatedText);
      });
      this.initializeDeck();
    }
  }
}
