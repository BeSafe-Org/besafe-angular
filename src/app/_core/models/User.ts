export class User {
    private userId: string;
    private userName: string;
    private userEmail: string;
    private dob: string;
    private joinedOn: string;
    private userSalt: string;
    private userDigest: string;
  
    constructor(
      userId: string,
      userName: string,
      userEmail: string,
      dob: string,
      joinedOn: string,
      userSalt: string,
      userDigest: string
    ) {
      this.userId = userId;
      this.userName = userName;
      this.userEmail = userEmail;
      this.dob = dob;
      this.joinedOn = joinedOn;
      this.userSalt = userSalt;
      this.userDigest = userDigest;
    }
}