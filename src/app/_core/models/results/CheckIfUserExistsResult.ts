import { Result } from "./Result";

export class CheckIfUserExistsResult extends Result{
    userExists: boolean

    constructor(isUserExists?: boolean){
        super();
        this.userExists = isUserExists;
    }
}