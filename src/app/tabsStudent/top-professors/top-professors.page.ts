import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';
import { Professor } from 'src/app/models/professor';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from 'src/app/models/notes';

export class TopProfessors  {
  id: string; 
  name: string; 
  aboutMe: string;
  email : string; 
  totalStars : number;
}

export class tempTopProfessors {
  id: string;
  totalStarts : number
}

@Component({
  selector: 'app-top-professors',
  templateUrl: './top-professors.page.html',
  styleUrls: ['./top-professors.page.scss'],
})
export class TopProfessorsPage implements OnInit {


  topProfessors : TopProfessors[] = new Array<TopProfessors>();
  temp = new Array<tempTopProfessors>(); 

  professors$ : Observable<Professor[]>;

  notes: Observable<Note[]>; 
  
  totalStars : number = 0; 


  uids : string[];
  totalS : number[];

  uid : string;       


  studentVote: boolean

  constructor(
     private userService: UserService,
     private utilService: UtilService,   
     ) { }

  ngOnInit() : void {
    this.utilService.doLoading('Please Wait...');
    this.professors$ = this.userService.getToProfessors().snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() as Professor; 
        const uid = a.payload.doc.id; 
        return {uid, ...data}; 
      }))); 
       
  }

}



 /*
    this.utilService.doLoading('Please Wait...');
    this.professors = this.userService.getAllUsers('professors').snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() as Professor; 
        const uid = a.payload.doc.id; 
        return {uid, ...data}; 
      })));
      
      this.professors.subscribe((professors: Professor[]) => professors.map((professor : Professor) => {
      
       // all uinque uids
       // this.uids = professors.map((professor) => professor.uid).filter((value, index, array) => array.indexOf(value) === index ); 
      
       this.notes = this.feedbackService.getNotes(professor.uid); 

       this.notes.subscribe((notes : Note[]) => {
      
        notes.map(note => {

        this.totalStars = note.Change + note.Equality + note.Friendly + note.Honest + note.Humour + note.Understand; 
        this.temp.push({id: professor.uid, totalStarts: this.totalStars});
        // only uids they have notes
        let  total; 
        this.uids = this.temp.map((value) => value.id).filter((value, index, array) => array.indexOf(value) === index); 
        
        /* this.uids.forEach((uid, index, array) => {
          total.push(this.temp.filter((value) => value.id === uid).map((value, index, array) => value.totalStarts).reduce((p, c) => p +c ))
        });  */
        
        // console.log('uids: ', this.uids, 'totla', total);


      

        /*

        this.topProfessors.push(
        { "id": professor.uid, "name": professor.name, "email": professor.email, "totalStars": this.totalStars, "aboutMe": professor.aboutMe }
        )
      
        // console.log(this.topProfessors);
      })


      });

  }))
  
} */
  

