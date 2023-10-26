import React from "react";

interface Option {
  text: string;
}

interface HorizontalScrollOptionsListProps {
  options: Option[];
  onOptionClick: (option: Option) => void;
  selectedOption: Option | null; // Receive selectedOption as a prop
}

const HorizontalScrollOptionsList: React.FC<
  HorizontalScrollOptionsListProps
> = ({
  options,
  onOptionClick,
  selectedOption, // Use selectedOption from props
}) => {
  return (
    <div>
      <div className=" overflow-x-auto whitespace-nowrap py-3">
        {options.map((option) => (
          <div
            key={option.text}
            className={`inline-block cursor-pointer rounded-full px-4 py-1.5 text-sm ${
              selectedOption?.text === option.text
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => onOptionClick(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollOptionsList;

// import React, { useState } from "react";

// interface Option {
//   text: string;
// }

// interface HorizontalScrollOptionsListProps {
//   options: Option[];
//   onOptionClick: (option: Option) => void;
// }

// const HorizontalScrollOptionsList: React.FC<
//   HorizontalScrollOptionsListProps
// > = ({ options, onOptionClick }) => {
//   const [selectedOption, setSelectedOption] = useState<Option | null>(null);

//   const handleOptionClick = (option: Option) => {
//     if (selectedOption === option) {
//       // Deselect the option if it's already selected
//       setSelectedOption(null);
//     } else {
//       // Select the clicked option
//       setSelectedOption(option);
//     }
//   };

//   return (
//     <div className="max-w-md">
//       <div className="max-w-xs overflow-x-auto whitespace-nowrap py-3">
//         {options.map((option) => (
//           <div
//             key={option.text}
//             className={`inline-block cursor-pointer rounded-full px-4 py-1.5 text-sm ${
//               selectedOption === option
//                 ? "bg-black text-white"
//                 : "bg-gray-100 text-black"
//             }`}
//             onClick={() => handleOptionClick(option)}
//           >
//             {option.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HorizontalScrollOptionsList;

// import React from "react";

// interface Option {
//   text: string;
// }

// interface HorizontalScrollOptionsListProps {
//   options: Option[];
//   onOptionClick: (option: Option) => void;
// }

// const HorizontalScrollOptionsList: React.FC<
//   HorizontalScrollOptionsListProps
// > = ({ options, onOptionClick }) => {
//   return (
//     <div className="max-w-md">
//       <div className="max-w-xs overflow-x-auto whitespace-nowrap pt-2">
//         {options.map((option) => (
//           <div
//             key={option.text}
//             className="bg-gray-100 inline-block cursor-pointer rounded-md px-4 text-sm pb-4"
//             onClick={() => onOptionClick(option)}
//           >
//             {option.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HorizontalScrollOptionsList;
