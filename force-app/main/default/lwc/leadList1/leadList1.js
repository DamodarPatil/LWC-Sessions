import { LightningElement, track } from "lwc";

export default class LeadList1 extends LightningElement {
 @track leads = [
    {
      Id: 1,
      leadName: "John Doe",
      leadStatus: "New"
    },
    {
      Id: 2,
      leadName: "Damodar Patil",
      leadStatus: "Contacted"
    },
    {
      Id: 3,
      leadName: "Devansh Patel",
      leadStatus: "New"
    }
  ];

  updateLeadStatus(event) {
    const leadId = event.detail;
    const lead = this.leads.find((item) => item.Id === parseInt(leadId, 10));
    if (lead) {
      lead.leadStatus = "Contacted";
    }
  }
}
