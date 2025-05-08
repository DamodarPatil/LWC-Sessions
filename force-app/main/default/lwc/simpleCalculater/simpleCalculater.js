import { LightningElement, track } from 'lwc';

export default class SimpleCalculater extends LightningElement {
    @track currentResult;
    @track previousResults = [];
    @track showPreviousResults = false;

    firstNumber;
    secondNumber;

    showPreviousResultToggle(event) {
        this.showPreviousResults = event.target.checked;
    }

    numberChangeHandler(event){
        const inputBoxName = event.target.name;

        if(inputBoxName === "firstNumber") {
            this.firstNumber = event.target.value;
        }else if(inputBoxName === "secondNumber") {
            this.secondNumber = event.target.value;
        }
    }

    addHandler(){
        const n1 = parseInt(this.firstNumber);
        const n2 = parseInt(this.secondNumber);

        this.currentResult = `Result of ${n1} + ${n2} is ${n1 + n2}`;
        this.previousResults.push(this.currentResult);
    }

    subtractHandler(){
        const n1 = parseInt(this.firstNumber);
        const n2 = parseInt(this.secondNumber);

        this.currentResult = `Result of ${n1} + ${n2} is ${n1 - n2}`;
        this.previousResults.push(this.currentResult);
    }

     multiplicationHandler(){
        const n1 = parseInt(this.firstNumber);
        const n2 = parseInt(this.secondNumber);

        this.currentResult = `Result of ${n1} + ${n2} is ${n1 * n2}`;
        this.previousResults.push(this.currentResult);
    }

     divisionHandler(){
        const n1 = parseInt(this.firstNumber);
        const n2 = parseInt(this.secondNumber);

        this.currentResult = `Result of ${n1} + ${n2} is ${n1 / n2}`;
        this.previousResults.push(this.currentResult);
    }

}
