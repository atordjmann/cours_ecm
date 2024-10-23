interface CompanyData {
    _id: String
    login: String
    hash : String
    name : String 
    created_date : Date
}

export class Company {
    id: String | undefined;
    login: String = new String();
    hash : String = new String();
    name : String  = new String();
    created_date : Date = new Date();

    print() {
        console.log("id: " + this.id)
        console.log("login: " + this.login)
        console.log("hash: " + this.hash)
        console.log("name: " + this.name)
        console.log("created_date: " + this.created_date)
    }

    fromHashMap(data: CompanyData) {
        this.id = String(data._id);
        this.login = String(data.login);
        this.hash = String(data.hash);
        this.name = String(data.name);
        this.created_date = data.created_date;
    }
}