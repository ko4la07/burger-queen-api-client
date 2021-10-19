import React from 'react';
import { useTable, useGlobalFilter} from "react-table";
import DeleteUser from './DeleteUser';
import GlobalFilter from './GlobalFilter';
import UpdateUser from './UpdateUser';

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
        Header: '',
        accessor: 'col3',
      },
      {
        Header: '',
        accessor: 'col4',
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
         <tr {...headerGroup.getHeaderGroupProps()} className = 'header-table-products'>
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
     <tbody {...getTableBodyProps()} className = 'elements-table-products'>
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

export default UsersTable;