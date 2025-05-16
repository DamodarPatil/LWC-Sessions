import { api, LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getContacts from "@salesforce/apex/CodingProblem1Controller.getContacts";
import { refreshApex } from "@salesforce/apex";
import CONTACT_FIRSTNAME from "@salesforce/schema/Contact.FirstName";
import CONTACT_LASTNAME from "@salesforce/schema/Contact.LastName";
import CONTACT_EMAIL from "@salesforce/schema/Contact.Email";
import CONTACT_ACCOUNTId from "@salesforce/schema/Contact.AccountId";

export default class CodingProblem4A extends LightningElement {
  @api recordId;
  contacts;
  wiredContactsResult;
  isCreateModelOpen = false;

  fields = [
    CONTACT_FIRSTNAME,
    CONTACT_LASTNAME,
    CONTACT_EMAIL,
    CONTACT_ACCOUNTId
  ];

  get defaultValues() {
    return { AccountId: this.recordId };
  }

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

  handleSuccess(event) {
    this.accountRecordId = event.detail.id;
    const evt = new ShowToastEvent({
      title: "Record created " + this.accountRecordId,
      message: "Account is created",
      variant: "success"
    });
    this.dispatchEvent(evt);
    this.addContact();
  }

  addContact() {
    return refreshApex(this.wiredContactsResult);
  }
}
