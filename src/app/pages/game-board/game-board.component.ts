import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { IStartGameResponse, Question } from '../../core/models/game';
import { Observable, Subscription, interval, map, take, takeWhile, timer } from 'rxjs';
import { GameState } from '../../store/reducers/game.reducers';
import { PlayerState } from '../../store/reducers/player.reducers';
import { Store, select } from '@ngrx/store';
import { selectGameState } from '../../store/selectors/game.selectors';
import { selectPlayerState } from '../../store/selectors/player.selectors';
import * as GameActions from '../../store/actions/game.actions';
import { IAnswer } from '../../core/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertComponent } from '../dashboard/advert/advert.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  timer: number = 60;
  game!: GameState/* IStartGameResponse = { playerId: '', questions: [], adverts: [], answers: {}}; */
  currentQuestionIndex: number = 0;
  score: number = 0;
  interval: any;
  //isLoading: boolean = false;
  awnsers: IAnswer[] = [];
  hasSubmitedGame: boolean = false;
  game$!: Observable<GameState>;
  player$!: Observable<PlayerState>;
  adTimer: number = 30;
  isLoading: boolean = true;
  hasSubmittedGame: boolean = false;
  private timerSubscription!: Subscription;
  private adTimerSubscription!: Subscription;
  private gameStateSubscription!: Subscription;
  private playerStateSubscription!: Subscription;
  gameQuestions: any;

  constructor(
    private gameService: GameService,
    private modalService: NgbModal,
    private store: Store<{ game: GameState; player: PlayerState }>
  ) {
    this.game$ = this.store.pipe(select(selectGameState));
    this.player$ = this.store.pipe(select(selectPlayerState));
  }
  
  
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.adTimerSubscription) {
      this.adTimerSubscription.unsubscribe();
    }
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }
    if (this.playerStateSubscription) {
      this.playerStateSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.gameStateSubscription = this.game$.subscribe(gameState => {
       this.game = gameState
       console.log(this.game, 'i am game state')
    });
    this.startTimer();
  }
  startAdTimer(): void {
    this.adTimer = 30;
    this.adTimerSubscription = timer(0, 1000).pipe(
      map(() => {
        if (this.adTimer > 0) {
          this.adTimer--;
        } else {
          this.adTimerSubscription.unsubscribe();
          this.modalService.dismissAll();
          this.startQuestionTimer();
        }
      })
    ).subscribe();
    //this.modalService.open(AdvertComponent, { backdrop: 'static', keyboard: false });
  }


  skipAd(): void {
    if (this.adTimer > 15) {
      this.startQuestionTimer();
      this.adTimerSubscription.unsubscribe();
    }
  }

  startQuestionTimer(): void {
    this.timerSubscription = timer(0, 1000).pipe(
      map(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          //this.submitAnswers();
          this.timerSubscription.unsubscribe();
        }
      })
    ).subscribe();
  }

  selectOption(option: string): void {
    if (this.game && this.game.questions.length > 0) {
      const awnser: IAnswer = {
        questionId: this.game.questions[this.currentQuestionIndex].id,
        awnser: option
      };
      this.store.dispatch(GameActions.answerQuestion({ awnser }));
      this.nextQuestion();
    }
  }

  

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.game.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      //this.submitAnswers();
    }
  }

  submitAnswers(): void {
    this.player$.pipe(
      take(1) // Take only the first emission and complete the observable
    ).subscribe(state => {
      const playerId = state.playerId; // Get the playerId from the state
  
      if (playerId) {
        // Dispatch an action to submit all answers
        const awnsers = Object.values(this.game.awnsers);
        console.log(awnsers, 'i am awnsers')
        this.store.dispatch(GameActions.submitAnswers({ playerId, awnsers }));
        this.hasSubmittedGame = true;
  
        // Check if the player has used their free game and show an interstitial ad if not
        if (!state.freeGameUsed) {
          this.showInterstitialAd();
        }
      } else {
        console.error('Player ID is not available');
      }
    });
  }

  showInterstitialAd(): void {
    // Logic to show interstitial ad
    console.log('showing interstitial ad!!!')
  }

  /* getQuestions() {
    this.isLoading = true;
    this.gameService.getQuestions().subscribe({
      next: (response) => {
        this.game = response.data;
        this.isLoading = false;
        this.resetTimer();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  } */

  startTimer(): void {
    this.timer = 60;
    this.timerSubscription = timer(0, 1000).pipe(
      map(() => {
        this.timer--;
        if (this.timer === 0) {
          this.submitAnswers();
          this.timerSubscription.unsubscribe();
        }
      })
    ).subscribe();
  }

  /* resetTimer() {
    clearInterval(this.interval);
    this.timer = 60;
    this.startTimer();
  } */

  /* nextQuestion() {
    if (this.game)
      if (this.currentQuestionIndex < this.game!.questions.length - 1) {
        this.currentQuestionIndex += 1;
        this.resetTimer();
      } else {
        this.endGame();
      }
  } */

  /* selectOption(option: string) {
    const currentQuestion = this.game?.questions[this.currentQuestionIndex];
    if (currentQuestion)
      this.answers.push({
        awnser: option,
        questionId: currentQuestion.id,
      });
    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }
 */
  /* endGame() {
    clearInterval(this.interval);
    this.submitAnswers();
  } */

  getColClass(length: number, index: number): string {
    if (length === 1) {
      return 'col-lg-12';
    } else if (length === 2) {
      return 'col-lg-6';
    } else if (length === 3) {
      return 'col-lg-4';
    } else if (length === 4) {
      return 'col-lg-3';
    } else if (length === 5) {
      return index < 4 ? 'col-lg-3' : 'col-lg-12';
    } else {
      return 'col-lg-3';
    }
  }

  /* submitAnswers() {
    if (this.game)
      this.gameService
        .submitAnswer(this.game.playerId, {
          awnsers: this.answers,
          end_time: new Date().toUTCString(),
        })
        .subscribe({
          next: (response) => {
            this.answers = [];
            this.game = null;
            this.hasSubmitedGame = true;
            let result = response.data;
            console.log(result, 'response from submitting answers')
          },
        });
  } */

  checkIfSelectedOption(option: string, id: string) {
    return (
      this.awnsers.filter((a) => {
        return a.questionId == id && option == a.awnser;
      }).length > 0
    );
  }
}
