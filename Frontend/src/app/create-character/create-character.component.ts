import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

interface CharacterField {
  name: string;
  namePlaceholder: string;
  value: string;
}

interface SpellField {
  name: string;
  namePlaceholder: string;
  magicPoints: string;
  magicPointsPlaceholder: string;
  range: string;
  rangePlaceholder: string;
  duration: string;
  durationPlaceholder: string;
  effect: string;
  effectPlaceholder: string;
}

interface WeaponField {
  name: string;
  namePlaceholder: string;
  range: string;
  rangePlaceholder: string;
  damage: string;
  damagePlaceholder: string;
  armorPiercing: string;
  armorPiercingPlaceholder: string;
  fireRate: string;
  fireRatePlaceholder: string;
  weight: string;
  weightPlaceholder: string;
  notes: string;
  notesPlaceholder: string;
}

interface Character {
  name: string;
  nickname: string;
  bennys: number;
  conviction: string;
  health: number;
  exhaustion: number;
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
export class CreateCharacterComponent implements OnInit {
  character: Character = {
    name: '',
    nickname: '',
    bennys: 0,
    conviction: '',
    health: 0,
    exhaustion: 0,
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

  attributeKeys: { key: string; translated: string }[] = [];
  fightInfoKeys: { key: string; translated: string }[] = [];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit() {
    this.initializeTranslations();
  }

  private initializeTranslations() {
    // Fetch translations for attributes from "ATTRIBUTES_obj"
    this.translate.get('ATTRIBUTES_obj').subscribe(translations => {
      if (translations && typeof translations === 'object') {
        this.attributeKeys = Object.keys(this.character.attributes).map(attr => ({
          key: attr,
          translated: translations[attr.toUpperCase()] || attr  // Fallback to raw key if translation is missing
        }));
      }
    });
  
    // Fetch translations for fight info from "FIGHTINFO_obj"
    this.translate.get('FIGHTINFO_obj').subscribe(translations => {
      if (translations && typeof translations === 'object') {
        this.fightInfoKeys = Object.keys(this.character.fightInfo).map(attr => ({
          key: attr,
          translated: translations[attr.toUpperCase()] || attr  // Fallback to raw key if translation is missing
        }));
      }
    });
  }
  


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

  // Dynamic field management
  addAbility() {
    this.translate.get('ABILITYNAME').subscribe(translation => {
      this.character.abilities.push({
        name: '',
        namePlaceholder: translation,
        value: '',
      });
    });
  }

  removeAbility(index: number) {
    this.character.abilities.splice(index, 1);
  }

  addHandicap() {
    this.translate.get('HANDICAPNAME').subscribe(translation => {
      this.character.handicaps.push({
        name: '',
        namePlaceholder: translation,
        value: '',
      });
    });
  }

  removeHandicap(index: number) {
    this.character.handicaps.splice(index, 1);
  }

  addTalent() {
    this.translate.get('TALENT_NAME').subscribe(translation => {
      this.character.talents.push({
        name: '',
        namePlaceholder: translation,
        value: '',
      });
    });
  }

  removeTalent(index: number) {
    this.character.talents.splice(index, 1);
  }

  addSpell() {
    this.translate
      .get(['SPELL_NAME', 'MAGICPOINTS', 'RANGE', 'DURATION', 'EFFECTS'])
      .subscribe(translations => {
        this.character.spells.push({
          name: '',
          namePlaceholder: translations['SPELL_NAME'],
          magicPoints: '',
          magicPointsPlaceholder: translations['MAGICPOINTS'],
          range: '',
          rangePlaceholder: translations['RANGE'],
          duration: '',
          durationPlaceholder: translations['DURATION'],
          effect: '',
          effectPlaceholder: translations['EFFECTS'],
        });
      });
  }

  removeSpell(index: number) {
    this.character.spells.splice(index, 1);
  }

  addWeapon() {
    this.translate
      .get([
        'WEAPON_NAME',
        'RANGE',
        'DAMAGE',
        'ARMORPIERCING',
        'FIRERATE',
        'WEIGHT',
        'NOTES',
      ])
      .subscribe(translations => {
        this.character.weapons.push({
          name: '',
          namePlaceholder: translations['WEAPON_NAME'],
          range: '',
          rangePlaceholder: translations['RANGE'],
          damage: '',
          damagePlaceholder: translations['DAMAGE'],
          armorPiercing: '',
          armorPiercingPlaceholder: translations['ARMORPIERCING'],
          fireRate: '',
          fireRatePlaceholder: translations['FIRERATE'],
          weight: '',
          weightPlaceholder: translations['WEIGHT'],
          notes: '',
          notesPlaceholder: translations['NOTES'],
        });
      });
  }

  removeWeapon(index: number) {
    this.character.weapons.splice(index, 1);
  }

  createCharacter() {
    const token = localStorage.getItem('token'); // Token holen
    if (!token) {
      alert(this.translate.instant('NOT_AUTHORIZED'));
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.post('http://localhost:5000/api/characters/create', this.character, { headers })
      .subscribe(
        (response) => {
          alert(this.translate.instant('CHARACTER_CREATED_SUCCESS'));
          console.log('Character saved:', response);
        },
        (error) => {
          alert(this.translate.instant('CHARACTER_CREATION_FAILED'));
          console.error('Error:', error);
        }
      );
  }
}
