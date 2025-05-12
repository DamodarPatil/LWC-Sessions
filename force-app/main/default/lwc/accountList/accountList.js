import getAccounts from "@salesforce/apex/AccountController.getAccounts";
import { api, LightningElement, wire } from "lwc";

export default class AccountList extends LightningElement {
  @api industry;
  @api rating;

  @wire(getAccounts, { industry: "$industry", rating: "$rating" })
  accounts;

  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Industry", fieldName: "Industry" },
    { label: "Rating", fieldName: "Rating" }
  ];
}
