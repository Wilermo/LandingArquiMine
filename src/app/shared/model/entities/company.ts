export interface company {
  id?: number;
  nameCompany: string;
  nit: number;
  nameLegalRepresentative: string;
  idLegalRepresentative: number,
  email: string;
  phoneCompany: number;
  numWorkers: number;
  address: string;
  linkDate: string;
  subscriptionEndDate: string;
  status: string;

  planId: number | undefined;
}
