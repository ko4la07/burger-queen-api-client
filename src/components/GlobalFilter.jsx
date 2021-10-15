import { React, useState } from "react";
import { useAsyncDebounce } from "react-table";
 
// Component for Global Filter
const GlobalFilter = ({ 
   globalFilter, 
   setGlobalFilter 
}) => {
 const [value, setValue] = useState(globalFilter);
 
 const onChange = useAsyncDebounce((value) => {
   setGlobalFilter(value || undefined);
 }, 200);
 
 return (
   <div>
     <input
       value={value || ""}
       onChange={(e) => {
         setValue(e.target.value);
         onChange(e.target.value);
       }}
       placeholder=" Buscar"
       className="w-25"
       style={{
         fontSize: "1.1rem",
         margin: "15px",
         display: "inline",
       }}
     />
   </div>
 );
};

export default GlobalFilter;
