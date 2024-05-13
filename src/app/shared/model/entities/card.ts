export class Card {

    public id : number = -1;
    public cardholder: string = '';
    public cardnumber: string = '';
    public cardmonth: string = '';
    public cardyear: string = '';
    public cardcvc: string = '';
    public autorenewal: boolean = false;
    public holderemail: string | null= '';

    constructor();
    constructor(cardholder: string, cardNumber: string, cardMonth: string, cardYear: string, cardCvc: string, autoRenewal: boolean,holderemail: string);
    constructor(cardholder?: string, cardNumber?: string, cardMonth?: string, cardYear?: string, cardCvc?: string, autoRenewal?: boolean, holderemail?: string) {
      if (cardholder) this.cardholder = cardholder;
      if (cardNumber) this.cardnumber = cardNumber;
      if (cardMonth) this.cardmonth = cardMonth;
      if (cardYear) this.cardyear = cardYear;
      if (cardCvc) this.cardcvc = cardCvc;
      if (autoRenewal !== undefined) this.autorenewal = autoRenewal;
      if (holderemail) this.holderemail = holderemail;
    }
  }
