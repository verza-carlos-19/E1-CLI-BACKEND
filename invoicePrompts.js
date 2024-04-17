import inquirer from "inquirer";
import DatePrompt from "inquirer-date-prompt";

inquirer.registerPrompt("date", DatePrompt);

export async function promptNewInvoice() {
  return await inquirer.prompt(newInvoicePrompt);
}

const newInvoicePrompt = [
  {
    type: "input",
    name: "Nombre",
    message: "Ingrese su nombre completo:",
  },
  {
    type: "input",
    name: "CUIT",
    message: "Ingrese su CUIT:",
  },
  {
    type: "input",
    name: "localidad",
    message: "Ingrese su localidad:",
  },
  {
    type: "input",
    name: "tipo",
    message: "Ingrese el tipo(A, B):",
  },
  {
    type: "input",
    name: "ID",
    message: "Ingrese el ID:",
  },
  {
    type: "date",
    name: "Fecha_De_Compra",
    message: "Ingrese su fecha de compra:",
    locale: "es-ES",
    format: { month: "short", hour: undefined, minute: undefined },
  },
  {
    type: "input",
    name: "Costo",
    message: "Ingrese el importe:",
  },
  {
    type: "input",
    name: "IVA",
    message: "Ingrese el IVA:",
  },
  {
    type: "input",
    name: "Descripcion",
    message: "Ingrese la descripcion:",
  },
];
