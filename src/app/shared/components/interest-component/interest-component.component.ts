import { Component } from '@angular/core';
interface Interest {
  id: number;
  name: string;
}
@Component({
  selector: 'app-interest-component',
  templateUrl: './interest-component.component.html',
  styleUrl: './interest-component.component.scss'
})
export class InterestComponentComponent {

  interests: Interest[] = [
    { id: 1, name: 'Music' },
    { id: 2, name: 'Sports' },
    { id: 3, name: 'Books' },
    // Add more interests as needed
  ];
  selectedInterests: string[] = [];

  toggleSelection(event: any, interest: Interest) {
    if (event.target.checked) { // Ensure event.target is not null and access the checked property
      if (this.selectedInterests.length < 10) {
        this.selectedInterests.push(interest.name);
      } else {
        // Disable the checkbox if the limit is reached
        // You can also display a message to the user
        // or use other UI feedback to indicate the limit
      }
    } else {
      this.selectedInterests = this.selectedInterests.filter(item => item !== interest.name);
    }
  }
}