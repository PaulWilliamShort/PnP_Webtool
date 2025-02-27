import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface CharacterField {
  name: string;
  value: string;
}

interface SpellField {
  name: string;
  magicPoints: string;
  range: string;
  duration: string;
  effect: string;
}

interface WeaponField {
  name: string;
  range: string;
  damage: string;
  armorPiercing: string;
  fireRate: string;
  weight: string;
  notes: string;
}

interface Character {
  name: string;
  nickname: string;
  bennys: number;
  conviction: string;
  attributes: { [key: string]: number };
  fightInfo: { [key: string]: number };
  abilities: CharacterField[];
  handicaps: CharacterField[];
  talents: CharacterField[];
  spells: SpellField[];
  weapons: WeaponField[];
  profilePicture: string;
}

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class CreateCharacterComponent {
  character: Character = {
    name: '',
    nickname: '',
    bennys: 0,
    conviction: '',
    attributes: {
      dexterity: 0,
      intelligence: 0,
      willpower: 0,
      strength: 0,
      constitution: 0,
    },
    fightInfo: {
      movementRange: 0,
      parry: 0,
      toughness: 0,
    },
    abilities: [],
    handicaps: [],
    talents: [],
    spells: [],
    weapons: [],
    profilePicture: '',
  };

  file: File | null = null;
  constructor(private translate: TranslateService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  onProfilePictureSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.character.profilePicture = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  removeProfilePicture() {
    this.character.profilePicture = '';
  }

  triggerFileInput() {
    document.getElementById('profilePictureInput')?.click();
  }


  get attributeKeys() {
    return Object.keys(this.character.attributes);
  }

  get fightInfoKeys() {
    return Object.keys(this.character.fightInfo);
  }

  // Dynamic field management
  addAbility() {
    this.character.abilities.push({ name: this.translate.instant('ABILITY_NAME'), value: '' });
  }

  removeAbility(index: number) {
    this.character.abilities.splice(index, 1);
  }

  addHandicap() {
    this.character.handicaps.push({ name: this.translate.instant('HANDICAP_NAME'), value: '' });
  }

  removeHandicap(index: number) {
    this.character.handicaps.splice(index, 1);
  }

  addTalent() {
    this.character.talents.push({ name: this.translate.instant('TALENT_NAME'), value: '' });
  }

  removeTalent(index: number) {
    this.character.talents.splice(index, 1);
  }

  addSpell() {
    this.character.spells.push({ 
      name: this.translate.instant('SPELL_NAME'), 
      magicPoints: this.translate.instant('MAGICPOINTS'), 
      range: this.translate.instant('RANGE'), 
      duration: this.translate.instant('DUARION'), 
      effect: this.translate.instant('EFFECTS') });
  }

  removeSpell(index: number) {
    this.character.spells.splice(index, 1);
  }

  addWeapon() {
    this.character.weapons.push({ 
      name: this.translate.instant('WEAPON_NAME'), 
      range: this.translate.instant('RANGE'), 
      damage: this.translate.instant('DAMAGE'), 
      armorPiercing: this.translate.instant('ARMORPIERCING'), 
      fireRate: this.translate.instant('FIRERATE'), 
      weight: this.translate.instant('WEIGHT'), 
      notes: this.translate.instant('NOTES') });
  }

  removeWeapon(index: number) {
    this.character.weapons.splice(index, 1);
  }

  createCharacter() {
    alert(this.translate.instant('CHARACTER_CREATED_SUCCESS'));
  }
}
