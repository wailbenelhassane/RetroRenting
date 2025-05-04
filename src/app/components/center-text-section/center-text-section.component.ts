import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CenterTextSectionService} from '../../services/center-text-section.service';
import {CenterTextData} from '../../models/center-text-section.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-center-text-section',
  templateUrl: './center-text-section.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./center-text-section.component.scss']
})
export class CenterTextSectionComponent implements OnInit, OnDestroy {
  @Input() sectionKey: string = '';
  sectionData: CenterTextData = {};
  private subscription: Subscription = new Subscription();

  constructor(private centerTextSectionService: CenterTextSectionService) {}

  ngOnInit() {
    this.subscription.add(
      this.centerTextSectionService.getSectionData().subscribe({
        next: (data: CenterTextData) => {
          this.sectionData = data;
        },
        error: (error: any) => {
          console.error('Error loading center text data:', error);
          this.sectionData = {};
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
