export class Card {
    public cardholder: string = '';
    public cardNumber: string = '';
    public cardMonth: string = '';
    public cardYear: string = '';
    public cardCvc: string = '';
    public autoRenewal: boolean = false;
  
    constructor();
    constructor(cardholder: string, cardNumber: string, cardMonth: string, cardYear: string, cardCvc: string, autoRenewal: boolean);
    constructor(cardholder?: string, cardNumber?: string, cardMonth?: string, cardYear?: string, cardCvc?: string, autoRenewal?: boolean) {
      if (cardholder) this.cardholder = cardholder;
      if (cardNumber) this.cardNumber = cardNumber;
      if (cardMonth) this.cardMonth = cardMonth;
      if (cardYear) this.cardYear = cardYear;
      if (cardCvc) this.cardCvc = cardCvc;
      if (autoRenewal !== undefined) this.autoRenewal = autoRenewal;
    }
  }
  