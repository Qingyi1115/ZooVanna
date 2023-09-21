import React from 'react';
import { useToast } from "@/components/ui/use-toast";

function DeleteButton() {

    const toastShadcn = useToast().toast;
    
const deleteCustomer = async () => {
    try {

      const responseJson = await apiJson.del(
        "http://localhost:3000/api/customer/deleteCustomer/" +
          selectedSpecies.speciesCode
      );

      toastShadcn({
        // variant: "destructive",
        title: "Deletion Successful",
        description:
          "Successfully deleted species: " + selectedSpeciesCommonName,
      });
  
      setDeleteSpeciesDialog(false);

    } catch (error: any) {
      // got error
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "An error has occurred while deleting species: \n" + apiJson.error,
      });
    }
  return (
    <div>DeleteButton</div>
  )
}

export default DeleteButton