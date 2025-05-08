import { LightningElement, track } from 'lwc';

export default class FirstLWC extends LightningElement {
    @track dyanamicGreeting = "Morning";

    greetingChangeHandler(event) {
        this.dyanamicGreeting = event.target.value;
    }
}
