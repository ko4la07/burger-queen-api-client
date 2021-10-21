import React from 'react';
import { useTable, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from './GlobalFilter';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPhotoSizeSelectActual } from "react-icons/md";

const ProductTable = ({product,fetchProducts}) => {
  const dataProducts = (prod) => {
    const arrayProducts = prod.map((element) => {
      const result ={
        col1: element.name,
        col2: element.type,
        col3: element.image ? <MdPhotoSizeSelectActual/> : 'no',
        col4: element.price,
        col5: <UpdateProduct dataProduct = {element} fetchProducts={fetchProducts}/>,
        col6: <DeleteProduct dataProduct = {element} fetchProducts={fetchProducts}/>,
      }
      return result;
    });
    return arrayProducts;
  } ;
  // console.log(dataProducts);
  
  const data = React.useMemo(
    () => 
    dataProducts(product),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        Header: 'Edit',
        accessor: 'col5',
      },
      {
        Header: 'Delete',
        accessor: 'col6',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    // preGlobalFilteredRows,
   setGlobalFilter,
   preGlobalFilteredRows,
  //  state: { globalFilter },
  } = useTable({ columns, data }, useGlobalFilter, usePagination);

  const { pageIndex } = state;

  return (
    <>
      {/* debemos de hacer aqui la tabla con los valores */}
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
         <tr {...headerGroup.getHeaderGroupProps()} className = 'header-table-products'>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()} 
             style={{
              borderBottom: 'solid 1px rgba(224, 152, 35, 1)',
              // color: 'black',
            }}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()} className = 'elements-table-products'>
       {// Loop over the table rows
       page.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()} 
                 style={{
                  padding: '5px 10px 0px',
                  // border: 'solid 1px gray',
                }}>
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
   <div className="line-table"></div>
   <div className = 'container-links-pagination'>
   <span>
     Página{' '}
     <strong>
       {pageIndex + 1} of {pageOptions.length}
     </strong> {' '}
   </span>
   <button onClick = {() => previousPage()} disabled = {!canPreviousPage} className = 'pagination'><MdKeyboardArrowLeft/> Página anterior</button>
   <button onClick = {() => nextPage()} disabled = {!canNextPage} className = 'pagination'>Página siguiente <MdKeyboardArrowRight /></button>
 </div>
    </>
  )
};

export default ProductTable;