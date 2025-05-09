import { api, LightningElement } from 'lwc';

export default class CarTile extends LightningElement {
    @api car;
    @api carSelectedId;

    handleCarSelect(event){
        event.preventDefault();

        const carId = this.car.Id;

        const carSelect = new CustomEvent('carselect', {detail: carId});
        this.dispatchEvent(carSelect);
    }

    get isCarSelected(){
    const result = this.car.Id === this.carSelectedId ? "tile selected" : "tile";
    console.log('Car ID:', this.car.Id);
    console.log('Selected ID:', this.carSelectedId);
    console.log('Class applied:', result);
    return result;
    }
}
