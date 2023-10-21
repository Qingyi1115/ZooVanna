import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useApiJson from "../../hooks/useApiJson";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
{
  /*import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";*/
}

const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputText } from "primereact/inputtext";

function DeleteButton({ email }: { email: string }) {
  const apiJson = useApiJson();
  const toastShadcn = useToast().toast;
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  const deleteCustomer = async () => {
    if (input == "DELETE") {
      try {
        const customer = await apiJson.get(
          `http://${localhost_address}/api/customer/getCustomer`,
        );
        const responseJson = await apiJson.del(
          `http://${localhost_address}/api/customer/deleteCustomer/` +
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
    } else {
      toastShadcn({
        variant: "destructive",
        title: "Deletion unsuccessful",
        description: "Please type exactly as instructed to delete your account",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="mb-6 mt-4 w-full rounded-xl border-danger text-whiter shadow-md hover:bg-danger/50"
        >
          Delete my account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete your account. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
              Type "DELETE" to confirm deletion of your account.
            </Label>
            <InputText
              className="col-span-3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter promotion code"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={deleteCustomer}>
            Delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    // <AlertDialog>
    //   <AlertDialogTrigger asChild>
    //     <Button
    //       variant={"destructive"}
    //       className="mb-6 mt-4 w-full rounded-xl border-danger text-whiter shadow-md hover:bg-danger/50"
    //     >
    //       Delete my account
    //     </Button>
    //   </AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         This will permanently delete your account. This action cannot be
    //         undone.
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction onClick={deleteCustomer}>
    //         Confirm Delete
    //       </AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
  );
}

export default DeleteButton;

// import React from "react";
// import { useToast } from "@/components/ui/use-toast";
// import useApiJson from "../../hooks/useApiJson";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// function DeleteButton({ email }: { email: string }) {
//   const apiJson = useApiJson();
//   const toastShadcn = useToast().toast;
//   const navigate = useNavigate();

//   const deleteCustomer = async () => {
//     try {
//       const customer = await apiJson.get(
//         "http://${localhost_address}/api/customer/getCustomer",
//       );
//       const responseJson = await apiJson.del(
//         "http://${localhost_address}/api/customer/deleteCustomer/" +
//           customer.customerId,
//       );

//       toastShadcn({
//         variant: "destructive",
//         title: "Deletion Successful",
//         description: "Successfully deleted your account",
//       });

//       //might need to logout first
//       navigate("/login");

//       //   setDeleteSpeciesDialog(false);
//     } catch (error: any) {
//       // got error
//       toastShadcn({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description:
//           "An error has occurred while deleting customer: \n" + apiJson.error,
//       });
//     }
//   };
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button
//           variant={"destructive"}
//           className="mb-6 mt-4 w-full rounded-xl border-danger text-whiter shadow-md hover:bg-danger/50"
//         >
//           Delete my account
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This will permanently delete your account. This action cannot be
//             undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={deleteCustomer}>
//             Confirm Delete
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default DeleteButton;
