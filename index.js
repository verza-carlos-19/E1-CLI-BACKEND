import inquirer from "inquirer";
import { promptNewInvoice } from "./invoicePrompts.js";
import { get, save } from "./FileMethods.js";

const main = async () => {
  let run = true;
  while (run) {
    const action = await inquirer.prompt([
      {
        type: "list",
        name: "chosen",
        message: "Elija por favor:",
        choices: [
          { value: 1, name: "Obtener listado de facturacion" },
          { value: 2, name: "Crear una nueva factura" },
          { value: 99, name: "Salir" },
        ],
      },
    ]);
    switch (action.chosen) {
      case 1:
        await getAllInvoices();
        break;
      case 2:
        await createNewInvoice();
        break;
      case 99:
        run = false;
        break;
      default:
        run = false;
        break;
    }
  }
  console.log(
    "Adios, muchas gracias por utilizar el servicio de facturacion Facturity®"
  );
};

main();

async function createNewInvoice() {
  console.log("Agregando nueva factura...");
  const fechaActual = new Date();
  const preNewInvoiceData = await promptNewInvoice();
  //   console.log("Creando:", newInvoiceData);
  const newInvoiceData = {
    ...preNewInvoiceData,
    Fecha_De_Compra:
      preNewInvoiceData.Fecha_De_Compra.toLocaleDateString("es-AR"),
    Costo: formatPrice(Number(preNewInvoiceData.Costo)),
    IVA: preNewInvoiceData.IVA + "%",
    Total: formatPrice(
      Number(preNewInvoiceData.Costo) +
        (Number(preNewInvoiceData.Costo) * Number(preNewInvoiceData.IVA)) / 100
    ),
    Fecha_De_Emision: fechaActual.toLocaleDateString("es-AR"),
  };
  console.log("Creando:", newInvoiceData);
  const currentInvoices = await get("invoices");
  //Aca podes agregar una funcion de validacion para newUserData
  currentInvoices.push(newInvoiceData);
  await save("invoices", currentInvoices);
}

async function getAllInvoices() {
  const currentInvoices = await get("invoices");
  console.log(currentInvoices);
}
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};
