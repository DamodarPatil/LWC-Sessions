import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/CodingProblem1Controller.getAccount';

export default class CodingProblem1A extends LightningElement {

    @wire(getAccount)
    accounts;
}
