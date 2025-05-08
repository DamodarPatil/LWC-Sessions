import { api, LightningElement, track } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    @track value = ['red'];

    options = [
            {label:'Red Marker', value:'red'},
            {label:'Blue Marker', value:'blue'},
            {label:'Green Marker', value:'green'},
            {label:'Yellow Marker', value:'yellow'}
        ];

    @api
    selectCheckbox(checkBoxValue){
        const selectedCheckbox = this.options.find((checkbox)=>{
            return checkBoxValue === checkbox.value;
        })
        if(selectedCheckbox){
            this.value = selectedCheckbox.value;
            return "Successfully checked";

        } else{
            return "No checkbox found";
        }
    }
}
