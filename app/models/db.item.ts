
export class DbItem {

    id: string;

    constructor(id: string){
        this.id = id;
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
        for(let data in this){
            if(typeof this[data] != "undefined"){
                if(str != "") str += ", ";
                if(data != "id") str+= data + " = " + "'" + this[data] + "'";
            }
        }
        return str;
    }
    
    hasValue(value: string): boolean{
        for(let data in this){
            if( data == value){
                return true;
            }
        }
        return false;
    }

    listKeys(): string{
       var str = "";
       for(let data in this){
           if(typeof this[data]!= "undefined"){
               if(str != "") str += ", " + data ;
               else str += data ;
           }
       }
       return str;
    }

    listValues(): string{
       var str = "";
       for(let data in this){
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
