import Customer from "./Customer";

interface Species {
  speciesId: number;
  speciesCode: string;
  commonName: string;
  scientificName: string;
  aliasName: string;
  conservationStatus: string;
  speciesClass: string;
  nativeContinent: string;
  educationalDescription: string;
  educationalFunFact: string;
  habitatOrExhibit: string;
  imageUrl: string;

  customers?: Customer[];
}

export default Species;
