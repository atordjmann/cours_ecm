import { Injectable } from '@angular/core';
import { Offer } from '../../models/Offer';
import { Filter } from 'src/models/Filter';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class OfferViewService {


    apiUrl = environment.apiUrl;

    listOffers: Offer[] = [];
    listOffersSubject = new Subject<Offer[]>();

    isLoading = false;
    isLoadingSubject = new Subject<boolean>();

    constructor(private httpClient: HttpClient) { }

    fillListOffers() {
        this.emitisLoadingSubject(true);
        this.httpClient.get<any>(this.apiUrl + '/offres').subscribe(
            (response) => {
                this.listOffers = [];
                console.log('Found ' + response.length + ' offers');
                response.forEach((offerJson: any) => {
                    const offer = new Offer();
                    offer.fromHashMap(offerJson);
                    this.listOffers.push(offer);
                });
                this.emitListOffersSubject();
                this.emitisLoadingSubject(false);
            },
            (error) => {
                console.log('Erreur ! : ' + error);
            }
        );
    }

    filterListOffers(currentFilter: Filter) {
        this.emitisLoadingSubject(true);
        const query = currentFilter.toQuery();
        if (query === '') {
            this.emitisLoadingSubject(false);
            return;
        }

        console.log(this.apiUrl + '/offres/filtered?' + query);
        this.httpClient.get<any>(this.apiUrl + '/offres/filtered?' + query).subscribe(
            (response) => {
                this.listOffers = [];
                console.log('Found ' + response.length + ' offers matching the filter');
                response.forEach((offerJson: any) => {
                    const offer = new Offer();
                    offer.fromHashMap(offerJson);
                    this.listOffers.push(offer);
                });
                this.emitListOffersSubject();
                this.emitisLoadingSubject(false);
            },
            (error) => {
                console.log('Erreur ! : ' + error);
            }
        );
    }

    emitListOffersSubject() {
        this.listOffersSubject.next(this.listOffers.length!==0 ? this.listOffers.slice() : []);
    }

    emitisLoadingSubject(isLoading: boolean) {
        this.isLoadingSubject.next(isLoading);
    }

    filter(currentFilter: Filter) {
        if (currentFilter.toQuery() !== '') {
            this.filterListOffers(currentFilter);
        } else {
            this.fillListOffers();
        }
    }

    getOfferById(id: String) {
        const offer : Offer = this.listOffers.find(
            (s) => {
                return s.id === id;
            }) ?? new Offer;
        return offer;
    }
}
