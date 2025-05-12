import { LightningElement } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class LeadCreator extends NavigationMixin(LightningElement) {
  firstName = "";
  lastName = "";
  email = "";
  company = "";

  handleInputChange(event) {
    const fieldName = event.target.dataset.field;
    this[fieldName] = event.target.value;
  }

  createLead() {
    const fields = {
      FirstName: this.firstName,
      LastName: this.lastName || "Test",
      Email: this.email,
      Company: this.company || "Test Company"
    };

    const recordInput = { apiName: "Lead", fields };

    createRecord(recordInput)
      .then((lead) => {
        console.log("Lead record created: ", JSON.stringify(lead));
        // Navigate to the record
        this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: lead.id,
            objectApiName: "Lead",
            actionName: "view"
          }
        });
        this.showToast("Success", "Lead created successfully", "success");
        // we can also reset field here
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.company = "";
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
