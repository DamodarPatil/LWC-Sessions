import { api, LightningElement, wire } from "lwc";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";

import LEAD_NAME from "@salesforce/schema/Lead.Name";
import LEAD_EMAIL from "@salesforce/schema/Lead.Email";
import LEAD_COMPANY from "@salesforce/schema/Lead.Company";
import LEAD_PHONE from "@salesforce/schema/Lead.Phone";
// const FIELDS = ["Lead.Name", "Lead.Email", "Lead.Phone", "Lead.Company"];
const FIELDS = [LEAD_NAME, LEAD_EMAIL, LEAD_COMPANY, LEAD_PHONE];

export default class LeadDetail extends LightningElement {
  @api leadId;
  lead;

  @wire(getRecord, { recordId: "$leadId", fields: FIELDS })
  wiredLead({ data, error }) {
    if (data) {
      this.lead = data;
    } else if (error) {
      this.error = error.body.message;
    }
  }

  get name() {
    return getFieldValue(this.lead, LEAD_NAME) || "N/A";
  }

  get email() {
    return getFieldValue(this.lead, LEAD_EMAIL) || "N/A";
  }

  get phone() {
    return getFieldValue(this.lead, LEAD_PHONE) || "N/A";
  }

  get company() {
    return getFieldValue(this.lead, LEAD_COMPANY) || "N/A";
  }
}
