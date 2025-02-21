import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlayerUiComponent } from './player-ui/player-ui.component'; // ✅ Import the component
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'player', component: PlayerUiComponent }, // ✅ Ensure this route is correct
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
