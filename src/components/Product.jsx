import React from 'react';
import { useTable, useGlobalFilter} from "react-table";
import GlobalFilter from './GlobalFilter';

const Product = ({product}) => {
  const dataProducts = (prod) => {
    const arrayProducts = prod.map((element) => {
      const result ={
        col1: element.name,
        col2: element.type,
        col3: element.image ? 'si' : 'no',
        col4: element.price,
        col5: <button id = {element._id} onClick = {(e)=>console.log('update', element._id)}>update</button>,
        col6: <button id = {element._id} onClick = {(e)=>console.log('delete', element._id)}>delete</button>,
      }
      return result;
    });
    return arrayProducts;
  } ;
  // console.log(dataProducts);
  
  const data = React.useMemo(
    () => 
    dataProducts(product),
    [product]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Tipo',
        accessor: 'col2',
      },
      {
        Header: 'Imagen',
        accessor: 'col3',
      },
      {
        Header: 'Precio',
        accessor: 'col4',
      },
      {
        Header: '',
        accessor: 'col5',
      },
      {
        Header: '',
        accessor: 'col6',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // preGlobalFilteredRows,
   setGlobalFilter,
   preGlobalFilteredRows,
  //  state: { globalFilter },
  } = useTable({ columns, data }, useGlobalFilter);

  return (
    // debemos de hacer aqui la tabla con los valores
    <table {...getTableProps()}>
     <thead>
     <tr>
           <th colSpan={4}>
             <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
             />
           </th>
         </tr>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
   </table>
  )
};

export default Product;