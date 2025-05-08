import { LightningElement, track } from 'lwc';
import getCarTypes from '@salesforce/apex/CarSearchFormController.getCarTypes'

export default class CarSearchForm extends LightningElement {
    @track carTypes;

    handleCarTypeChange(event){

    }

    createNewCarType(){

    }
}
