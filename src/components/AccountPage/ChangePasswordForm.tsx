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

interface EditPasswordFormProps {
  currCustomer: Customer;
}

interface Passwords {
  oldPassword: string;
  newPassword: string;
}

function EditPasswordForm(props: EditPasswordFormProps) {
  const apiJson = useApiJson();

  const { currCustomer } = props;

  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword2, setNewPassword2] = useState<string>("");

  // ValidityState properties: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
  function validateOldPassword(props: ValidityState) {
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

  // ValidityState properties: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
  function validateNewPassword(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter a password
          </div>
        );
      } else if (props.patternMismatch) {
        return (
          <div className="font-medium text-danger">
            * Password must be at least 8 characters long and contain at least
            one uppercase letter, one lowercase letter, and one digit.
          </div>
        );
      }
    }
    return null;
  }

  function validatePassword2(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter a password
          </div>
        );
      } else if (newPassword2 !== newPassword) {
        return (
          <div className="font-medium text-red-600">
            * New passwords do not match. Please try again.
          </div>
        );
      }
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const passwords = {
      oldPassword: oldPassword,
      newPassword: newPassword2,
    };

    console.log(passwords);

    try {
      console.log(currCustomer.customerId);
      const responseJson = await apiJson.put(
        `http://172.31.16.158:3000/api/customer/updatePassword/${currCustomer.customerId}`,
        passwords,
      );

      console.log(responseJson.result);

      // success
      toastShadcn({
        description: "Successfully updated your password.",
      });
      navigate("/account");
    } catch (error: any) {
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while updating your password: \n" +
          error.message,
      });
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Form.Root className="w-4/5" onSubmit={handleSubmit}>
        <Form.Field name="email" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Old password
          </Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Type your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          {/* <Form.Message name="email" match={"valueMissing"}>
              Please enter an email
            </Form.Message> */}
          <Form.ValidityState>{validateOldPassword}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="newPassword" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            New Password
          </Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Type your new password"
            value={newPassword}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            onChange={(e) => setNewPassword(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateNewPassword}</Form.ValidityState>
        </Form.Field>

        <Form.Field name="newPassword2" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Confirm New Password
          </Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Re-type your new password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validatePassword2}</Form.ValidityState>
        </Form.Field>

        <Form.Submit asChild>
          <button className="mt-10 h-12 w-full rounded-full border bg-black text-whiter">
            Update password
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default EditPasswordForm;
