import { LightningElement } from "lwc";
import { fireEvent } from "c/pubsub";

export default class ProductScanner extends LightningElement {
  barcode = "";

  handleBarcodeChange(event) {
    this.barcode = event.target.value;
  }

  handleScan() {
    const scannerProduct = {
      id: this.barcode,
      name: `Product ${this.barcode}`,
      timeStamp: new Date().toISOString()
    };

    

  }
}
