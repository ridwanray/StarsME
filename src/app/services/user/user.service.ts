import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { registerFrom } from 'src/app/models/registerFrom';
import { Professor } from 'src/app/models/professor';
import { Student } from 'src/app/models/student';

@Injectable()

export class UserService {

  
  constructor(private afs : AngularFirestore, private auth: AuthService) { 

  }

    // Get current user's uid form the storage === uid in db.
    getUID() : string {
        // console.log('storage keys:', this.storage.keys());
        // console.log('getCurrentUserUid', this.auth.getCurrentUserUid());
        return this.auth.getCurrentUserUid();
    }

    createUserWithProvider(data: firebase.auth.UserCredential) : void {
       console.log('profile', data.additionalUserInfo.profile); 
       let studentDoc = this.afs.doc(`/students/${data.user.uid}`); 
        studentDoc.get().subscribe((doc) => {
        
        // new user
        if(! doc.exists) {
          let newUser = {
            email : data.user.email ? data.user.email  :  '', 
            name: data.user.displayName, 
            tel : data.user.phoneNumber ? data.user.phoneNumber : '', 
            picture: data.user.photoURL,
            provider : data.credential.providerId,
            created_at: data.user.metadata.creationTime,
            last_seen: data.user.metadata.lastSignInTime
          }
            studentDoc.set(newUser); 
      } else {
          studentDoc.update({last_seen: data.user.metadata.lastSignInTime}); 
      }
    }); 
  }

    //create User in firebase with infos  
    createUser(registerFrom : registerFrom ) : void {

        let newUser = {
          email: registerFrom.email, 
          name : registerFrom.name,
          created_at: new Date().getTime() / 1000, 
          tel : '',
          address : '',
          aboutMe:''  
        }

        if(registerFrom.role) {
          let professorDoc  = this.afs.doc(`/professors/${this.getUID()}`)
          professorDoc.set(newUser); 
        } else {
          let studentDoc = this.afs.doc(`/students/${this.getUID()}`)
          studentDoc.set(newUser); 
        }
    }
    
    //get info of the current user 
     getUser(user : string) : AngularFirestoreDocument<Professor | Student> {
        return this.afs.doc<Professor | Student>(`/${user}/${this.getUID()}`);

    } 

    getAllUsers(user : string) : AngularFirestoreCollection<Professor | Student> {
      return this.afs.collection<Professor | Student>(`/${user}`);
    }

    // get a student by ID 
    getStudent(id: string): AngularFirestoreDocument<Student> {
      return this.afs.doc<Student>(`/students/${id}`); 
    }

    // get Professor By ID 
    getProfessor(id: string): AngularFirestoreDocument<Professor> {
      return this.afs.doc<Professor>(`/professors/${id}`);
    }

    // get Top Professors 
    getToProfessors() : AngularFirestoreCollection<Professor>  {
      return this.afs.collection<Professor>('/professors', query => query.orderBy("totalStars", "desc"));
    }





}
