import { LightningElement, api } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import NAME_FIELD from "@salesforce/schema/Car_Experience__c.Name";
import EXPERIENCE_FIELD from "@salesforce/schema/Car_Experience__c.Experience__c";
import CAR_FIELD from "@salesforce/schema/Car_Experience__c.Car__c";
import EXPERIENCE_OBJECT from "@salesforce/schema/Car_Experience__c";

export default class AddCarExperience extends LightningElement {
  @api carId;

  // Add debug logging when carId changes
  @api
  set carId(value) {
    console.log("Car ID received in addCarExperience:", value);
    this._carId = value;
  }

  get carId() {
    return this._carId;
  }

  expTitle = "";
  expDescription = "";
  handleTitleChange(event) {
    this.expTitle = event.target.value;
  }

  handleDescriptionChange(event) {
    this.expDescription = event.target.value;
  }

  addExperience() {
    console.log("Adding experience for car ID:", this.carId);
    const fields = {};
    fields[NAME_FIELD.fieldApiName] = this.expTitle;
    fields[EXPERIENCE_FIELD.fieldApiName] = this.expDescription;
    fields[CAR_FIELD.fieldApiName] = this.carId;

    const recordInput = { apiName: EXPERIENCE_OBJECT.objectApiName, fields };

    createRecord(recordInput)
      .then(() => {
        this.showToast("SUCCESS", "Experience Record Updated", "success");
      })
      .catch((error) => {
        this.showToast("ERROR", error.body.message, "error");
      });
  }

  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(evt);
  }
}
