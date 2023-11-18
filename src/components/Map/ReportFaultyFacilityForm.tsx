import { useToast } from "@/components/ui/use-toast";
import * as Form from "@radix-ui/react-form";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
import { report } from "process";
import FormTextareaInput from "../FormTextareaInput";

interface ReportFaultyFacilityFormProps {
  facilityId: string | undefined;
}

interface reportData {
  dateTime: Date;
  title: string;
  remarks: string;
  viewed: boolean;
}

function ReportFaultyFacilityForm(props: ReportFaultyFacilityFormProps) {
  const apiJson = useApiJson();

  const { facilityId } = props;

  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  // ValidityState properties: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
  function validateTitle(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">* Please enter a title</div>
        );
      }
    }
    return null;
  }

  // ValidityState properties: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
  function validateRemarks(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter a description
          </div>
        );
      }
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const reportData = {
      dateTime: new Date(),
      title: title,
      remarks: remarks,
      viewed: false,
    };

    try {
      console.log(facilityId);
      const responseJson = await apiJson.post(
        `http://${localhost_address}/api/assetFacility/createCustomerReportLog/${facilityId}`,
        reportData,
      );

      console.log(responseJson.result);

      // success
      toastShadcn({
        description: "Successfully submitted faulty facility report.",
      });
      navigate(`/facility/viewfacility/${facilityId}`);
    } catch (error: any) {
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while submitting faulty facility report: \n" +
          error.message,
      });
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Form.Root className="w-4/5" onSubmit={handleSubmit}>
        <Form.Field name="title" className="mb-5 flex flex-col gap-1">
          <Form.Label className="text-base font-medium text-black">
            Title
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Type your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
          />
          {/* <Form.Message name="email" match={"valueMissing"}>
              Please enter an email
            </Form.Message> */}
          <Form.ValidityState>{validateTitle}</Form.ValidityState>
        </Form.Field>

        <FormTextareaInput
          formFieldName="content"
          label="Content"
          required={true}
          placeholder="Write some details here"
          value={remarks}
          setValue={setRemarks}
          validateFunction={validateRemarks}
        />

        {/* <Form.Field name="newPassword" className="mb-5 flex flex-col gap-1">
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
        </Form.Field> */}

        <Form.Submit asChild>
          <button className="mt-12 h-12 w-full rounded-md border bg-black text-whiter">
            Submit Report
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default ReportFaultyFacilityForm;
