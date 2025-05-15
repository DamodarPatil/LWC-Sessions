import { api, LightningElement } from "lwc";

export default class LeadCard1 extends LightningElement {
  @api leadName;
  @api leadStatus;
  @api leadId;

  handleNewStatus() {
    this.dispatchEvent(
      new CustomEvent("newstatus", {
        detail: this.leadId
      })
    );
  }
}
