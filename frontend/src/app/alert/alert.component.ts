import { AlertService } from './../logging/services/alert.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
        .subscribe(message => {
            switch (message && message.type) {
                case 'success':
                    message.cssClass = 'alert alert-success';
                    break;
                case 'error':
                    message.cssClass = 'alert alert-danger';
                    break;
            }

            this.message = message;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
