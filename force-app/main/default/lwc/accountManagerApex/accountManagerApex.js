import { LightningElement, track, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/accountManager.getAccount'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountManagerApex extends LightningElement {
    // @wire(getAllAccounts)
    // accounts;
    @track numberOfRecords;
    @track accounts;
    // get responseReceived(){
    //     if(this.accounts){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    get responseReceived(){
        if(this.accounts){
            return true;
        }else{
            return false;
        }
    }

    numberOfAccountsChangeHandler(event){
        this.numberOfRecords = event.target.value;
    }

    getAccounts(){
        getAllAccounts({numberOfRecords:this.numberOfRecords}).then(response => {
            this.accounts = response;
            const toastEvent = new ShowToastEvent({
                title: 'Accounts Loaded',
                message: this.numberOfRecords + ' Accounts Fetched From Server',
                variant: 'success',
            });
            this.dispatchEvent(toastEvent);
        }).catch(error => {
            console.error("Error in getting the accounts", error.body.message);
            const toastEvent = new ShowToastEvent({
                title: 'Error in getting the records',
                message: error.body.message,
                variant: 'error',
            });
            this.dispatchEvent(toastEvent);
        })
    }
}
