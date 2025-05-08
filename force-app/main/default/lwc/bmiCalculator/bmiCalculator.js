import { LightningElement, track } from 'lwc';

export default class BmiCalculator extends LightningElement {
    cardTitle = 'BMI Calculators';

    // changePrivatePropertyHandler(){
    //     this.cardTitle = 'Nothing';
    //     console.log(this.cardTitle);

    // }

   @track bmiData = {
        weight: 0,
        height: 0,
        result: 0
    };

    @track bmi;
    onWeightChange(event){
        this.bmiData.weight = parseFloat(event.target.value);
    }
    onHeightChange(event){
        this.bmiData.height = parseFloat(event.target.value);
    }

    calculateBMI(){
        const heightInMeters = this.bmiData.height / 100;
        try {
            this.bmiData.result = this.bmiData.weight/(heightInMeters * heightInMeters);
        } catch (error) {
            this.bmiData.result = undefined;
        }
    }

    get bmiValue() {
        return `Your BMI values is ${this.bmiData.result}`;
    }


}
