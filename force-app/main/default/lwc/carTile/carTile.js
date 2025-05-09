import { api, LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
export default class CarTile extends LightningElement {
    @api car;
    @api carSelectedId;
    @wire(CurrentPageReference) pageRef;

    handleCarSelect(event){
        event.preventDefault();

        const carId = this.car.Id;

        const carSelect = new CustomEvent('carselect', {detail: carId});
        this.dispatchEvent(carSelect);

        fireEvent(this.pageRef, 'carselect', this.car.Id);
    }

    get isCarSelected(){
    const result = this.car.Id === this.carSelectedId ? "tile selected" : "tile";
    console.log('Car ID:', this.car.Id);
    console.log('Selected ID:', this.carSelectedId);
    console.log('Class applied:', result);
    return result;
    }
}
