import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Note } from 'src/app/models/notes';
import { StarsResult } from  'src/app/models/starsResult'; 
import { UtilService } from 'src/app/services/util/util.service';


export interface Result  {
  id: number; 
  total: number; 
  moy : number; 
  name : string;
  question : string; 
}

@Component({
  selector: 'app-stars',
  templateUrl: './stars.page.html',
  styleUrls: ['./stars.page.scss'],
})
export class StarsPage implements OnInit {

  results : Result[] = new Array<Result>();  

  starsResult : StarsResult = new StarsResult();

  constructor(private utilService: UtilService , private authService: AuthService, private feedbackService: FeedbackService) {

    this.utilService.doLoading('Please Wait...'); 
    
    this.feedbackService.getNotes(this.authService.getCurrentUserUid()).subscribe((notes) => {

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
  }); 

   }


  ngOnInit() {

   
}

}
