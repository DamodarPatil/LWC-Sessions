import { LightningElement } from 'lwc';

export default class GetSetExample extends LightningElement {
    name="Damodar";
    originalAge = 1;
    newAge = 0;

    get age(){
        return this.originalAge;
    }

    set age(value){
        if(value > 25){
            console.error("Age cannot be set to a value greater than 25");
            this.originalAge = 24;
        }else{
            this.originalAge = value;
        }
    }

    handleChange(event){
        this.newAge = event.target.value;
    }

    handleClick(){
        this.age = this.newAge;
    }

}
