import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemasterUIComponent } from './gamemaster-ui.component';

describe('GamemasterUIComponent', () => {
  let component: GamemasterUIComponent;
  let fixture: ComponentFixture<GamemasterUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamemasterUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamemasterUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
