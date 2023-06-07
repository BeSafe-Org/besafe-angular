export class File {
    userId: string;
    fileId: string;
    fileName: string;
    mimeType: string;
    deleted: boolean;
    starred: boolean;
    ultraSecure: boolean;
  
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
  