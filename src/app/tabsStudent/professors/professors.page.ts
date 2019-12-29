import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/models/professor';
import { UtilService } from 'src/app/services/util/util.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IonItemSliding } from '@ionic/angular'; // to close the items 
import { EmailService } from 'src/app/services/email/email.service';
import { Student } from 'src/app/models/student';


@Component({
  selector: 'app-professors',
  templateUrl: './professors.page.html',
  styleUrls: ['./professors.page.scss'],
})
export class ProfessorsPage implements OnInit {

  @ViewChild(IonItemSliding, {static: false}) ItemSliding: IonItemSliding;

  professors$ : Observable<Professor[]>;
  professors : Professor[] = new Array<Professor>();
  filteredProfessors : Professor[] = new Array<Professor>();
  student: Student = new Student(); 
  isfiltered : boolean;
  uid : string;    
  searchQuery: string;

  studentVote: boolean

  constructor(
     private userService: UserService,
     private utilService: UtilService,
     public feedbackService: FeedbackService,
     private router: Router,
     private emailService: EmailService 
     ) { }

    closeOpened() : Promise<boolean> {
          return this.ItemSliding.closeOpened();
    }

 
  giveFeedback(professor: Professor) : void {
    
    console.log('professor', professor); 
   // this.userService.getProfessor(key).valueChanges().subscribe((professor) =>  { 
   // this.feedbackService.getProfessorNotesCollection(key).doc(this.uid).get().subscribe((doc) => {
   // this.studentVote = doc.exists; 
  
    this.feedbackService.voters = {

      studentUID : this.uid,
      professorUID : professor.uid,
      prevTotal : professor.totalStars ? professor.totalStars : 0
        //  studentVote : doc.exists
        }
    //  }); 
   // }); 
    console.log(this.feedbackService.voters); 
    
    this.router.navigateByUrl('/feedback').catch(err =>{
    console.log(err);
     this.utilService.doAlert('Error', err, 'Ok')
    });
    this.closeOpened().then((ok : boolean) => console.log(ok));  
}

 getFiltred() : Professor[] {
   return this.filteredProfessors;
 }
 
  search(event: any)  {
    let query : string =  event.target.value;
      var filteredJson : Professor[] = this.professors.filter(professor => {
        if(professor.name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          return true;
        } else {
          return false;
        }
      });
       this.isfiltered = true;
       this.filteredProfessors = filteredJson;
        this.getFiltred(); 
    }

  getStudent(uid: string) {
    
  }  
    
  sendEmail(professor :Professor) : void {
    let to : string = professor.email;
    this.userService.getUser('students').valueChanges().subscribe((student : Student) => {
    let cc : string = student.email; 
    this.emailService.sendEmail(to, cc).then((ok) => console.log(ok)).catch((err) => { console.error(err) });
    }); 
} 
  
  ngOnInit() : void {

    this.utilService.doLoading('Please Wait...');
     this.professors$ =  this.userService.getAllUsers('professors').snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() as Professor; 
        const uid = a.payload.doc.id; 
        return {uid, ...data}; 
      })))
      this.professors$.subscribe((professors : Professor[]) => { console.log('list of professors', professors);  this.professors = professors}); 
      this.uid = this.userService.getUID();

  }


}
