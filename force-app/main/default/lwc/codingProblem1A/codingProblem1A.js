import { api, LightningElement } from "lwc";
import getActiveContacts from "@salesforce/apex/CodingProblem1Controller.getActiveContacts";
import { NavigationMixin } from "lightning/navigation";

export default class CodingProblem1A extends NavigationMixin(LightningElement) {
  @api recordId;
  contacts;
  error;

  isModalOpen = false;

  closeModalHandler() {
    this.isModalOpen = false;
  }

  async loadContacts() {
    try {
      console.log(this.recordId);
      this.contacts = await getActiveContacts({ accountId: this.recordId });
      this.error = undefined;
    } catch (error) {
      this.error = error.message;
      this.contacts = undefined;
    }
  }

  handleButtonClick() {
    this.isModalOpen = true;
    this.loadContacts();
  }

  columns = [
    {
      label: "Name",
      fieldName: "Name",
      type: "button",
      typeAttributes: {
        label: { fieldName: "Name" },
        name: "urlredirect",
        variant: "base"
      }
    },
    { label: "Department", fieldName: "Department" },
    { label: "Email", fieldName: "Email" }
  ];

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "urlredirect":
        this.handleClickNavigation(row);
        break;
      default:
        break;
    }
  }

  handleClickNavigation(row) {
    this.record = row;
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.record.Id,
        objectApiName: "Contact",
        actionName: "view"
      }
    });
  }
}
