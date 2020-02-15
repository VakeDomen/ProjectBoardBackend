const uuidv4 = require('uuid/v4');

export class DbItem {

    id: string;

    constructor(id: string){
        this.id = id;
    }    

    generateId(): string {
        this.id = uuidv4();
        return this.id;
    }

    isEmpty(): boolean {
        for(let data in this){
            if(typeof this[data] !== 'undefined'){
                return false;
            }
        }
        return true;
     }

    valuesToString(): string {
        var str = "";
        for(let key of Object.keys(this)){
            if(typeof this[key] !== "undefined"){
                if(str !== "") str += ", ";
                if(key !== "id") str+= key + " = " + "'" + this[key] + "'";
            }
        }
        return str;
    }
    
    listKeys(): string{
       var str = "";
       for(let data of Object.keys(this)){
           if(typeof this[data]!= "undefined"){
               if(str != "") str += ", " + data ;
               else str += data ;
           }
       }
       return str;
    }

    listValues(): string{
       var str = "";
       for(let data of Object.keys(this)){
           if(typeof this[data]!= "undefined"){
               if(str != "") str += ", \'" + this[data] + "\'";
               else str += "\'" + this[data] + "\'";
           }
       }
       return str;
    }

    whereString(): string{
        var str = "";
        for(let data in this){
            if(typeof this[data] != "undefined"){
                if(typeof this[data] === "number"){
                    if(str != "") str += "AND '" + data + "' = '" + this[data] + "'";
                    else str += data + " = " + this[data];
                }else{
                    if(str != "") str += "AND '" + data + "' = '" + this[data] + "'";
                    else str += data + " = '" + this[data] + "'";
                }
            }
        }
        if(str == "") str = "1";
        return str;
    }

}
