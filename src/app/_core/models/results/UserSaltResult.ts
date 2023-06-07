import { Result } from "./Result";

export class UserSaltResult extends Result{
    userSalt: string;

    constructor(userSalt?: string){
        super();
        this.userSalt = userSalt;
    }
}