import { Injectable } from '@angular/core';
import { Voters } from 'src/app/models/voters';
import { Quality } from 'src/app/models/quality';
import { HttpClient  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Note } from 'src/app/models/notes';
import { map, catchError } from 'rxjs/operators';
import { Professor } from 'src/app/models/professor';
import { UtilService } from '../util/util.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  protected readonly PROFESSORS_COLLECTION = "professors";
  protected readonly NOTES_COLLECTION = "notes"; 
  protected readonly STUDENTS_COLLECTION = "students"; 

  public voters : Voters = new Voters(); 
  public selectedQuality : Quality = new Quality(); 


  constructor(private afs : AngularFirestore, private http: HttpClient, private userService: UserService) {
    this.voters.studentUID = userService.getUID(); 
  }
  
   getProfessorNotesCollection(id: string) : AngularFirestoreCollection<Note> {
     return this.afs.collection(this.PROFESSORS_COLLECTION + `/${id}/` + this.NOTES_COLLECTION);

   }  

   getQualites() : Observable<Quality[]> {
     
    return this.http.get<Quality[]>("assets/qualities.json");
  }


  public get timestamp() : number {
    return new Date().getTime();
  }

  /* 
  addNoteRef(professorUID: string,  StudentUID: string) {

     this.afs.collection(this.STUDENTS_COLLECTION + `/${StudentUID}/notes/`); 
     
  } */

  addNote(note, professorUID: string, StudentUID: string) : Promise<void> {
    return this.getProfessorNotesCollection(professorUID).doc<Note>(StudentUID).set({
      ...note,
      created_at : this.timestamp,
      updated_at : this.timestamp
    });

  }

  addTotalStars(total: number, professorUID: string) : Promise<void> {
    return this.afs.doc<Professor>(this.PROFESSORS_COLLECTION + `/${professorUID}/`).update({totalStars: total}); 
  }

  editNote(note,  ProfessorUID : string, StudentUID: string) : Promise<void>  {
    return this.getProfessorNotesCollection(ProfessorUID).doc<Note>(StudentUID).update({
      ...note,
      updated_at : this.timestamp
    });
  }

  deleteNote(ProfessorUID : string, StudentUID: string): Promise<void> {
  return this.getProfessorNotesCollection(ProfessorUID).doc(StudentUID).delete();

  }


  getNote(ProfessorUID : string, StudentUID: string) : Observable<Note> {
    return this.getProfessorNotesCollection(ProfessorUID).doc(StudentUID).snapshotChanges().pipe(map(snapshot  => {
      const data = snapshot.payload.data() as Note;
      const id = snapshot.payload.id; 
      return {id, ...data};

    }),catchError(e => throwError(e))
    );
  }

  getNotes(ProfessorUID : string) : Observable<Note[]> {
    return this.getProfessorNotesCollection(ProfessorUID).valueChanges(); 
}


}
