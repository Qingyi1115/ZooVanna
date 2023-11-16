import Customer from "./Customer";

interface Itinerary {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  birthday: Date;
  nationality: string;

  customer?: Customer;
}

export default Itinerary;
