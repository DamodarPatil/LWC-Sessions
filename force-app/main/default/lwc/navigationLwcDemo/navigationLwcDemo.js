import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NavigationLwcDemo extends NavigationMixin(LightningElement) {
    // handleClickNavigation(){
    //     // Navigate To Tab
    //     this[NavigationMixin.Navigate]({
    //         type:'standard__navItemPage',
    //         attributes:{
    //             apiName:'My_Page',
    //         }
    //     })
    //     .then(() => {
    //         console.log('Navigation successfull');
    //     })
    //     .catch(error => {
    //         console.error('Navigation Error:', error);
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Navigation Error',
    //                 message: 'Could not navigate to the specified page. Check console for details',
    //                 variant: 'error'
    //             })
    //         )
    //     })
    // }


    // for the filter
    //  handleClickNavigation(){
    //     this[NavigationMixin.Navigate]({
    //         type:'standard__objectPage',
    //         attributes:{
    //             objectApiName: 'Account',
    //             actionName: 'list'
    //         },
    //         state:{
    //             filterName: 'MyAccounts'
    //         }
    //     })
    //     .then(() => {
    //         console.log('Navigation successfull');
    //     })
    //     .catch(error => {
    //         console.error('Navigation Error:', error);
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Navigation Error',
    //                 message: 'Could not navigate to the specified page. Check console for details',
    //                 variant: 'error'
    //             })
    //         )
    //     })
    // }

    // create the new account record model
    //  handleClickNavigation(){
    //     this[NavigationMixin.Navigate]({
    //         type:'standard__objectPage',
    //         attributes:{
    //             objectApiName: 'Account',
    //             actionName: 'new'
    //         },
    //     })
    //     .then(() => {
    //         console.log('Navigation successfull');
    //     })
    //     .catch(error => {
    //         console.error('Navigation Error:', error);
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Navigation Error',
    //                 message: 'Could not navigate to the specified page. Check console for details',
    //                 variant: 'error'
    //             })
    //         )
    //     })
    // }

    // View custom object record
    //   handleClickNavigation(){
    //     this[NavigationMixin.Navigate]({
    //         type:'standard__recordPage',
    //         attributes:{
    //             recordId: '001Aw00000ZMv1xIAD',
    //             objectApiName: 'Account',
    //             actionName: 'view'
    //         },
    //     })
    //     .then(() => {
    //         console.log('Navigation successfull');
    //     })
    //     .catch(error => {
    //         console.error('Navigation Error:', error);
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Navigation Error',
    //                 message: 'Could not navigate to the specified page. Check console for details',
    //                 variant: 'error'
    //             })
    //         )
    //     })
    // }

    // Open Object Record in Edit Mode
    //   handleClickNavigation(){
    //     this[NavigationMixin.Navigate]({
    //         type:'standard__recordPage',
    //         attributes:{
    //             recordId: '001Aw00000ZMv1xIAD',
    //             objectApiName: 'Account',
    //             actionName: 'edit'
    //         },
    //     })
    //     .then(() => {
    //         console.log('Navigation successfull');
    //     })
    //     .catch(error => {
    //         console.error('Navigation Error:', error);
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Navigation Error',
    //                 message: 'Could not navigate to the specified page. Check console for details',
    //                 variant: 'error'
    //             })
    //         )
    //     })
    // }

    // Navigate to URL
    // handleClickNavigation(){
    //     this[NavigationMixin.Navigate]({
    //         type:'standard__webPage',
    //         attributes:{
    //             url: 'https://github.com/DamodarPatil/LWC-Sessions/tree/main/force-app/main/default'
    //         },
    //     })
    //     .then(() => {
    //         console.log('Navigation successfull');
    //     })
    //     .catch(error => {
    //         console.error('Navigation Error:', error);
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Navigation Error',
    //                 message: 'Could not navigate to the specified page. Check console for details',
    //                 variant: 'error'
    //             })
    //         )
    //     })
    // }

    // open one of more file record
    // handleClickNavigation(){

    //     this[NavigationMixin.Navigate]({
    //         type:'standard__namedPage',
    //         attributes:{
    //             pageName: 'filePreview'
    //         },
    //         state:{
    //             // recordIds: you can give here multiple record id
    //             // selectedRecordId: here you can mention which file first to show
    //         }
    //     })
    //     .then(() => {
    //         console.log('Navigation successfull');
    //     })
    //     .catch(error => {
    //         console.error('Navigation Error:', error);
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Navigation Error',
    //                 message: 'Could not navigate to the specified page. Check console for details',
    //                 variant: 'error'
    //             })
    //         )
    //     })
    // }
}
