import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { useToast } from "@/components/ui/use-toast";
import useApiJson from "../../hooks/useApiJson";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import FormFieldSelect from "../FormFieldSelect";
import { countryValueLabelPair } from "../../enums/Country";
import { clear } from "console";
import Customer from "../../models/Customer";
import useApiFormData from "../../hooks/useApiFormData";

function RequestResetPasswordForm() {
  const apiJson = useApiJson();

  const toastShadcn = useToast().toast;
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const responseJson = await apiJson.post(
        `http://localhost:3000/api/customer/sendForgetPasswordLink/` + email,
        {},
      );

      console.log(responseJson.result);

      // success
      toastShadcn({
        description:
          "Email for reset password has been sent you. Please click on the link within 10 minutes.",
      });
      //   navigate("/resetPasswordNew");
    } catch (error: any) {
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while resetting your password: \n" +
          error.message,
      });
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Form.Root className="w-4/5" onSubmit={handleSubmit}>
        {/* <Form.Field name="email" className="mb-10 flex flex-col gap-1">
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
        {/* <Form.ValidityState>{validateOldPassword}</Form.ValidityState>
        </Form.Field> */}

        <Form.Field name="email" className="mb-10 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Your Email
          </Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Type your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          <Form.ValidityState>{validateEmail}</Form.ValidityState>
        </Form.Field>

        <Form.Submit asChild>
          <button className="mt-10 h-12 w-full rounded-full border bg-black text-whiter">
            Send me a reset password email
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default RequestResetPasswordForm;
