import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profileIconNames} from './profile-icon-names';

@Component({
  selector: 'con-profile-icon-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css'
})
export class ProfileIconSelectorComponent {
profileIcons = profileIconNames;
showAllIcons: boolean = true
selectedIcon!: string | null;

iconSelected(icon: string){
  this.showAllIcons = false;
  console.log(icon)
  this.selectedIcon = icon;
}
}