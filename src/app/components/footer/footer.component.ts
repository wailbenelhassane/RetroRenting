import { Component, OnInit, OnDestroy } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import { FooterItem } from '../../models/footer.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  footerMenu: FooterItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private footerService: FooterService) {}

  ngOnInit() {
    this.subscription.add(
      this.footerService.getFooterData().subscribe({
        next: (data: FooterItem[]) => {
          this.footerMenu = data;
        },
        error: (error: any) => {
          console.error('Error loading footer data:', error);
          this.footerMenu = [];
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
