import { React, useState } from "react";
import { useAsyncDebounce } from "react-table";
// import '../styles/GlobalFilter.css';
 
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
   <div className = 'filter-global'>
     <input
       value={value || ""}
       onChange={(e) => {
         setValue(e.target.value);
         onChange(e.target.value);
       }}
       placeholder="Buscar"
       className="input-global-filter"
       style={{
         fontSize: "1rem",
         margin: "20px 0px",
         display: "flex",
         padding: "10px",
         color:'white',
         outline:'none',
       }}
     />
   </div>
 );
};

export default GlobalFilter;
