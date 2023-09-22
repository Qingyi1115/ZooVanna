import React from "react";
import { useToast } from "@/components/ui/use-toast";
import useApiJson from "../../hooks/useApiJson";
import { useNavigate } from "react-router-dom";

function DeleteButton(customerId: number) {
  const apiJson = useApiJson();
  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  const deleteCustomer = async () => {
    try {
      const responseJson = await apiJson.del(
        "http://localhost:3000/api/customer/deleteCustomer/" + customerId,
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
    return <div>DeleteButton</div>;
  };
}

export default DeleteButton;
