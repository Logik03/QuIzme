import { Component, OnInit } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { Awnser, IStartGameResponse, Question } from '../../core/models/game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  timer: number = 60;
  game: IStartGameResponse | null = null;
  currentQuestionIndex: number = 0;
  score: number = 0;
  interval: any;

  answers: Awnser[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getQuestions();
    this.startTimer();
  }

  getQuestions() {
    this.gameService.getQuestions().subscribe({
      next: (response) => {
        this.game = response.data;
        this.resetTimer();
      },
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer -= 1;
      if (this.timer <= 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.interval);
    this.timer = 60;
    this.startTimer();
  }

  nextQuestion() {
    if (this.game)
      if (this.currentQuestionIndex < this.game!.questions.length - 1) {
        this.currentQuestionIndex += 1;
        this.resetTimer();
      } else {
        this.endGame();
      }
  }

  selectOption(option: string) {
    const currentQuestion = this.game?.questions[this.currentQuestionIndex];
    if (currentQuestion)
      this.answers.push({
        awnser: option,
        questionId: currentQuestion.id,
      });
    this.nextQuestion();
  }

  endGame() {
    clearInterval(this.interval);
    alert(`Game over! Your score is: ${this.score}`);
  }

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

  submitAnswers() {
    if (this.game)
      this.gameService
        .submitAnswer(this.game.player.id, {
          awnsers: [
            {
              awnser: '',
              questionId: '',
            },
          ],
          end_time: new Date().toUTCString(),
        })
        .subscribe({
          next: () => {},
        });
  }

  checkIfSelectedOption(option: string, id: string) {
    return (
      this.answers.filter((a) => {
        return a.questionId == id && option == a.awnser;
      }).length > 0
    );
  }
}
