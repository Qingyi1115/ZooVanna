import Listing from "../../models/Listing";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormFieldInput from "../FormFieldInput";
import { InputText } from "primereact/inputtext";
import { Toast } from "@radix-ui/react-toast";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

function PersonalDetails() {
  const location = useLocation();
  const localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  let entry = new Date(
    location.state.entry ? location.state.entry : new Date(Date.now()),
  );
  const total: number = location.state.total;
  const item: number = location.state.item;
  const isChecked: boolean = location.state.isChecked;
  let personal: any = location.state.personal;

  const [firstName, setFirstName] = useState<string>(
    personal.customerFirstName ? personal.customerFirstName : "",
  ); // text input
  const [lastName, setLastName] = useState<string>(
    personal.customerLastName ? personal.customerLastName : "",
  ); // text input
  const [email, setEmail] = useState<string>(
    personal.customerEmail ? personal.customerEmail : "",
  ); // text input
  const [contactNo, setContactNo] = useState<string>(
    personal.customerContactNo ? personal.customerContactNo : "",
  ); // text input

  const [confirmEmail, setConfirmEmail] = useState<string>(
    personal.customerEmail ? personal.customerEmail : "",
  );

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    personal.customerFirstName = firstName;
  }, [firstName]);

  useEffect(() => {
    personal.customerLastName = lastName;
  }, [lastName]);

  useEffect(() => {
    personal.customerEmail = email;
  }, [email]);

  useEffect(() => {
    personal.customerContactNo = contactNo;
  });

  function clearForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNo("");
  }

  function handleClick(e: any) {
    if (
      !(firstName && lastName && email && contactNo && email === confirmEmail)
    ) {
      e.preventDefault();
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    personal.firstName = firstName;
    personal.lastName = lastName;
    personal.email = email;
    personal.contactNo = contactNo;
    if (firstName && lastName && email && contactNo && email === confirmEmail) {
      <Navigate
        to="/tickets/orderReview"
        state={{
          localListingList,
          foreignerListingList,
          entry,
          total,
          item,
          isChecked,
          personal,
        }}
      />;
    }
    // handle success case or failurecase using apiJson
  }

  return (
    <div className="dark flex h-full w-full flex-col justify-center gap-6 rounded-lg border border-stroke p-10 pt-5 text-black dark:border-stroke md:pt-10 ">
      <div className="m-0 text-2xl font-bold md:mb-5">Personal Details</div>
      <InputText
        value={firstName}
        placeholder="First Name"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setFirstName(target.value);
        }}
      />
      {!firstName && (
        <div className="font-medium text-danger">
          * Please fill in the name!
        </div>
      )}
      <InputText
        value={lastName}
        placeholder="Last Name"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setLastName(target.value);
        }}
      />
      {!lastName && (
        <div className="font-medium text-danger">
          * Please fill in the name!
        </div>
      )}
      <InputText
        value={email}
        placeholder="Email"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setEmail(target.value);
        }}
      />
      {!email && email !== confirmEmail && (
        <div className="font-medium text-danger">
          * The Email is not the same!
        </div>
      )}
      <InputText
        value={confirmEmail}
        placeholder="Confirm Email"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setConfirmEmail(target.value);
        }}
      />
      {!confirmEmail && (
        <div className="font-medium text-danger">
          * Please fill in the confirmation email!
        </div>
      )}
      {email !== confirmEmail && (
        <div className="font-medium text-danger">
          * The Email is not the same!
        </div>
      )}
      <InputText
        value={contactNo}
        placeholder="ContactNo"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setContactNo(target.value);
        }}
      />
      {!contactNo && (
        <div className="font-medium text-danger">
          * Please fill in the contactNo
        </div>
      )}
      <div className="mb-5 flex w-screen justify-end px-20 text-2xl font-bold sm:px-20 ">
        <NavLink
          to="/tickets/selectDate"
          state={{
            localListingList,
            foreignerListingList,
            entry,
            total,
            personal,
            isChecked,
          }}
          className="mr-5"
        >
          <Button className="w-15 rounded sm:w-20">
            <div>Back</div>
          </Button>
        </NavLink>
        {lastName && firstName && email && contactNo ? (
          <NavLink
            to="/tickets/orderReview"
            state={{
              localListingList,
              foreignerListingList,
              entry,
              total,
              personal,
              isChecked,
            }}
            className="flex"
          >
            <Button className="w-15 rounded sm:w-20">
              <div>Next</div>
            </Button>
          </NavLink>
        ) : (
          <NavLink
            to="/tickets/orderReview"
            state={{
              localListingList,
              foreignerListingList,
              entry,
              total,
              personal,
              isChecked,
            }}
            className="flex"
            onClick={handleClick}
          >
            <Button className="w-15 rounded sm:w-20" disabled>
              <div>Next</div>
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default PersonalDetails;
