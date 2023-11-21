import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { OfferViewService } from '../offerView.service';

import { Filter } from 'src/models/Filter';
import { Offer } from 'src/models/Offer';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FilterComponent implements OnInit {
  currentFilter: Filter = new Filter();

  typeList: string[] = ['Stage', 'Alternance', 'Emploi'];
  timeList: string[] = ['1-2 mois', '6 mois'];
  sectorList: string[] = ['Audit / Conseil', 'Informatique', 'Mécanique'];

  //Pour le filtre avancé
  isMoreFilterOpen = false;
  listArticlesSubscription: Subscription = new Subscription;

  listOfferLocation: any[] = [];
  locationForm = new FormGroup({
    selected: new FormControl()
  });

  listOfferCompany: any[] = [];
  companyForm = new FormGroup({
    selected: new FormControl()
  });
  datePubSelected = '';
  dateStart = new FormControl(moment());
  percentMini = 50;
  remunMini = 800;

  constructor(private offerViewService: OfferViewService) { }

  ngOnInit() {
    this.currentFilter.type = 'All';
    this.currentFilter.time = 'All';
    this.currentFilter.sector = 'All';

    this.manageMoreFilter()
  }

  filter() {
    if (this.currentFilter.type === 'All') {
      this.currentFilter.type = '';
    }
    if (this.currentFilter.time === 'All') {
      this.currentFilter.time = '';
    }
    if (this.currentFilter.sector === 'All') {
      this.currentFilter.sector = '';
    }
    this.offerViewService.filter(this.currentFilter);
    this.isMoreFilterOpen = false;
  }

  manageMoreFilter() {
    this.isMoreFilterOpen = !this.isMoreFilterOpen;

    if (this.listOfferLocation.length == 0) {
      //On récupère le nom des villes pour lesquelles on a des stages
      this.listArticlesSubscription = this.offerViewService.listOffersSubject.subscribe(
        (listOffers: Offer[]) => {
          let setVille = new Set<String>([]);
          listOffers.forEach((offer: Offer) => {
            if (!setVille.has(offer['location'])){
              setVille.add(offer['location']);

              this.listOfferLocation.push(
                {
                  display: offer['location'],
                  value: ''+this.listOfferLocation.length
                }
                );
            }
          })
        }
      );
      this.offerViewService.emitListOffersSubject();
    }

    if (this.listOfferCompany.length == 0) {
      //On récupère le nom des villes pour lesquelles on a des stages
      this.listArticlesSubscription = this.offerViewService.listOffersSubject.subscribe(
        (listOffers: any[]) => {
          listOffers.forEach((offer) => {
            this.listOfferCompany.push(
              {
                display: offer['company'],
                value: ''+this.listOfferCompany.length
              }
              );
          })
        }
      );
      this.offerViewService.emitListOffersSubject();
    }
  }



  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateStart.value;
    if(ctrlValue == null) {
      return;
    }    
    ctrlValue.year(normalizedYear.year());
    this.dateStart.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateStart.value;
    if(ctrlValue == null) {
      return;
    } 
    ctrlValue.month(normalizedMonth.month());
    this.dateStart.setValue(ctrlValue);
    datepicker.close();
  }
}
