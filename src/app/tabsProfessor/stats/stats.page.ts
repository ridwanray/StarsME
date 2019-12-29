import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StarsResult } from  'src/app/models/starsResult'; 
import { UtilService } from 'src/app/services/util/util.service';
import { Note } from 'src/app/models/notes';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

declare var require: any;
require('highcharts/highcharts-3d')(Highcharts);

// Radialize the colors
Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, new Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});


let barChartOpts : Highcharts.Options = {   
  
    chart: {      
      type: 'bar',
      plotBackgroundColor: null,
      plotBorderColor: null,
      plotShadow : false,
      plotBorderWidth: null,
      options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
      }
  },
  title: {
      text: '<b>Total - Average</b>',
      useHTML: true,
  },
  subtitle: {
      text: 'Voters: <b>0</b>'
  },
  xAxis: {
      categories: ['Friendly', 'Equality', 'Humour',  'Understand',  'Honest', 'Change'],
      title: {
          text: null,
                }
  },
  yAxis: {
      min: 0,
      title: {
          text: '<b>Stars</b>',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: ' Stars'
  },
  plotOptions: {
     column: {
          dataLabels: {
              enabled: true,
          },
          animation: true,
          allowPointSelect: true,
          cursor: "pointer",
      },
      
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: 0,
      y: 0,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
  },
  credits: {
      enabled: false
  },
  series: [
    
  {
      name: 'Average',
      data: [0, 0, 0, 0, 0, 0],
      color:"#fed330",
      type: "bar"
  }, 
  
  {   
      type: "bar", 
      name: 'Total',
      data: [0, 0, 0, 0, 0, 0]
  },
   
  ]}; 

let pieChartOpts : Highcharts.Options = {

    chart :{
        plotBackgroundColor: null,
        plotBorderColor: null,
        plotShadow : false,
        plotBorderWidth: null,
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title : {
        useHTML: true,
        text: '<b>Quality</b>'
    },

    subtitle: {
        useHTML: true,
        text: 'Total Average: <b> 0 / 30</b>',
    },

    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },

    plotOptions: {
        pie: {
            depth: 45,
            allowPointSelect: true,
            animation: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'silver',
            },
            showInLegend: true,
        }
    },

    series: [{
        name: 'Qualities', 
        data: [
            {name:"Friendly", y: 0},
            {name: "Equality", y: 0},
            {name:"Humor", y: 0},
            {name: "Understand", y: 0},
            {name:"Honest", y: 0},
            {name: "Change", y: 0}
        ],

        type: 'pie'
    }]

} 
 

export interface Result  {
  id: number; 
  total: number; 
  moy : number; 
  name : string;
  question : string; 
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  results : Result[] = new Array<Result>();  

  starsResult : StarsResult = new StarsResult();

  totalMoy : number = 0;    
  barChart : Chart = new Chart(barChartOpts); 

  pieChart : Chart = new Chart(pieChartOpts); 

  // chart using highcharts-angular NOT angular-hightcharts 
  /*
  highcharts : typeof Highcharts =  Highcharts; 
  oneToOneFlag : boolean = true; // optional boolean, defaults to false
  chart : Highcharts.Chart  =  this.highcharts.chart(this.chartOptions); 
  */
    
  
  constructor(private utilService: UtilService , private authService: AuthService, private feedbackService: FeedbackService) {

    this.utilService.doLoading('Please Wait...'); 

    this.feedbackService.getNotes(this.authService.getCurrentUserUid()).subscribe((notes) => {

      this.totalMoy = 0;  
        
      this.starsResult.voters = notes.length; 

      this.starsResult.friendly = notes.map((value : Note) =>  value.Friendly).reduce((p, c) => p + c, 0);
      this.starsResult.friendlyMoy = parseFloat((this.starsResult.friendly / notes.length).toFixed(2));
      this.results[0] = 

      {"id": 1, "total":this.starsResult.friendly, "moy": this.starsResult.friendlyMoy, "name": "Friendly", "question": "They treat you as a friend, not just a student" }
      
      

     
      this.starsResult.equality = notes.map((value : Note) =>  value.Equality).reduce((p, c) => p + c, 0);
      this.starsResult.equalityMoy = parseFloat((this.starsResult.equality / notes.length).toFixed(2)); 
      this.results[1] = 
      
      {"id": 2, "total":this.starsResult.equality, "moy": this.starsResult.equalityMoy, "name": "Equality", "question": "Treat everyone equally" };

     
      this.starsResult.humour = notes.map((value : Note) =>  value.Humour).reduce((p, c) => p + c, 0);
      this.starsResult.humourMoy = parseFloat((this.starsResult.humour / notes.length).toFixed(2));
      this.results[2]= 
      {"id": 3, "total":this.starsResult.humour, "moy": this.starsResult.humourMoy, "name": "Humor", "question": "Have a sense of humor" };

      this.starsResult.understand = notes.map((value : Note) =>  value.Understand).reduce((p, c) => p + c, 0);  
      this.starsResult.understandMoy = parseFloat((this.starsResult.understand / notes.length).toFixed(2)); 
      this.results[3]= 
      {"id": 4, "total":this.starsResult.understand, "moy": this.starsResult.understandMoy, "name": "Understand", "question": "They don't over-expect; they understand you" };


      this.starsResult.honest = notes.map((value : Note) =>  value.Honest).reduce((p, c) => p + c, 0);  
      this.starsResult.honestMoy = parseFloat((this.starsResult.honest / notes.length).toFixed(2)); 
      this.results[4] = 
      {"id": 5, total:this.starsResult.honest, "moy": this.starsResult.honestMoy, "name": "Honest", "question": "They stick to their word" };

 
      this.starsResult.change = notes.map((value : Note) =>  value.Change).reduce((p, c) => p + c, 0);
      this.starsResult.changeMoy = parseFloat((this.starsResult.change / notes.length).toFixed(2)); 
      this.results[5] =  
      {"id": 6, "total":this.starsResult.change, "moy": this.starsResult.changeMoy, "name": "Change", "question": "They're open to change" };
     
      console.log(this.results);


      // calculate totalMoy
      for(let i = 0; i < 6; i++) {
          this.totalMoy +=  this.results[i].moy;   
       }   
       console.log('MoyT: ', this.totalMoy);
       // this.chart.ref$.subscribe((chart) => chart.update({ 
       this.barChart.ref$.subscribe((chart : Highcharts.Chart ) => chart.update({ 

       subtitle : {
        useHTML: true,
        text :`Voters: <b>${this.starsResult.voters}</b>`
       },
      series: [{
          data: [this.starsResult.friendlyMoy, this.starsResult.equalityMoy, this.starsResult.humourMoy, this.starsResult.understandMoy, this.starsResult.honestMoy, this.starsResult.changeMoy],
          type : 'bar'
      }, {
          data: [this.starsResult.friendly, this.starsResult.equality, this.starsResult.humour, this.starsResult.understand, this.starsResult.honest, this.starsResult.change],
          type : 'bar'
      }
    ]
      }));

      this.pieChart.ref$.subscribe((chart) => chart.update ({
        subtitle: {
            useHTML: true,
            text: `Total Average: <b> ${this.totalMoy} / 30</b>`,
        },

        series: [{
        data: [
            {name:"Friendly", y: (this.starsResult.friendlyMoy * 100) / this.totalMoy },
            {name: "Equality", y: ( this.starsResult.equalityMoy * 100) / this.totalMoy },
            {name:"Humor", y: ( this.starsResult.humourMoy * 100 ) / this.totalMoy },
            {name: "Understand", y: ( this.starsResult.understandMoy * 100 ) / this.totalMoy },
            {name:"Honest", y:  ( this.starsResult.honestMoy * 100 ) / this.totalMoy},
            {name: "Change", y: ( this.starsResult.changeMoy * 100 ) / this.totalMoy}
        ],
        type: 'pie'
             }]
      })); 

 }); 


   }


   /*upadateCharts() : void {

       this.chartOptions.subtitle.text = `<b> ${this.starsResult.voters}</b>`;
         for(let j = 0; j < 6; j++) {
          console.log(this.starsResult[j].total);
            this.chartOptions.series[0].data[j] = this.starsResult[j].total;
            this.chartOptions.series[1].data[j] = this.starsResult[j].moy;      
       }   */

   

  

  ngOnInit() {

   
}

}
