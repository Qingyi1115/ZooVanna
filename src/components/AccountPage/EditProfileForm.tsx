import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { useToast } from "@/components/ui/use-toast";
import useApiJson from "../../hooks/useApiJson";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import FormFieldSelect from "../FormFieldSelect";
import { countryValueLabelPair } from "../../enums/Country";
import { clear } from "console";
import Customer from "../../models/Customer";
import useApiFormData from "../../hooks/useApiFormData";

interface EditCustomerFormProps {
  currCustomer: Customer;
}

function EditProfileForm(props: EditCustomerFormProps) {
  const apiJson = useApiJson();

  const { currCustomer } = props;

  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  //view --> disabled, editing --> not disabled
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(currCustomer.email);
  const [firstName, setFirstName] = useState<string>(currCustomer.firstName);
  const [lastName, setLastName] = useState<string>(currCustomer.lastName);
  const [contactNo, setContactNo] = useState<string>(currCustomer.contactNo);
  //   const [birthday, setBirthday] = useState<string>("");
  const [birthday, setBirthday] = useState<string | Date | Date[] | null>(
    new Date(currCustomer.birthday),
  );
  const [address, setAddress] = useState<string>(currCustomer.address);
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
    setAddress("");
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
      } else if (props.patternMismatch) {
        return (
          <div className="font-medium text-danger">
            * Please enter at least 2 characters
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
      } else if (props.patternMismatch) {
        return (
          <div className="font-medium text-danger">
            * Please enter at least 2 characters
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
            * Contact number should only contain digits, spaces, hyphens, or
            parentheses and must have at least 7 digits.
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
      } else if (props.patternMismatch) {
        return (
          <div className="font-medium text-danger">
            * Please enter at least 5 characters
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
    console.log("Inside customer sign up handleSubmit");
    // console.log(email);
    // console.log(password);
    // const jsBirthday = new Date(birthday);
    // const isoBirthday = jsBirthday.toISOString();
    // console.log(jsBirthday);
    // console.log(isoBirthday);
    const formattedBirthday =
      birthday instanceof Date ? birthday.toISOString() : undefined;

    // const formData = new FormData();
    // formData.append("email", email);
    // formData.append("firstName", firstName);
    // formData.append("lastName", lastName);
    // formData.append("contactNo", contactNo);
    // if (formattedBirthday) {
    //   formData.append("birthday", formattedBirthday);
    // } else {
    //   formData.append("birthday", currCustomer.birthday.toISOString());
    // }
    // formData.append("address", address);
    // if (nationality !== undefined) {
    //   formData.append("nationality", nationality);
    // } else {
    //   formData.append("nationality", currCustomer.nationality);
    // }
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    const updatedCustomer = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNo: contactNo,
      //   birthday: isoBirthday,
      birthday:
        birthday == undefined
          ? currCustomer.birthday.toISOString()
          : formattedBirthday,
      address: address,
      nationality: nationality,
    };

    try {
      await apiJson.put(
        `http://localhost:3000/api/customer/updateCustomer/${currCustomer.customerId}`,
        updatedCustomer,
      );
      // success
      toastShadcn({
        description: "Successfully edited your account.",
      });
      navigate("/viewProfile");
    } catch (error: any) {
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while updating your account: \n" +
          error.message,
      });
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Form.Root className="w-4/5" onSubmit={handleSubmit}>
        <Form.Field name="email" className="mb-10 flex flex-col gap-1">
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
            disabled={true}
          />
          {/* <Form.Message name="email" match={"valueMissing"}>
              Please enter an email
            </Form.Message> */}
          <Form.ValidityState>{validateEmail}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="firstName" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            First Name
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Type your first name"
            value={firstName}
            pattern=".{2,}"
            onChange={(e) => setFirstName(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
            disabled={isDisabled}
          />
          <Form.ValidityState>{validateFirstName}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="lastName" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Type your last name"
            value={lastName}
            pattern=".{2,}"
            onChange={(e) => setLastName(e.target.value)}
            disabled={isDisabled}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateLastName}</Form.ValidityState>
        </Form.Field>

        {/* <Form.Field name="dateOfBirth" className="mb-10 flex flex-col gap-1">
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

        <div className="card justify-content-center mb-10 flex flex-col">
          <div>Birthday</div>

          <Calendar
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

        <Form.Field name="contactNo" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Contact Number
          </Form.Label>
          <Form.Control
            type="text"
            required
            disabled={isDisabled}
            placeholder="eg. 9012XXXX"
            value={contactNo}
            pattern="^(?:[0-9\s\-\(\)]*?\d){7,}$"
            title="Contact number should only contain digits, spaces, hyphens, or parentheses and must have at least 7 digits."
            onChange={(e) => setContactNo(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateContactNo}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="address" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Address
          </Form.Label>
          <Form.Control
            type="text"
            required
            disabled={isDisabled}
            pattern=".{5,}"
            title="Address should be at least 5 characters long."
            placeholder="eg. 1 Pasir Ris #01-01"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateAddress}</Form.ValidityState>
        </Form.Field>

        <FormFieldSelect
          formFieldName="nationality"
          label="Nationality"
          required={true}
          isDisabled={isDisabled}
          placeholder="Select your nationality..."
          valueLabelPair={countryValueLabelPair}
          value={nationality}
          setValue={setNationality}
          validateFunction={validateNationality}
        />

        <Form.Submit asChild>
          <button className="mt-10 h-12 w-full rounded-full border bg-black text-whiter">
            {isDisabled ? "Edit my profile" : "Confirm edit"}
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default EditProfileForm;
