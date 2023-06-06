export class Result{
    errorCode: number;
    errorMessage: string

    constructor(erroCode?: number, errorMessage?: string){
    this.errorCode = erroCode;
    this.errorMessage = errorMessage;
    }
}