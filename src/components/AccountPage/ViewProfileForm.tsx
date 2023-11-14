import { useToast } from "@/components/ui/use-toast";
import * as Form from "@radix-ui/react-form";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countryValueLabelPair } from "../../enums/Country";
import useApiFormData from "../../hooks/useApiFormData";
import Customer from "../../models/Customer";
import FormFieldSelect from "../FormFieldSelect";

interface ViewCustomerFormProps {
  currCustomer: Customer;
}

function ViewProfileForm(props: ViewCustomerFormProps) {
  const apiFormData = useApiFormData();

  const { currCustomer } = props;

  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  //view --> disabled, editing --> not disabled
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>(currCustomer.email);
  const [firstName, setFirstName] = useState<string>(currCustomer.firstName);
  const [lastName, setLastName] = useState<string>(currCustomer.lastName);
  const [contactNo, setContactNo] = useState<string>(currCustomer.contactNo);
  //   const [birthday, setBirthday] = useState<string>("");
  const [birthday, setBirthday] = useState<string | Date | Date[] | null>(
    new Date(currCustomer.birthday),
  );
  // const [address, setAddress] = useState<string>(currCustomer.address);
  const [nationality, setNationality] = useState<string | undefined>(
    currCustomer.nationality,
  );

  console.log("currCustomer.birthday");
  console.log(currCustomer.birthday);

  function clearForm() {
    setEmail("");
    setFirstName("");
    setLastName("");
    setContactNo("");
    setBirthday("");
    setNationality(undefined);
  }

  // ValidityState properties: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
  function validateEmail(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter an e-mail
          </div>
        );
      } else if (props.typeMismatch) {
        return (
          <div className="font-medium text-red-600">
            * Invalid e-mail format
          </div>
        );
      }
    }
    return null;
  }

  function validateFirstName(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter your first name
          </div>
        );
      }
    }
    return null;
  }

  function validateLastName(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter your last name
          </div>
        );
      }
    }
    return null;
  }

  function validateContactNo(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter a contact number
          </div>
        );
      } else if (props.patternMismatch) {
        return (
          <div className="font-medium text-danger">
            * Please enter 8-digit phone number
          </div>
        );
      }
    }
    return null;
  }

  // function validateBirthday(props: ValidityState) {
  //   if (props != undefined) {
  //     if (props.valueMissing) {
  //       return (
  //         <div className="font-medium text-red-600">
  //           * Please enter a birthday
  //         </div>
  //       );
  //     }
  //   }
  //   return null;
  // }

  function validateAddress(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter an address
          </div>
        );
      }
    }
    return null;
  }

  function validateNationality(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please select a nationality
          </div>
        );
      }
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/editProfile");
  }

  return (
    <div className="flex w-full justify-center">
      {/* <h2>My Profile</h2> */}
      <Form.Root className="w-4/5" onSubmit={handleSubmit}>
        <Form.Field name="email" className="mb-5 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            E-mail
          </Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Type your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
            disabled={isDisabled}
          />
          {/* <Form.Message name="email" match={"valueMissing"}>
              Please enter an email
            </Form.Message> */}
          <Form.ValidityState>{validateEmail}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="firstName" className="mb-5 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            First Name
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Type your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
            disabled={isDisabled}
          />
          <Form.ValidityState>{validateFirstName}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="lastName" className="mb-5 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Type your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isDisabled}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateLastName}</Form.ValidityState>
        </Form.Field>

        {/* <Form.Field name="dateOfBirth" className="mb-5 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Date of Birth
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="MM/DD/YYYY"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateLastName}</Form.ValidityState>
        </Form.Field> */}

        <div className="card justify-content-center mb-5 flex flex-col">
          <div>Birthday</div>

          <Calendar
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 text-black placeholder-black"
            value={birthday}
            disabled={isDisabled}
            onChange={(e: CalendarChangeEvent) => {
              if (e && e.value !== undefined) {
                setBirthday(e.value);
                console.log(e.value);
              }
            }}
          />
        </div>

        <Form.Field name="contactNo" className="mb-5 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Contact Number
          </Form.Label>
          <Form.Control
            type="text"
            required
            disabled={isDisabled}
            placeholder="eg. 9012XXXX"
            value={contactNo}
            pattern="[0-9]{7-15}"
            onChange={(e) => setContactNo(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateContactNo}</Form.ValidityState>
        </Form.Field>

        {/* <Form.Field name="address" className="mb-5 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Address
          </Form.Label>
          <Form.Control
            type="text"
            required
            disabled={isDisabled}
            placeholder="eg. 1 Pasir Ris #01-01"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateAddress}</Form.ValidityState>
        </Form.Field> */}

        <FormFieldSelect
          formFieldName="nationality"
          label="Nationality"
          required={true}
          isDisabled
          placeholder="Select your nationality..."
          valueLabelPair={countryValueLabelPair}
          value={nationality}
          setValue={setNationality}
          validateFunction={validateNationality}
        />

        <Form.Submit asChild>
          <button className="mt-10 h-12 w-full rounded-md border bg-black text-whiter">
            {isDisabled ? "Edit my profile" : "Confirm edit"}
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default ViewProfileForm;
