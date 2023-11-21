interface OfferData {
    _id: String
    title: String
    id_company : Number
    srcImgCompany : String 
    company : String 
    location : String 
    start_date : Date
    created_date : Date
    sector : String
    type : String
    description : String
    remuneration : Number
    duration : String
    softSkills : String[]
    domains : String[]
}

export class Offer {
    id: String | undefined;
    title: String = new String();
    company : String = new String();
    id_company : number | undefined;
    srcImgCompany : String = new String();
    location : String = new String();
    start_date : Date = new Date();
    created_date : Date = new Date();
    sector : String = new String();
    type : String = new String();
    description : String = new String();
    remuneration : Number | undefined;
    duration : String = new String();
    softSkills : String[] | undefined;
    domains : String[] | undefined;


    print() {
        console.log("id: " + this.id)
        console.log("title: " + this.title)
        console.log("company: " + this.company)
        console.log("id_company: " + this.id_company)
        console.log("srcImgCompany: " + this.srcImgCompany)
        console.log("location: " + this.location)
        console.log("start_date: " + this.start_date)
        console.log("created_date: " + this.created_date)
        console.log("sector: " + this.sector)
        console.log("type: " + this.type)
        console.log("description: " + this.description)
        console.log("duration: " + this.duration)
        console.log("remuneration: " + this.remuneration)
        console.log("softSkills: " + this.softSkills)
        console.log("domains: " + this.domains)
    }

    fromHashMap(data: OfferData) {
        this.id = String(data._id);
        this.title = String(data.title);
        this.id_company = Number(data.id_company);
        this.srcImgCompany = String(data.srcImgCompany);
        this.company = String(data.company);
        this.location = String(data.location);
        this.start_date = data.start_date;
        this.created_date = data.created_date;
        this.sector = String(data.sector);
        this.type = String(data.type);
        this.description = String(data.description);
        this.remuneration = Number(data.remuneration);
        this.duration = String(data.duration);
        this.softSkills = data.softSkills
        this.domains = data.domains
        
    }
}