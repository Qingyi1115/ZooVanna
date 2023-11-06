import Listing from "../../models/Listing";

interface DateFormProps {
  listing: Listing;
}

function DateFormSummary(props: DateFormProps) {
  const listing = props.listing;

  return (
    <div className="my-1 flex justify-between">
      <div className="items-center">
        <div className="flex text-sm">
          {listing.description} x {listing.orderItems.length}
        </div>
      </div>
      <div>S${Number(listing.price) * Number(listing.orderItems.length)}</div>
    </div>
  );
}

export default DateFormSummary;
