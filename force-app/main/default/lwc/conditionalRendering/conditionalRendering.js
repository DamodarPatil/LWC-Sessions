import { LightningElement, track } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    @track displayDiv = false;

    @track cityName = ["Ahmedabad","Surat","Jaipur","Patna","Indor"];
    
    showDivHandler(event){
        this.displayDiv = event.target.checked;
    }
}
