const DbItem = require("./db.item");

class Project extends DbItem {

    name: string;
    description: string;
    git: string;
    url: string;
    private: boolean;

    constructor(data: any) {
        super(data.id);
        this.name        = data.name;
        this.description = data.description;
        this.git         = data.git;
        this.url         = data.url;
        this.private     = data.private;
    }
}

module.exports = Project;