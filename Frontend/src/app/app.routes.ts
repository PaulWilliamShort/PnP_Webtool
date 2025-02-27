import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlayerUiComponent } from './player-ui/player-ui.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'player', component: PlayerUiComponent },
    { path: 'create', component:  CreateCharacterComponent},
    { path: 'register', component:  RegisterComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
