import { OfferViewService } from './../offerView.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../../models/Offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer = new Offer;

  constructor(private route: ActivatedRoute, private offerViewService : OfferViewService) { }

  ngOnInit() {
    let idOffer = this.route.snapshot.params['id'];
    this.offer = this.offerViewService.getOfferById(idOffer)
  }

}
