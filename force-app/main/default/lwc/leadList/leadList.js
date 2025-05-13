import getLeads from "@salesforce/apex/LeadController.getLeads";
import { LightningElement, track, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import { updateRecord, deleteRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

// Import Field
import LEAD_ID from "@salesforce/schema/Lead.Id";
import LEAD_FIRSTNAME from "@salesforce/schema/Lead.FirstName";
import LEAD_LASTNAME from "@salesforce/schema/Lead.LastName";
import LEAD_EMAIL from "@salesforce/schema/Lead.Email";
import LEAD_COMPANY from "@salesforce/schema/Lead.Company";
import LEAD_PHONE from "@salesforce/schema/Lead.Phone";
export default class LeadList extends LightningElement {
  /*  leads;
  error;
  wiredLeadsResult; //Store the wired result to use with refreshApex

  //track the record being edited
  selectedLead;
  isEditModelOpen = false;

  //track the record being deleted
  leadToDelete;
  isDeleteModelOpen = false;

  // Wire sevice to call the apex method
  @wire(getLeads)
  wiredLeads(result) {
    this.wiredLeadsResult = result;
    if (result.data) {
      this.leads = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.leads = undefined;
      this.error = result.error.body?.message || "Unknown error";
    }
  }

  // Columns for lighting-datatable
  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Email", fieldName: "Email" },
    { label: "Phone", fieldName: "Phone" },
    { label: "Company", fieldName: "Company" },
    {
      type: "action",
      typeAttributes: {
        rowActions: [
          { label: "Edit", name: "edit" },
          { label: "Delete", name: "delete" }
        ]
      }
    }
  ];

  handleRowAction(event) {
    const action = event.detail.action;
    const row = event.detail.row;

    switch (action.name) {
      case "edit":
        this.openEditModel(row);
        break;
      case "delete":
        this.openDeleteModel(row);
        break;
      default:
        break;
    }
  }

  openEditModel(row) {
    this.selectedLead = { ...row };
    this.isEditModelOpen = true;
  }

  closeEditModel() {
    this.isEditModelOpen = false;
    this.selectedLead = undefined;
  }

  handleLeadChange(event) {
    const field = event.target.dataset.field;
    this.selectedLead[field] = event.target.value;
  }

  updateLead() {
    const fields = {
      [LEAD_ID.fieldApiName]: this.selectedLead.Id,
      [LEAD_FIRSTNAME.fieldApiName]: this.selectedLead.FirstName,
      [LEAD_LASTNAME_FIELD.fieldApiName]: this.selectedLead.LastName,
      [LEAD_EMAIL_FIELD.fieldApiName]: this.selectedLead.Email,
      [LEAD_COMPANY_FIELD.fieldApiName]: this.selectedLead.Company,
      [LEAD_PHONE_FIELD.fieldApiName]: this.selectedLead.Phone
    };

    const recordInput = { fields };

    updateRecord(recordInput)
      .then(() => {
        this.showToast("Success", "Lead updated successfully", "success");
        this.closeEditModel();
        return refreshApex(this.wiredLeadsResult);
      })
      .catch((error) => {
        this.showToast("Error", error.body.message, "error");
      });
  }

  openDeleteModel(row) {
    this.leadToDelete = row;
    this.isDeleteModelOpen = true;
  }

  closeDeleteModel() {
    this.isDeleteModelOpen = false;
    this.leadToDelete = undefined;
  }

  deleteLead() {
    deleteRecord(this.leadToDelete.Id)
      .then(() => {
        this.showToast("Success", "Lead deleted successfully", "success");
        this.closeDeleteModel();
        return refreshApex(this.wiredLeadsResult);
      })
      .catch((error) => {
        this.showToast(
          "Error",
          "Error deleting lead: " + error.body.message,
          "error"
        );
      });
  }

  showToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title,
        message,
        variant
      })
    );
  }*/
  leads;
  @track editLead = {};
  isEditModelOpen = false;
  wiredLeadsResult;

  @wire(getLeads)
  wireLeads(result) {
    this.wiredLeadsResult = result;
    if (result.data) {
      this.leads = result.data;
    } else if (result.error) {
      this.leads = result.error.body.message;
    }
  }

  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Email", fieldName: "Email" },
    { label: "Phone", fieldName: "Phone" },
    { label: "Company", fieldName: "Company" },
    {
      type: "action",
      typeAttributes: {
        rowActions: [
          { label: "Edit", name: "edit" },
          { label: "Delete", name: "delete" }
        ]
      }
    }
  ];

  handleRowAction(event) {
    const action = event.detail.action;
    const row = event.detail.row;

    switch (action.name) {
      case "edit":
        this.editLead = { ...row };
        this.isEditModelOpen = true;
        break;
      case "delete":
        this.deleteLead(row.Id);
        break;
      default:
        break;
    }
  }

  handleInputChange(event) {
    const field = event.target.dataset.field;
    this.editLead[field] = event.target.value;
  }

  closeModal() {
    this.isEditModelOpen = false;
    this.editLead = {};
  }

  updateLead() {
    const fields = {
      [LEAD_ID.fieldApiName]: this.editLead.Id,
      [LEAD_FIRSTNAME.fieldApiName]: this.editLead.FirstName,
      [LEAD_LASTNAME.fieldApiName]: this.editLead.LastName,
      [LEAD_EMAIL.fieldApiName]: this.editLead.Email,
      [LEAD_COMPANY.fieldApiName]: this.editLead.Company,
      [LEAD_PHONE.fieldApiName]: this.editLead.Phone
    };
    updateRecord({ fields })
      .then(() => {
        this.showToast("Success", "Lead Updated successfully", "success");
        this.closeModal();
        return refreshApex(this.wiredLeadsResult);
      })
      .catch((error) => {
        this.showToast("Error", error.body.message, "error");
      });
  }

  deleteLead(leadId) {
    deleteRecord(leadId)
      .then(() => {
        this.showToast("Success", "Lead deleted successfully", "success");
        return refreshApex(this.wiredLeadsResult);
      })
      .catch((error) => {
        this.showToast("Error", error.body.message, "error");
      });
  }

  showToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title,
        message,
        variant
      })
    );
  }
}
