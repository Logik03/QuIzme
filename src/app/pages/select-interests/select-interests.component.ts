import { Component } from '@angular/core';

export interface Interest {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-select-interests',
  templateUrl: './select-interests.component.html',
  styleUrl: './select-interests.component.scss'
})
export class SelectInterestsComponent {

  interests: Interest[] = [
    { name: 'Travel', selected: false },
    { name: 'Music', selected: false },
    { name: 'Sports', selected: false },
    { name: 'Language', selected: false },
    { name: 'Technology', selected: false },
    { name: 'Arts', selected: false },
    { name: 'Instruments', selected: false },
    { name: 'Bowling', selected: false },
    { name: 'Photography', selected: false },
    { name: 'Cooking', selected: false },
    { name: 'Gardening', selected: false },
    { name: 'Reading', selected: false },
    { name: 'Writing', selected: false },
    { name: 'Cycling', selected: false },
    { name: 'Hiking', selected: false },
    { name: 'Fishing', selected: false },
    { name: 'Swimming', selected: false },
    { name: 'Gaming', selected: false },
    { name: 'Yoga', selected: false },
    { name: 'Dancing', selected: false }
  ];

  handleSelectionChange(selectedInterests: Interest[]) {
    console.log('Selected Interests:', selectedInterests);
    // Handle the selected interests as needed
  }
}
