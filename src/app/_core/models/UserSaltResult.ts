import { Result } from "./Result";

export class GenerateUserSaltResult extends Result{
    userSalt: string;

    constructor(userSalt?: string){
        super();
        this.userSalt = userSalt;
    }
}