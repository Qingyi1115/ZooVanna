import { useToast } from "@/components/ui/use-toast";
import * as Form from "@radix-ui/react-form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";

function SignupFormEmail() {
  const apiJson = useApiJson();
  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  function clearForm() {
    setEmail("");
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Inside customer sign up handleSubmit");
    // console.log(email);
    // console.log(password);
    // const jsBirthday = new Date(birthday);
    // const isoBirthday = jsBirthday.toISOString();
    // console.log(jsBirthday);
    // console.log(isoBirthday);
    // const newEmail = {
    //   email: email,
    // };

    try {
      const responseJson = await apiJson.get(
        `http://${localhost_address}/api/customer/sendEmailVerification/${email}`,
      );
      // success
      toastShadcn({
        description:
          "Successfully sent verification email. Please check your email to continue sign up.",
      });
      navigate("/inbox");
      clearForm();
    } catch (error: any) {
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while sending verification email: \n" +
          error.message,
      });
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Form.Root className="w-4/5" onSubmit={handleSubmit}>
        <Form.Field name="email" className=" flex flex-col gap-1">
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

        <Form.Submit asChild>
          <button className="mt-10 h-12 w-full rounded-md border bg-black text-whiter">
            Verify my email
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default SignupFormEmail;
