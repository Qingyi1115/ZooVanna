import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { useToast } from "@/components/ui/use-toast";
import useApiJson from "../../hooks/useApiJson";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import FormFieldSelect from "../FormFieldSelect";
import { countryValueLabelPair } from "../../enums/Country";
import { clear } from "console";

function SignupForm() {
  const apiJson = useApiJson();
  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [contactNo, setContactNo] = useState<string>("");
  //   const [birthday, setBirthday] = useState<string>("");
  const [birthday, setBirthday] = useState<string | Date | Date[] | null>(null);
  const [address, setAddress] = useState<string>("");
  const [nationality, setNationality] = useState<string | undefined>(undefined);

  function clearForm() {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setContactNo("");
    setBirthday(null);
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

  function validatePassword(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter a password
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

  function validateBirthday(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter a birthday
          </div>
        );
      }
    }
    return null;
  }

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
    console.log("Inside customer sign up handleSubmit");
    // console.log(email);
    // console.log(password);
    // const jsBirthday = new Date(birthday);
    // const isoBirthday = jsBirthday.toISOString();
    // console.log(jsBirthday);
    // console.log(isoBirthday);
    const newCustomer = {
      customerPassword: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNo: contactNo,
      //   birthday: isoBirthday,
      birthday: birthday,
      address: address,
      nationality: nationality,
    };

    try {
      const responseJson = await apiJson.post(
        "http://localhost:3000/api/customer/createCustomer",
        newCustomer,
      );
      // success
      toastShadcn({
        description: "Successfully created your account! Please login now.",
      });
      navigate("/login");
      clearForm();
    } catch (error: any) {
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while creating your account: \n" +
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
          />
          {/* <Form.Message name="email" match={"valueMissing"}>
              Please enter an email
            </Form.Message> */}
          <Form.ValidityState>{validateEmail}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="password" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          {/* <Form.Message name="password" match={"valueMissing"}>
              Please enter a password
            </Form.Message> */}
          <Form.ValidityState>{validatePassword}</Form.ValidityState>
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
            onChange={(e) => setFirstName(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
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
            onChange={(e) => setLastName(e.target.value)}
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
          <div>Date of Birth</div>

          <Calendar
            placeholder="Enter your date of birth"
            value={birthday}
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
          placeholder="Select your nationality..."
          valueLabelPair={countryValueLabelPair}
          value={nationality}
          setValue={setNationality}
          validateFunction={validateNationality}
        />

        <Form.Submit asChild>
          <button className="mt-10 h-12 w-full rounded-full border bg-black text-whiter">
            Sign up
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default SignupForm;
