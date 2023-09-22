import React from "react";
import { useToast } from "@/components/ui/use-toast";
import useApiJson from "../../hooks/useApiJson";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function DeleteButton({ email }: { email: string }) {
  const apiJson = useApiJson();
  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  const deleteCustomer = async () => {
    try {
      const customer = await apiJson.get(
        "http://localhost:3000/api/customer/getCustomer",
        email,
      );
      const responseJson = await apiJson.del(
        "http://localhost:3000/api/customer/deleteCustomer/" +
          customer.customerId,
      );

      toastShadcn({
        // variant: "destructive",
        title: "Deletion Successful",
        description: "Successfully deleted your account",
      });

      //might need to logout first
      navigate("/login");

      //   setDeleteSpeciesDialog(false);
    } catch (error: any) {
      // got error
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while deleting species: \n" + apiJson.error,
      });
    }
  };
  return (
    <Button
      onClick={deleteCustomer}
      variant={"outline"}
      className="mb-6 mt-4 w-full rounded-xl border-danger text-danger shadow-md hover:bg-danger/50"
    >
      Delete my account
    </Button>
  );
}

export default DeleteButton;
