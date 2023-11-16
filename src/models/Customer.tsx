// import { Country } from "../enums/Country";

import Species from "./Species";

// interface Customer {
//   customerId: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   contactNo: string;
//   birthday: Date;
//   address: string;
//   nationality: string;
// }

// export default Customer;

interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  birthday: Date;
  nationality: string;

  species?: Species[];
}

export default Customer;
