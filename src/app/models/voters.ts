export class Voters {

    studentUID : string; 
    professorUID : string;
    prevTotal?: number;
    studentVote?: boolean;

    constructor() {
        this.studentVote = false;
    }
}