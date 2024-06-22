import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { GameState } from '../../../store/reducers/game.reducers';
import { PlayerState } from '../../../store/reducers/player.reducers';
import { startGame } from '../../../store/actions/game.actions';
import { useFreeGame } from '../../../store/actions/player.actions';
import { AppState } from '../../../store/app.states';
import { ISubmissionResult, IUserData } from '../../../core/models/user';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertComponent } from '../advert/advert.component';
import { IPlayerHistory } from '../../../core/models/game';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  gameState$!: Observable<GameState>;
  playerState$!: Observable<PlayerState>;
  private playerStateSubscription!: Subscription;
  player_history: IPlayerHistory[] = [];
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
  active = 1;
  playerScore!: number;

  constructor(
    private route: Router,  
    private store: Store<AppState>,
    private router: Router,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private _s: GameService
  ) {
      
    }
  ngOnInit(){
    this.gameState$ = this.store.pipe(select('gameState'));
    this.playerState$ = this.store.pipe(select('playerState'));
    this.playerState$.subscribe(state => {
      console.log('Player State:', state); // Debugging line to ensure state is correct
    });
    this.user$ = this.store.pipe(select(selectUser));
    this.user$.subscribe((user) => {
      this.getPlayerHistory(user?.id || '');
    });
    
    this.gameState$.subscribe((state) => {
      const result = state.submissionResult as ISubmissionResult;
      if (result?.data?.actual_game_score !== undefined) {
        this.playerScore = result.data.actual_game_score;
        console.log(this.playerScore, 'i am the player score')
      }
    });
    this.cd.detectChanges();
  }

 

  onPlayNow() {
    this.playerStateSubscription = this.playerState$.pipe(
      take(1) // Unsubscribe after the first emission
    ).subscribe(player => {
      console.log(player, 'I am the current player');
      
      if (player) {
        const payload = { playerId: player.playerId };
  
        switch (true) {
          case !player.freeGameUsed:
            this.store.dispatch(startGame({ payload }));
            break;
          case player.chancesLeft > 0:
            // Show ad and then start the game
            this.showAdThenStartGame(payload);
            break;
          default:
            // Handle the case where the player has no free game or chances left
            console.log('No free games or chances left');
            break;
        }
      }
    });
  }

  showAdThenStartGame(payload: { playerId: string }) {
    const modalRef = this.modalService.open(AdvertComponent, { backdrop: 'static', keyboard: false });
  }

  play() {
    this.wantsToPlay = true;
  }

  getPlayerHistory(id: string) {
    this._s.getPlayerHistory(id).subscribe({
      next: (res) => {
        this.player_history = res.data?.map((data: IPlayerHistory) => {
          return {
            ...data,
            started_at: new Date(data.started_at).toLocaleDateString(),
          };
        });
        const sortedHistory = [...this.player_history].sort((a, b) => {
          return new Date(b.started_at).getTime() - new Date(a.started_at).getTime();
        });
        // Log the sorted array to verify the sorting order
        console.log('Sorted Player History:', sortedHistory);
        // If playerScore is not set from game state, set it from the most recent player history
        if (!this.playerScore && sortedHistory.length > 0) {
          this.playerScore = sortedHistory[sortedHistory.length - 1].game_score || 0;
          console.log(this.playerScore, 'player score using getHistory')
        }
      },
    });
  }

  /* onAdDismissed(event: any) {
    this.wantsToPlay = false;
    this.route.navigate(['/dashboard/game']);
  } */
  /* onAdDismissed() {
    this.store.dispatch(useFreeGame());
    this.router.navigate(['/dashboard']);
  } */
}