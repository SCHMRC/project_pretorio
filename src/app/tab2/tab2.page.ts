import { FetchService } from './../../services/fetch.service';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Data } from 'src/model/data.model';
import { CommonModule } from '@angular/common';
import { PostData } from 'src/model/postdata.model';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonList, CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})
export class Tab2Page {
  oggi = new Date();
  data?: Data[];
  postData!: PostData;

  constructor(fetch: FetchService, util: UtilService) {
    this.postData = {
      statopubblicazione: '1',
      idtipoatto: '',
      annoselezionato: util.getCurrentYear().toString(),
      numeroprogressivo: '',
      numeroprotocollo: '',
      oggetto: '',
      dataInizio: '',
      dataFine: '',
      searchfield: '',
      PageNumber: '1'
    };
    fetch.post(this.postData).then((data: any) => {
      console.log(data);
      this.data = data;
    }).catch((error: any) => {
      console.error('Error fetching data:', error);
    });
  }

}
