import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { GameState } from '../../../store/reducers/game.reducers';
import { PlayerState } from '../../../store/reducers/player.reducers';
import { startGame } from '../../../store/actions/game.actions';
import { useFreeGame } from '../../../store/actions/player.actions';
import { AppState } from '../../../store/app.states';
import { IUserData } from '../../../core/models/user';
import { selectUser } from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  gameState$!: Observable<GameState>;
  playerState$!: Observable<PlayerState>;
  private playerStateSubscription!: Subscription;
  wantsToPlay: boolean = false;
  winners = [
    {
      number: 4,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 5,
      name: 'Izzytheguy',
      time: '1 mins ago',
      point: '866',
    },
    {
      number: 6,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 9,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 4,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 5,
      name: 'Izzytheguy',
      time: '1 mins ago',
      point: '866',
    },
    {
      number: 6,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 9,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 4,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 5,
      name: 'Izzytheguy',
      time: '1 mins ago',
      point: '866',
    },
    {
      number: 6,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 9,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
  ];
  user$!: Observable<IUserData | null>;
  buttonText: string = 'Play Now';

  constructor(
    private route: Router,  
    private store: Store<AppState>,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
      
    }
  ngOnInit(){
    this.gameState$ = this.store.pipe(select('gameState'));
    this.playerState$ = this.store.pipe(select('playerState'));
    this.playerState$.subscribe(state => {
      console.log('Player State:', state); // Debugging line to ensure state is correct
    });
    this.cd.detectChanges();
  }

  /* onPlayNow() {
    this.playerState$.subscribe(player => {
      if (!player.freeGameUsed || player.chancesLeft > 0) {
        this.store.dispatch(startGame());
        this.route.navigate(['/dashboard/game']); // Navigate to the game board
      } else {
        // Handle the case where the player has no free game or chances left
        console.log('No free games or chances left');
      }
    });
  } */

  /* onPlayNow() {
    this.playerStateSubscription = this.playerState$.subscribe(player => {
      console.log(player, 'i am the current player')
      const payload = {
        playerId: player.playerId,
        // Add any other necessary information to the payload
      };
      if (player && (!player.freeGameUsed || player.chancesLeft > 0)) {
        this.store.dispatch(startGame({ payload }));
        this.route.navigate(['/dashboard/game']); // Navigate to the game board
      } else {
        // Handle the case where the player has no free game or chances left
        console.log('No free games or chances left');
      }
    });
  } */

  onPlayNow() {
    this.playerStateSubscription = this.playerState$.pipe(
      take(1) // Unsubscribe after the first emission
    ).subscribe(player => {
      console.log(player, 'I am the current player');
  
      if (player && (!player.freeGameUsed || player.chancesLeft > 0)) {
        const payload = { playerId: player.playerId };
        this.store.dispatch(startGame({ payload }));
        this.route.navigate(['/dashboard/game']); // Navigate to the game board
      } else {
        // Handle the case where the player has no free game or chances left
        console.log('No free games or chances left');
      }
    });
}


  play() {
    this.wantsToPlay = true;
  }

  /* onAdDismissed(event: any) {
    this.wantsToPlay = false;
    this.route.navigate(['/dashboard/game']);
  } */
  onAdDismissed() {
    this.store.dispatch(useFreeGame());
    this.router.navigate(['/dashboard']);
  }
}
