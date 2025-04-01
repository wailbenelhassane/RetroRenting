import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerMenu: any[] = [];

  constructor(private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.getFooterData().subscribe(data => {
      this.footerMenu = data.footerMenu;
    });
  }
}
