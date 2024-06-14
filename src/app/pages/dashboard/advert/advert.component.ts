import { Component } from '@angular/core';
import { AppState } from '../../../store/app.states';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { useFreeGame } from '../../../store/actions/player.actions';
import { startGame } from '../../../store/actions/game.actions';
import { take } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrl: './advert.component.scss'
})
export class AdvertComponent {
  playerState$: any;
  playerStateSubscription: any;
  playerChances! : number;

  constructor(  
    private store: Store<AppState>,
    private router: Router,
    private activeModal: NgbActiveModal,
  ) {
    this.playerState$ = this.store.pipe(select('playerState'));
    this.playerState$.subscribe((state: any) => {
      console.log(state, 'i am state on ad page')
      this.playerChances = state.chancesLeft
    });
    
    }


  onAdDismissed() {
    this.playerStateSubscription = this.playerState$.pipe(
      take(1) // Unsubscribe after the first emission
    ).subscribe((player: any) => {
      //console.log(player, 'I am the current player');
        const payload = { playerId: player.playerId };
        this.store.dispatch(startGame({payload}));
        this.activeModal.close();
    });

  }
}
