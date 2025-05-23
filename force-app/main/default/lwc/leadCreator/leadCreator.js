import { LightningElement, wire } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { fireEvent } from "c/pubsub";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

import LEAD_FIRSTNAME from "@salesforce/schema/Lead.FirstName";
import LEAD_LASTNAME from "@salesforce/schema/Lead.LastName";
import LEAD_EMAIL from "@salesforce/schema/Lead.Email";
import LEAD_COMPANY from "@salesforce/schema/Lead.Company";
export default class LeadCreator extends NavigationMixin(LightningElement) {
  @wire(CurrentPageReference) pageRef;

  newLead = {
    FirstName: "",
    LastName: "",
    Email: "",
    Company: ""
  };

  handleInputChange(event) {
    const field = event.target.dataset.field;
    this.newLead[field] = event.target.value;
  }

  createLead() {
    const fields = {
      /* FirstName: this.firstName,
      LastName: this.lastName || "Test",
      Email: this.email,
      Company: this.company || "Test Company"*/
      [LEAD_FIRSTNAME.fieldApiName]: this.newLead.FirstName,
      [LEAD_LASTNAME.fieldApiName]: this.newLead.LastName,
      [LEAD_EMAIL.fieldApiName]: this.newLead.Email,
      [LEAD_COMPANY.fieldApiName]: this.newLead.Company
    };

    const recordInput = { apiName: "Lead", fields };

    createRecord(recordInput)
      .then((lead) => {
        console.log("Lead record created: ", JSON.stringify(lead));
        console.log("About to fire event with pageRef:", this.pageRef);

        fireEvent(this.pageRef, "leadCreated", lead);
        console.log("Evnet Fired: leadCreated");
        this.showToast("Success", "Lead created successfully", "success");

        // Navigate to the record
       /* this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: lead.id,
            objectApiName: "Lead",
            actionName: "view"
          }
        }); // we can also reset field here*/
        this.newLead = {};
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
