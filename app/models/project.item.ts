import { DbItem } from './db.item';

export class Project extends DbItem {

    name: string;
    description: string;
    git: string;
    url: string;
    private: boolean;
    owner: string;

    constructor(data: any) {
        super(data.id);
        this.name        = data.name;
        this.description = data.description;
        this.git         = data.git;
        this.url         = data.url;
        this.private     = (typeof data.private === 'number') ? ((data.private === 1)? true : false) : data.private;
        this.owner       = data.owner;
    }
}
