import {Component, OnInit} from '@angular/core';
import {BookingsService} from '../../services/firebase/booking-firebase.service';
import {Booking} from '../../models/booking.model';
import {NgForOf, NgIf} from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-booking-history',
  templateUrl: './history-booking.component.html',
  imports: [
    NgForOf,
    NgIf,
    HeaderComponent,
    IonicModule,
  ],
  standalone: true,
  styleUrls: ['./history-booking.component.scss']
})
export class HistoryBookingComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingsService,
              private afAuth: AngularFireAuth,
              private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      if (params['forceReload']) {
        window.location.href = window.location.pathname;
      }
    });

    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.bookings = await this.bookingService.getByCurrentUser(user.uid)
      }
    })
  }
}
