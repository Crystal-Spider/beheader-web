import {Routes} from '@angular/router';

/**
 * The generator is the only page in the initial application.
 * @type {Routes}
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('~bhw/feature/generator/generator').then(module => module.Generator)
  },
  {path: '**', redirectTo: ''}
];
