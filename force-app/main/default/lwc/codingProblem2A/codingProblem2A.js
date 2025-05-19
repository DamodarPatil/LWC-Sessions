import { api, LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/CodingProblem1Controller.getContacts";
import { refreshApex } from "@salesforce/apex";
import createContactRecord from "@salesforce/apex/CodingProblem1Controller.createContactRecord";
import updateContactRecord from "@salesforce/apex/CodingProblem1Controller.updateContactRecord";
import deleteContactRecord from "@salesforce/apex/CodingProblem1Controller.deleteContactRecord";

export default class CodingProblem2A extends LightningElement {
  @api recordId;
  contacts;
  wiredContactsResult;
  isCreateModelOpen = false;
  isEditModelOpen = false;
  isDropDownOpen = false;
  toggleContact = {};
  selectedContactId;
  Id;

  newContact = {};

  editContact = {};

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

  toggleTargetedContact(event) {
    console.log("Toggle Called");
    this.Id = event.target.dataset.contactId;
    console.log("Id pass", this.Id);
    this.toggleContact = {
      ...this.contacts.find((contact) => contact.Id === this.Id)
    };
    console.log(this.toggleContact.Id);

    if (this.Id === this.toggleContact.Id) {
      console.log("In if condition");
      console.log(this.Id);
      console.log(this.toggleContact.Id);
      this.DropDownToggle();
    }
    //   this.isDropDownOpen = true;
    //else if (Id !== this.toggleContact.Id) {
    //   console.log("IN else Condtion");
    //   this.isDropDownOpen = false;
    // }
  }

  DropDownToggle() {
    console.log("IN DropDowntoggle", this.toggleContact.Id);
    console.log("Id", this.Id);

    return this.isDropDownOpen === false
      ? (this.isDropDownOpen = true)
      : (this.isDropDownOpen = false);
  }
//   get getTargetContact() {
//     console.log("IN Getter Function");
//     return this.Id === this.toggleContact.Id ? true : false;
//   }

  openModel() {
    this.isCreateModelOpen = true;
  }

  closeModel() {
    this.isCreateModelOpen = false;
  }

  openEditModel(event) {
    console.log("openEditModel called");
    const Id = event.target.dataset.contactId;
    console.log("Id pass", Id);
    this.editContact = {
      ...this.contacts.find((contact) => contact.Id === Id)
    };
    console.log("EditContact got the value", this.editContact);
    this.isEditModelOpen = true;
  }

  closeEditModel() {
    this.isEditModelOpen = false;
  }


  handleInputChange(event) {
    const field = event.target.dataset.field;
    this.newContact[field] = event.target.value;
  }

  handleEditChange(event) {
    const field = event.target.dataset.field;
    this.editContact[field] = event.target.value;
  }

  //   Create Contact
  createContact() {
    const fields = {
      FirstName: this.newContact.FirstName,
      LastName: this.newContact.LastName,
      Email: this.newContact.Email,
      AccountId: this.recordId
    };

    createContactRecord({ fields })
      .then((contact) => {
        console.log(contact);
        this.closeModel();
        return refreshApex(this.wiredContactsResult);
      })
      .catch((error) => {
        console.error(error.body.message);
      });
  }

  // update Account
  updateContact() {
    const fields = {
      Id: this.editContact.Id,
      FirstName: this.editContact.FirstName,
      LastName: this.editContact.LastName,
      Email: this.editContact.Email,
      AccountId: this.recordId
    };

    updateContactRecord({ fields })
      .then((contact) => {
        console.log(contact);
        this.closeEditModel();
        return refreshApex(this.wiredContactsResult);
      })
      .catch((error) => {
        console.error(error.body.message);
      });
  }

  deleteContactRec(event) {
    console.log("In deleteContactRec");
    const contactId = event.target.dataset.contactId;

    deleteContactRecord({ contactId })
      .then((contact) => {
        console.log("Contact record deleted:", contact);
        return refreshApex(this.wiredContactsResult);
      })
      .catch((error) => {
        console.error(error.body.message);
      });
  }
}
