import { Component, OnInit, Input } from '@angular/core';
import { CenterTextSectionService } from '../../services/center-text-section.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-center-text-section',
  templateUrl: './center-text-section.component.html',
  imports:[CommonModule],
  standalone: true,
  styleUrls: ['./center-text-section.component.scss']
})
export class CenterTextSectionComponent implements OnInit {
  @Input() sectionKey: string = '';
  sectionData: any;

  constructor(private centerTextSectionService: CenterTextSectionService) {}

  ngOnInit() {
    this.centerTextSectionService.getSectionData().subscribe(data => {
      this.sectionData = data;
    });
  }
}
