import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-national',
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.scss']
})
export class NationalComponent implements OnInit {

  covidStateWiseData: any;
  vaccinatedPopulation: string = "999999";
  asOnDate: string = "99-99-9999";
  totalPopulation: string = "999999";
  constructor(
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.addEventListners();
    this.getData();
  }

  getData() {
    const url = "https://data.covid19india.org/v4/min/data.min.json";
    const covidData = this.restService.getCovidData(url);
    covidData.subscribe((data) => {
      this.covidStateWiseData = data;
      this.asOnDate = this.covidStateWiseData["TT"].meta.date;
      this.totalPopulation = this.covidStateWiseData["TT"].meta.population;
      this.vaccinatedPopulation = this.covidStateWiseData["TT"].total["vaccinated1"] + this.covidStateWiseData["TT"].total["vaccinated2"]
    }, 
    (err) => {
      console.log("Error loading Data");
    });
  }

  addEventListners() {
    var states = document.getElementsByClassName('land');
    for (var i = 0; i < states.length; i++) {
      states[i].addEventListener('mouseover', this.showTooltip.bind(this));
      states[i].addEventListener('mouseout', this.hideTooltip.bind(this));
    }
  }

  showTooltip(_event: any) {
    console.log(_event);
    const tooltip: any = document.getElementById("tooltip");
    const confirmedCase = this.calculateConfirmedCase(_event.currentTarget.id) | 0;
    tooltip.innerHTML =
      "State name : " + _event.currentTarget.getAttribute("title") +
      "<br />" +
      "Confirmed Cases : " + confirmedCase;
    tooltip.style.display = "block";
    tooltip.style.left = _event.pageX + 10 + 'px';
    tooltip.style.top = _event.pageY + 10 + 'px';
  }

  calculateConfirmedCase(stateId: string) {
    return this.covidStateWiseData[stateId].total.confirmed;
  } 
  hideTooltip() {
    let tooltip: any = document.getElementById("tooltip");
    tooltip.style.display = "none";
  }
}
