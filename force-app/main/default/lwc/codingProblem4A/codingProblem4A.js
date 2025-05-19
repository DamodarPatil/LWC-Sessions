import { api, LightningElement, wire } from "lwc";
// import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getContacts from "@salesforce/apex/CodingProblem1Controller.getContacts";
import { refreshApex } from "@salesforce/apex";
// import CONTACT_FIRSTNAME from "@salesforce/schema/Contact.FirstName";
// import CONTACT_LASTNAME from "@salesforce/schema/Contact.LastName";
// import CONTACT_EMAIL from "@salesforce/schema/Contact.Email";
// import CONTACT_ACCOUNTID from "@salesforce/schema/Contact.AccountId";
import CONTACT_ID from "@salesforce/schema/Contact.Id";

export default class CodingProblem4A extends LightningElement {
  @api recordId;
  contacts;
  wiredContactsResult;
  isCreateModelOpen = false;
  isEditModelOpen = false;
  contactRecordId = [CONTACT_ID.fieldApiName];

//   fields = [
//     CONTACT_FIRSTNAME,
//     CONTACT_LASTNAME,
//     CONTACT_EMAIL,
//     CONTACT_ACCOUNTID
//   ];

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

  handleSuccess() {
    // this.accountRecordId = event.detail.id;
    this.refreshContact();
  }

  refreshContact() {
    return refreshApex(this.wiredContactsResult);
  }

  openEditModel() {
    this.isEditModelOpen = true;
  }

  closeEditModel() {
    this.isEditModelOpen = false;
  }

  handleEditSuccess() {
    this.refreshContact();
  }

  handleSubmit(){
    console.log("Submitted");
  }
}
