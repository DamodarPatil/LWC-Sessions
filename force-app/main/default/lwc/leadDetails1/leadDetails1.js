import getLeadDetails from "@salesforce/apex/LeadController.getLeadDetails";
import { api, LightningElement } from "lwc";

export default class LeadDetails1 extends LightningElement {
  @api recordId;

  leadData;
  error;
  isLoading = false;

  hasRendered = false;

  constructor() {
    super();
    console.log("Constructor() called");
    this.hasRendered = false;
  }

  connectedCallback() {
    console.log("Connctedcallback() called");
    this.isLoading = true;
    getLeadDetails({ leadId: this.recordId })
      .then((result) => {
        this.leadData = result;
        this.error = null;
      })
      .catch((error) => {
        this.error = error.body.message;
        this.leadData = null;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  renderedCallback() {
    console.log("renderedCallback() called");

    if (!this.hasRendered && this.leadData) {
      const emailInput = this.template.querySelector('[data-id="email"]');
      if (emailInput) {
        emailInput.focus();
        console.log("Email Input focused");
      }
      this.hasRendered = true;
    }
  }

  disconnectedCallback() {
    console.log("disconnctedCallback() called");

  }

  errorCallback(error, stack) {
    console.error("errorCallback() called");
    console.error("Error:", error);
    console.error("Stack:", stack);
  }
}
