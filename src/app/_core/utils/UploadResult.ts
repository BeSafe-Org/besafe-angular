import { Result } from "./Result";

export class UploadResult extends Result {
    id: string;
    name: string;
    mimeType: string;
    constructor(id?: string, name?: string, mimeType?: string) {
        super();
        this.id = id;
        this.name = name;
        this.mimeType = mimeType;
    }
}