import { LightningElement } from "lwc";
import getAccount from "@salesforce/apex/AccountController2.getAccount";

export default class AccountList1 extends LightningElement {
  data;
  error;

  handleGetAccount() {
    getAccount()
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        this.error = error.body.message;
      });
  }
}
