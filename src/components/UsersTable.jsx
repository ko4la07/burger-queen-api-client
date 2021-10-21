import React from 'react';
import { useTable, useGlobalFilter, usePagination } from "react-table";
import DeleteUser from './DeleteUser';
import GlobalFilter from './GlobalFilter';
import UpdateUser from './UpdateUser';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const UsersTable = ({users, fetchUsers}) => {
  const dataUsers = (data) => {
    const arrayUsers = data.map((element) => {
      const result ={
        col1: element.email,
        col2: element.roles[0],
        col3: <UpdateUser dataUser = {element} fetchUsers={fetchUsers}/>,
        col4: <DeleteUser dataUser = {element} fetchUsers={fetchUsers}/>,
      }
      return result;
    });
    // console.log(arrayUsers);
    return arrayUsers;
  } ;
  // console.log(users);
  
  const data = React.useMemo(
    () => 
    dataUsers(users),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Roles',
        accessor: 'col2',
      },
      {
        Header: 'Edit',
        accessor: 'col3',
      },
      {
        Header: 'Delete',
        accessor: 'col4',
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

export default UsersTable;