import { api, LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/CodingProblem1Controller.getContacts";
import { refreshApex } from "@salesforce/apex";
import CONTACT_FIRSTNAME from "@salesforce/schema/Contact.FirstName";
import CONTACT_LASTNAME from "@salesforce/schema/Contact.LastName";
import CONTACT_EMAIL from "@salesforce/schema/Contact.Email";
import createContactRecord from "@salesforce/apex/CodingProblem1Controller.createContactRecord";

export default class CodingProblem2A extends LightningElement {
  @api recordId;
  contacts;
  wiredContactsResult;
  isCreateModelOpen = false;

  newContact = {
    FirstName: "",
    LastName: "",
    Email: ""
  };

  @wire(getContacts, { accountId: "$recordId" })
  wiredcontacts(result) {
    this.wiredContactsResult = result;
    if (result.data) {
      this.contacts = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.contacts = undefined;
    }
  }

  openModel() {
    this.isCreateModelOpen = true;
  }

  closeModel() {
    this.isCreateModelOpen = false;
  }

  handleInputChange(event) {
    const field = event.target.dataset.field;
    this.newContact[field] = event.target.value;
  }

  createContact() {
    const fields = {
      [CONTACT_FIRSTNAME.fieldApiName]: this.newContact.FirstName,
      [CONTACT_LASTNAME.fieldApiName]: this.newContact.LastName,
      [CONTACT_EMAIL.fieldApiName]: this.newContact.Email,
      accountId: this.recordId
    };

    let contactString = JSON.stringify(fields);

    createContactRecord({ contactJSON: contactString }).then((contact) => {
      console.log("Lead record created: ", JSON.stringify(contact));
      this.closeModel();
      return refreshApex(this.wiredContactsResult);
    });
  }
}
