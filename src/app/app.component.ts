import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService  } from '../app/core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'QuIzme';
  public requestLoader$: Observable<boolean> = this.loader.loading$

  constructor (private loader: LoadingService) {}
}
