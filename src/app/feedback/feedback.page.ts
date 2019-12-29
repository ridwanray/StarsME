import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback/feedback.service';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Quality } from '../models/quality';
import { UtilService } from '../services/util/util.service';
import { Router } from '@angular/router';
import { Voters } from '../models/voters';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  professor$ : Observable<Professor>;
  qualities$ : Observable<Quality[]>;  
  feedbackForm : FormGroup; 
  studentGiveFeedBack : boolean = false; 
  
  voters : Voters; 

  constructor(
    private router: Router,
    private utilService: UtilService,
    private fb: FormBuilder,
    private userService: UserService,
    private feedbackService: FeedbackService,
     )
    { }

    // prevTotal : number; 
    studentVote: boolean;

  // https://www.theodysseyonline.com/10-qualities-of-great-professor
  //1. They treat you as a friend, not just a student.
  //2. Perfect balance of control
  createFrom () : void {
    this.feedbackForm = this.fb.group({
      Friendly : [0], 
      Equality: [0],
      Humour: [0],
      Understand: [0],
      Honest:[0],
      Change: [0]
    });
  }

  totalStarts() : number {
    let form = this.feedbackForm.value
    return (form['Friendly'] + form['Equality'] +  form['Humour'] +  form['Understand'] + form['Honest'] + form['Change']); 
  }

  sendFeedback() : void  {

    console.log('feedBackForm' ,  this.feedbackForm.value);
    // add note
    this.feedbackService.addNote(this.feedbackForm.value, this.voters.professorUID, this.voters.studentUID).then(()=> {
      let stars : number = this.voters.prevTotal + this.totalStarts(); 
      console.log('stars: ', stars);
      this.studentVote = this.feedbackService.voters.studentVote = true; 
      this.feedbackService.addTotalStars(stars, this.voters.professorUID);
      this.utilService.doAlert('Success', '<b>Thank You you</b><br>for giving your feedback', 'Ok'); 
      this.router.navigateByUrl('/tabsStudent/professors'); 

  }).catch((reason)=> this.utilService.doAlert('Error', reason, 'Ok')); 

  }

  back() : void {
    this.router.navigateByUrl('/tabsStudent/professors'); 
  }

  ngOnInit() {

      this.utilService.doLoading('Please Wait...');
      // get UIDS; 
      this.createFrom();
      console.log('voters', this.feedbackService.voters);
      this.voters = this.feedbackService.voters;
      this.professor$ = this.userService.getProfessor(this.voters.professorUID).valueChanges(); 
      this.qualities$ = this.feedbackService.getQualites(); 
    
     
    }   
  
  
  }
