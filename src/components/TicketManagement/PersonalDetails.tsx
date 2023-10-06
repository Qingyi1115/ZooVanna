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

  console.log(personal);
  console.log(item);

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
        <div className="bg-red-100 font-medium text-danger">
          * Please fill in the first name!
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
        <div className="bg-red-100 font-medium text-danger">
          * Please fill in the last name!
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
      {!email && (
        <div className="bg-red-100 font-medium text-danger">
          * Please fill in the email
        </div>
      )}
      {!email && email !== confirmEmail && (
        <div className="bg-red-100 font-medium text-danger">
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
        <div className="bg-red-100 font-medium text-danger">
          * Please fill in the confirmation email!
        </div>
      )}
      {email !== confirmEmail && (
        <div className="bg-red-100 font-medium text-danger">
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
        <div className="bg-red-100 font-medium text-danger">
          * Please fill in the contact number!
        </div>
      )}
      <div className="mb-5 flex w-full justify-between text-2xl font-bold">
        <div className="justify-left w-2/5 md:w-2/5 lg:w-1/5">
          <NavLink
            to="/tickets/selectDate"
            state={{
              localListingList,
              foreignerListingList,
              item,
              entry,
              total,
              personal,
              isChecked,
            }}
          >
            <Button className="w-full rounded">
              <div>Back</div>
            </Button>
          </NavLink>
        </div>

        {lastName && firstName && email && contactNo ? (
          <div className="justify-right w-2/5 md:w-2/5 lg:w-1/5">
            <NavLink
              to="/tickets/orderReview"
              state={{
                localListingList,
                foreignerListingList,
                item,
                entry,
                total,
                personal,
                isChecked,
              }}
              className="flex"
            >
              <Button className="w-full rounded">
                <div>Next</div>
              </Button>
            </NavLink>
          </div>
        ) : (
          <div className=" w-2/5 md:w-2/5 lg:w-1/5">
            <NavLink
              to="/tickets/orderReview"
              state={{
                localListingList,
                foreignerListingList,
                entry,
                item,
                total,
                personal,
                isChecked,
              }}
              className="flex"
              onClick={handleClick}
            >
              <Button className="w-full rounded" disabled>
                <div>Next</div>
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
export default PersonalDetails;
