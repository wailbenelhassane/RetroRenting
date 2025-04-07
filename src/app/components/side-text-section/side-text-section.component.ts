import { Component, OnInit, Input } from '@angular/core';
import { SideTextSectionService } from '../../services/side-text-section.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-side-text-section',
  templateUrl: './side-text-section.component.html',
  imports:[CommonModule],
  standalone: true,
  styleUrls: ['./side-text-section.component.scss']
})
export class SideTextSectionComponent implements OnInit {
  @Input() sectionKey: string = '';
  sectionData: any;

  constructor(private sideTextSectionService: SideTextSectionService) {}

  ngOnInit() {
    this.sideTextSectionService.getSectionData().subscribe(data => {
      this.sectionData = data;
    });
  }
}
