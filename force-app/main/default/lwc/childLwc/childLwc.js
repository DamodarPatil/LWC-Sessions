import { LightningElement } from 'lwc';

export default class ChildLwc extends LightningElement {

    handleSubstract(){
        this.dispatchEvent(new CustomEvent('substract'));
    }

    handleAdd(){
        this.dispatchEvent(new CustomEvent('add'));
    }
}
