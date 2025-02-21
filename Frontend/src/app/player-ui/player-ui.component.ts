import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, FormsModule],
})
export class PlayerUiComponent {
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

  stats = [
    { name: 'Strength', value: 10 },
    { name: 'Agility', value: 8 }
  ];

  abilities = [
    { name: 'Fireball', value: 3 },
    { name: 'Heal', value: 5 }
  ];

  inventory = [
    { name: 'Potion', value: 2 },
    { name: 'Sword', value: 1 }
  ];

  // Method to select a dice for the throw
  selectDice(dice: number) {
    this.selectedDices.push(dice);
    this.consoleLogs.push(`Selected d${dice}`);
  }

  // Method to throw all selected dice
  throwDice() {
    if (this.selectedDices.length === 0) {
      this.consoleLogs.push('No dice selected.');
      return;
    }

    this.selectedDices.forEach(dice => {
      const result = Math.ceil(Math.random() * dice);
      this.consoleLogs.push(`Player rolled a d${dice}: ${result}`);
    });

    // Clear selected dices after the throw
    this.selectedDices = [];
  }

  // Method to clear console logs
  clearDice() {
    this.consoleLogs = [];
  }

  adjustLife(amount: number) {
    this.life += amount;
    this.consoleLogs.push(`Life adjusted by ${amount}. Current life: ${this.life}`);
  }

  addStat() {
    this.stats.push({ name: 'New Stat', value: 0 });
  }

  removeStat(index: number) {
    this.stats.splice(index, 1);
  }

  addAbility() {
    this.abilities.push({ name: 'New Ability', value: 0 });
  }

  removeAbility(index: number) {
    this.abilities.splice(index, 1);
  }

  addItem() {
    this.inventory.push({ name: 'New Item', value: 0 });
  }

  removeItem(index: number) {
    this.inventory.splice(index, 1);
  }
  pokerDeck: string[] = [];
  drawnCard: string | null = null;

  constructor() {
    this.initializeDeck();
  }

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
      this.consoleLogs.push(`Drew a poker card: ${this.drawnCard}`);
    } else {
      this.drawnCard = null;
      this.consoleLogs.push('The poker deck is empty! Reshuffling...');
      this.initializeDeck();
    }
  }
}
