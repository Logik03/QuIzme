import { Component, Input } from '@angular/core';
import { AppState } from '../../../store/app.states';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { activateReward, resetPlayerState, useFreeGame } from '../../../store/actions/player.actions';
import { startGame } from '../../../store/actions/game.actions';
import { Observable, Subscription, combineLatest, take } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewScoreComponent } from '../../../shared/components/view-score/view-score.component';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrl: './advert.component.scss'
})
export class AdvertComponent {
  playerState$: Observable<any>;
  gameState$: Observable<any>;
  combinedSubscription!: Subscription;
  playerChances!: number;
  @Input() adType!: string;
  isSubmitting!: boolean;
  //playerState$: any;
  //gameState$: any;
  playerStateSubscription: any;
  private isModalOpen = false;
  //gameStateSubscription: any;
  //playerChances! : number;
  //@Input() adType!: string;

  constructor(  
    private store: Store<AppState>,
    private router: Router,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) {
    

    this.playerState$ = this.store.pipe(select('playerState'));
    this.gameState$ = this.store.pipe(select('gameState'));

    this.combinedSubscription = combineLatest([this.playerState$, this.gameState$]).subscribe(
      ([playerState, gameState]) => {
        console.log(playerState, 'i am state on ad page');
        console.log(gameState, 'i am game state on ad page');
        
        this.playerChances = playerState.chancesLeft;
        this.isSubmitting = gameState.isSubmitting;
      }
    );
    
    
    }


  onAdDismissed(reason: string) {
    if (this.isModalOpen) {
      return;
    }
  
    this.isModalOpen = true;
    this.playerStateSubscription = this.playerState$.pipe(
      take(1) // Unsubscribe after the first emission
    ).subscribe((player: any) => {
      console.log(player, 'I am the current player ! -------------!');
      console.log(reason, 'Ad dismissed reason!!');
      const payload = { playerId: player.playerId };
      if(reason === 'reward' ) {
        this.store.dispatch(activateReward())
      }else if (reason === 'skipped') {
        // Handle the logic for skipping the ad
        //this.store.dispatch(startGame({ payload: player.playerId }));
      } else if (reason === 'calculate player score') {
        //this.showPlayerScoreModal();
        // Handle the logic for viewing the score
        // dispatch appropriate action here
      }

      this.activeModal.close();
      this.isModalOpen = false;
    });

  }
  showPlayerScoreModal() {
    const modalRef = this.modalService.open(ViewScoreComponent , { backdrop: 'static', keyboard: false });
  }

}
