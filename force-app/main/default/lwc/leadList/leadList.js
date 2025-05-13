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
  leads;
  @track editLead = {};
  isEditModelOpen = false;
  wiredLeadsResult;
  selectedLeadId;

  @wire(getLeads)
  wireLeads(result) {
    this.wiredLeadsResult = result;
    if (result.data) {
      this.leads = result.data;
    } else if (result.error) {
      this.error = result.error.body.message;
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
          { label: "Delete", name: "delete" },
          { label: "View Details", name: "view_details" }
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
      case "view_details":
        this.selectedLeadId = row.Id;
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
