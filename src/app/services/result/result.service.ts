import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Note } from 'src/app/models/notes';
import { FeedbackService } from '../feedback/feedback.service';
import { StarsResult } from 'src/app/models/stars';
import { Result } from 'src/app/tabsProfessor/stats/stats.page';

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  results : Result[] = new Array<Result>();  

  starsResult : StarsResult = new StarsResult();


  constructor(private authService: AuthService, private feedbackService: FeedbackService) { 

    this.collectResult(); 

  }


  getStarsResult()  {

    return this.starsResult; 
  }


    collectResult()   {
      
    this.feedbackService.getNotes(this.authService.getCurrentUserUid()).subscribe((notes) => {

      this.starsResult.voters = notes.length; 

      this.starsResult.friendly = notes.map((value : Note) =>  value.Friendly).reduce((p, c) => p + c);
      this.starsResult.friendlyMoy = parseFloat((this.starsResult.friendly / notes.length).toFixed(2));
      this.results[0] = 

      {"id": 1, "total":this.starsResult.friendly, "moy": this.starsResult.friendlyMoy, "name": "Friendly", "question": "They treat you as a friend, not just a student" }
      
      

     
      this.starsResult.equality = notes.map((value : Note) =>  value.Equality).reduce((p, c) => p + c);
      this.starsResult.equalityMoy = parseFloat((this.starsResult.equality / notes.length).toFixed(2)); 
      this.results[1] = 
      
      {"id": 2, "total":this.starsResult.equality, "moy": this.starsResult.equalityMoy, "name": "Equality", "question": "Treat everyone equally" };

     
      this.starsResult.humour = notes.map((value : Note) =>  value.Humour).reduce((p, c) => p + c);
      this.starsResult.humourMoy = parseFloat((this.starsResult.humour / notes.length).toFixed(2));
      this.results[2]= 
      {"id": 3, "total":this.starsResult.humour, "moy": this.starsResult.humourMoy, "name": "Humor", "question": "Have a sense of humor" };

      this.starsResult.understand = notes.map((value : Note) =>  value.Understand).reduce((p, c) => p + c);  
      this.starsResult.understandMoy = parseFloat((this.starsResult.understand / notes.length).toFixed(2)); 
      this.results[3]= 
      {"id": 4, "total":this.starsResult.understand, "moy": this.starsResult.understandMoy, "name": "Understand", "question": "They don't over-expect; they understand you" };


      this.starsResult.honest = notes.map((value : Note) =>  value.Honest).reduce((p, c) => p + c);  
      this.starsResult.honestMoy = parseFloat((this.starsResult.honest / notes.length).toFixed(2)); 
      this.results[4] = 
      {"id": 5, total:this.starsResult.honest, "moy": this.starsResult.honestMoy, "name": "Honest", "question": "They stick to their word" };

 
      this.starsResult.change = notes.map((value : Note) =>  value.Change).reduce((p, c) => p + c);
      this.starsResult.changeMoy = parseFloat((this.starsResult.change / notes.length).toFixed(2)); 
      this.results[5] =  
      {"id": 6, "total":this.starsResult.change, "moy": this.starsResult.changeMoy, "name": "Change", "question": "They're open to change" };
     
     
          }); 

            return this.results; 
    }
 


}
