import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectInterests } from '../../../store/actions/auth.actions';
import { selectHasSelectedInterests } from '../../../store/selectors/auth.selectors';
import { filter, take } from 'rxjs';
export interface Interest {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-interest-component',
  templateUrl: './interest-component.component.html',
  styleUrl: './interest-component.component.scss'
})
export class InterestComponentComponent implements OnInit {

  @Input() interests: Interest[] = [];
  @Output() selectionChange = new EventEmitter<Interest[]>();

  interestSelected: boolean = false;
  newInterest: string = '';
  showAddCustom: boolean = false;
  customInterests: Interest[] = [];
  constructor(private notification: NotificationService, private store : Store, private router : Router) {}
  
  
  ngOnInit(): void {
    this.updateInterestSelected();
  }

  toggleSelection(interest: Interest) {
    console.log('im being toggled')
    const selectedCount = this.selectedInterestsCount();

    if (!interest.selected && selectedCount >= 10) {
      this.notification.error('You can select 10 interests only');
    } else {
      interest.selected = !interest.selected;
      this.updateInterestSelected();
    }
  }

  toggleAddCustom() {
    this.showAddCustom = !this.showAddCustom;
  }

  addCustomInterest() {
    if (this.newInterest) {
      const newCustomInterest: Interest = { name: this.newInterest, selected: false };
      this.customInterests.push(newCustomInterest);
      this.newInterest = '';
      this.showAddCustom = false;
      this.updateInterestSelected();
    }
  }

  removeCustomInterest(interest: Interest) {
    this.customInterests = this.customInterests.filter(i => i !== interest);
    this.updateInterestSelected();
  }

  selectedInterestsCount(): number {
    return this.interests.filter(interest => interest.selected).length + this.customInterests.filter(interest => interest.selected).length;
  }

  updateInterestSelected() {
    const count = this.selectedInterestsCount();
    this.interestSelected = count >= 5 && count <= 10;
  }

  continue() {
    const selectedInterests = [
      ...this.interests.filter(interest => interest.selected),
      ...this.customInterests.filter(interest => interest.selected)
    ];
    this.selectionChange.emit(selectedInterests);
    const interestNames = selectedInterests.map(interest => interest.name);
    this.store.dispatch(selectInterests({ payload: { interest: interestNames } }));
  }
  
}