export class Employee {
  constructor(
    public id : number,
    public name : string| null,
    public surname : string| null,
    public phoneNumber : string,
    public supportTicketsId : number,
    public benefitsId : number,
    public contractId : number,
    public planId : number,
    public companyId : number | null,
    public department : string,

    public username : string| null,

    public emergencycontact : number,
    public nameemergencycontact : string

  ){

  }
}
