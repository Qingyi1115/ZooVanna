import React from "react";
import { useToast } from "@/components/ui/use-toast";
import useApiJson from "../../hooks/useApiJson";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
        variant: "destructive",
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
          "An error has occurred while deleting customer: \n" + apiJson.error,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="mb-6 mt-4 w-full rounded-xl border-danger text-whiteri shadow-md hover:bg-danger/50"
        >
          Delete my account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteCustomer}>
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteButton;
