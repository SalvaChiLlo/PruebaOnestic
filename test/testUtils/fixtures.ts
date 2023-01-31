export const csvTestProducts = `id,name,cost
0,prod0,1.0
1,prod1,2.0
2,prod2,3.0
`;

export const csvTestCustomers = `id,firstname,lastname
0,FName0,LName0
1,FName1,LName1
2,FName2,LName2
`;

export const csvTestOrdersProductoNoExiste = `id,customer,products
0,0,1 0 1 0
1,2,0 0 0 0
2,1,0 1 2 1
`;

export const csvTestOrdersCustomerNoExiste = `id,customer,products
0,0,1 0 1 0
1,2,0 0 0 0
2,9,0 1 2 1
`;

export const csvTestOrdersSinProductos = `id,customer,products
0,0,1 0 1 0
1,2,0 0 0 0
2,1,0 1 2 1
3,1,
`;

export const csvTestOrdersValido = `id,customer,products
0,0,1 1 0 0
1,2,0 0 0 0
2,1,0 1 2 2
`;
