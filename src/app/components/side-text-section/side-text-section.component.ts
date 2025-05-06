import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideTextSectionService} from '../../services/side-text-section.service';
import {SideTextData} from '../../models/side-text-section.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-text-section',
  templateUrl: './side-text-section.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./side-text-section.component.scss']
})
export class SideTextSectionComponent implements OnInit, OnDestroy {
  @Input() sectionKey: string = '';
  sectionData: SideTextData = {};
  private subscription: Subscription = new Subscription();

  constructor(private sideTextSectionService: SideTextSectionService) {}

  ngOnInit() {
    this.subscription.add(
      this.sideTextSectionService.getSectionData().subscribe({
        next: (data: SideTextData) => {
          this.sectionData = data;
        },
        error: (error: any) => {
          console.error('Error loading side text data:', error);
          this.sectionData = {};
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
