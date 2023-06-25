export class BeSafeFile {
    userId: string;
    fileId: string;
    fileName: string;
    mimeType: string;
    deleted: boolean;
    starred: boolean;
    ultraSafe: boolean;
  
    constructor(
      userId?: string,
      fileId?: string,
      fileName?: string,
      mimeType?: string,
      deleted?: boolean,
      starred?: boolean
    ) {
      this.userId = userId;
      this.fileId = fileId;
      this.fileName = fileName;
      this.mimeType = mimeType;
      this.deleted = deleted;
      this.starred = starred;
    }
  }
  