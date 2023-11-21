import { Component, OnInit } from '@angular/core';
import { Offer } from '../../models/Offer';
import { OfferViewService } from './offerView.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  listOffers: Offer[] = [];
  listArticlesSubscription: Subscription = new Subscription;
  isLoading: boolean = true;
  isLoadingSubscription: Subscription = new Subscription;

  constructor(private offerViewService: OfferViewService) { }

  ngOnInit() {
    this.offerViewService.fillListOffers();
    this.listArticlesSubscription = this.offerViewService.listOffersSubject.subscribe(
      (listOffers: any[]) => {
        this.listOffers = listOffers.slice();
      }
    );
    this.offerViewService.emitListOffersSubject();
    this.isLoadingSubscription = this.offerViewService.isLoadingSubject.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
  }

}
