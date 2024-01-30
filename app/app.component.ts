import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'home', url: '/home', icon: 'home' },
    { title: 'perfil', url: 'perfil/perfil', icon: 'home' },
    
    
  ];
  public labels = [''];

  constructor() {}
}
