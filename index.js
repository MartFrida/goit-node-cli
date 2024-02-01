import { program } from "commander";
import * as contactsService from './contacts.js'

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options)

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.log('allContacts', allContacts)
      break;
    case "get":
      const oneContact = await contactsService.getContactById(id)
      return console.log(oneContact)
      break;

    case "add":
      const newContact = await contactsService.addContact(data)
      return console.log(newContact)
      break;

    case "remove":
      const delContact = await contactsService.removeContact(id)
      return console.log(delContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

