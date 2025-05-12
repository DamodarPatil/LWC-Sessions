import getLeads from '@salesforce/apex/LeadController.getLeads';
import { LightningElement, wire } from 'lwc';

export default class LeadList extends LightningElement {
    leads;
    error;

    // Wire sevice to call the apex method
    @wire(getLeads)
    wiredLeads({data, error}){
        if(data){
            this.leads = data;
            this.error = undefined;
        } else if(error){
            this.leads = undefined;
            this.error = error.body.message;
        }
    }

    // Columns for lighting-datatable
    columns = [
        { label: 'Name', fieldName: 'Name'},
        { label: 'Email', fieldName: 'Email'},
        { label: 'Phone', fieldName: 'Phone'},
        { label: 'Company', fieldName: 'Company'},
    ]
}
