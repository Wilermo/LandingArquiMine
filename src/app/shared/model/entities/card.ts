export class Card {

    public id : number = -1;
    public cardHolder: string = '';
    public cardNumber: string = '';
    public cardMonth: string = '';
    public cardYear: string = '';
    public cardCvc: string = '';
    public autoRenewal: number = 0;
    public holderEmail: string | null= '';

    constructor();
    constructor(cardholder: string, cardNumber: string, cardMonth: string, cardYear: string, cardCvc: string, autoRenewal: number,holderemail: string);
    constructor(cardholder?: string, cardNumber?: string, cardMonth?: string, cardYear?: string, cardCvc?: string, autoRenewal?: number, holderemail?: string) {
      if (cardholder) this.cardHolder = cardholder;
      if (cardNumber) this.cardNumber = cardNumber;
      if (cardMonth) this.cardMonth = cardMonth;
      if (cardYear) this.cardYear = cardYear;
      if (cardCvc) this.cardCvc = cardCvc;
      if (autoRenewal !== undefined) this.autoRenewal = autoRenewal;
      if (holderemail) this.holderEmail = holderemail;
    }
  }
