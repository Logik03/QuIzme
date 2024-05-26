import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
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
export class InterestComponentComponent {

  constructor(private notification: NotificationService, private store : Store, private router : Router) {}

  @Input() interests: Interest[] = [];
  @Output() selectionChange = new EventEmitter<Interest[]>();

  toggleSelection(interest: Interest) {
    const selectedCount = this.interests.filter(i => i.selected).length;

    if (!interest.selected && selectedCount >= 10) {
      this.notification.error('You can select up to 10 interests only');
    } else {
      interest.selected = !interest.selected;
    }
  }

  continue() {
    const selectedInterests = this.interests.filter(interest => interest.selected);
    this.selectionChange.emit(selectedInterests);
    const interestNames = selectedInterests.map(interest => interest.name);
    this.store.dispatch(selectInterests({ payload: { interest: interestNames} }));
  }
}