import { useEffect, useState } from "react";
import {
  TableModified,
  TableHeaderModified,
  TableBodyModified,
  TableHeadModified,
  TableRowModified,
  TableCellModified,
} from "./TableModified";
import useApiJson from "../../hooks/useApiJson";
import Listing from "src/models/Listing";
import { ListingStatus } from "../../enums/ListingStatus";
import { CardModified, CardContentModified } from "../CardModified";

{
  /*const toast = useRef<Toast>(null);*/
}

function ForeignListingTable() {
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  //   const headerStyles: React.CSSProperties = {
  //     backgroundColor: "black",
  //     color: "white",
  //   };

  //   const tableStyles: React.CSSProperties = {
  //     borderRadius: "0.5rem", // Adjust the radius as needed
  //   };

  //   let listing: Listing = {
  //     listingId: -1,
  //     name: "",
  //     description: "",
  //     price: -1,
  //     listingType: ListingType.LOCAL_ADULT_ONETIME,
  //     listingStatus: ListingStatus.DISCONTINUED,
  //   };

  //   const toast = useRef<Toast>(null);
  //   const exportCSV = () => {
  //     dt.current?.exportCSV();
  //   };

  const [listingList, setListingList] = useState<Listing[]>([]);
  //   const [globalFilter, setGlobalFilter] = useState<string>("");
  //   const [listingDisableDialog, setlistingDisableDialog] =
  //     useState<boolean>(false);
  //   const toastShadcn = useToast().toast;
  //   const [disable, setDisable] = useState<boolean>();
  //   let [count, setCount] = useState<number>(0);

  const fetchlistings = async () => {
    try {
      apiJson
        .get(
          `http://${localhost_address}/api/listingCustomer/getForeignerListings`,
        )
        .catch((err: any) => console.log(err))
        .then((res: any) => {
          console.log("local" + res);
          setListingList(res.result as Listing[]);
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchlistings();
  }, []);

  //   const hidelistingDisableDialog = () => {
  //     setlistingDisableDialog(false);
  //   };

  //   const disableListing = () => {
  //     setDisable(true);
  //     console.log(disable);
  //     setCount((count += 1));
  //     console.log(count);
  //   };

  //   const enableListing = () => {
  //     setDisable(false);
  //     console.log("hereee");
  //     setCount((count += 1));
  //     console.log(count);
  //   };

  //   useEffect(() => {
  //     if (isInitialRender.current) {
  //       isInitialRender.current = false;
  //       return;
  //     }
  //     if (disable) {
  //       console.log(selectedListing);
  //       apiJson
  //         .del(
  //           `http://${localhost_address}/api/listing/disableListing/${selectedListing.listingId}`
  //         )
  //         .catch((error) =>
  //           toastShadcn({
  //             variant: "destructive",
  //             title: "Uh oh! Something went wrong.",
  //             description:
  //               "An error has occurred while disabling listing: \n" + error,
  //           })
  //         )
  //         .then(() => {
  //           toastShadcn({
  //             // variant: "destructive",
  //             title: "Deletion Successful",
  //             description:
  //               "Successfully disabled listing: " + selectedListing.name,
  //           });
  //           setlistingDisableDialog(false);
  //           fetchlistings();
  //         });
  //     } else {
  //       console.log(selectedListing);
  //       apiJson
  //         .del(
  //           `http://${localhost_address}/api/listing/enableListing/${selectedListing.listingId}`
  //         )
  //         .catch((error) =>
  //           toastShadcn({
  //             variant: "destructive",
  //             title: "Uh oh! Something went wrong.",
  //             description:
  //               "An error has occurred while enabling listing: \n" + error,
  //           })
  //         )
  //         .then(() => {
  //           toastShadcn({
  //             // variant: "destructive",
  //             title: "Enable Successful",
  //             description:
  //               "Successfully enabled listing: " + selectedListing.name,
  //           });
  //           fetchlistings();
  //         });
  //     }
  //   }, [count, disable]);

  //   const listingDisableDialogFooter = (
  //     <React.Fragment>
  //       <Button onClick={hidelistingDisableDialog}>
  //         <HiX />
  //         No
  //       </Button>
  //       <Button variant={"destructive"} onClick={disableListing}>
  //         <HiCheck />
  //         Yes
  //       </Button>
  //     </React.Fragment>
  //   );

  //   const header = (
  //     <div className="flex flex-wrap items-center justify-between gap-2">
  //       <h4 className="m-1">Manage listings</h4>
  //       <span className="p-input-icon-left">
  //         <i className="pi pi-search" />
  //         <InputText
  //           type="search"
  //           placeholder="Search..."
  //           onInput={(e) => {
  //             const target = e.target as HTMLInputElement;
  //             setGlobalFilter(target.value);
  //           }}
  //         />
  //       </span>
  //     </div>
  //   );

  //   const confirmlistingDisable = (listing: Listing) => {
  //     setSelectedListing(listing);
  //     setlistingDisableDialog(true);
  //   };

  //   const confirmlistingEnable = (listing: Listing) => {
  //     setSelectedListing(listing);
  //     enableListing();
  //   };

  //   const actionBodyTemplate = (listing: Listing) => {
  //     return (
  //       <div className="flex justify-between">
  //         <NavLink
  //           to={`/listing/viewlisting/${listing.listingId}`}
  //           className="mr-1"
  //         >
  //           <Button>
  //             <HiEye className="mr-1" />
  //             <span>Details</span>
  //           </Button>
  //         </NavLink>
  //         <NavLink
  //           to={`/listing/editlisting/${listing.listingId}`}
  //           className="mr-1"
  //         >
  //           <Button>
  //             <HiPencil className="mr-1" />
  //             <span>Edit</span>
  //           </Button>
  //         </NavLink>
  //         {listing.listingStatus === "DISCONTINUED" ? (
  //           <Button
  //             className="mr-2"
  //             onClick={() => confirmlistingEnable(listing)}
  //           >
  //             <span>Enable</span>
  //           </Button>
  //         ) : (
  //           <Button
  //             variant={"destructive"}
  //             className="mr-2"
  //             onClick={() => confirmlistingDisable(listing)}
  //           >
  //             <span>Disable</span>
  //           </Button>
  //         )}
  //       </div>
  //     );
  //   };

  return (
    <CardModified className="overflow-hidden rounded-lg">
      <CardContentModified>
        <div className="overflow-x-auto">
          <TableModified>
            <TableHeaderModified>
              <TableRowModified>
                <TableHeadModified>Ticket Type</TableHeadModified>
                <TableHeadModified>Price</TableHeadModified>
              </TableRowModified>
            </TableHeaderModified>
            <TableBodyModified>
              {listingList.length > 0 ? (
                listingList.map(
                  (listing) =>
                    listing.listingStatus !== ListingStatus.DISCONTINUED && (
                      <TableRowModified key={listing.listingId}>
                        <TableCellModified>{listing.name}</TableCellModified>
                        <TableCellModified>
                          S$ {listing.price}
                        </TableCellModified>
                        {/* Add more TableCell components for other fields */}
                      </TableRowModified>
                    ),
                )
              ) : (
                <TableRowModified>
                  <TableCellModified colSpan={2} className="h-24 text-center">
                    No results.
                  </TableCellModified>
                </TableRowModified>
              )}
            </TableBodyModified>
          </TableModified>
        </div>
      </CardContentModified>
    </CardModified>

    // <DataTable
    //   value={listingList}
    //   style={tableStyles} // Apply the custom table style
    // >
    //   <Column
    //     field="name"
    //     header="Ticket Type"
    //     style={{ minWidth: "12rem", ...headerStyles }} // Apply the custom header style
    //   ></Column>
    //   <Column
    //     field="price"
    //     header="Price"
    //     style={{ minWidth: "12rem", ...headerStyles }} // Apply the custom header style
    //   ></Column>
    // </DataTable>
  );
}

export default ForeignListingTable;
