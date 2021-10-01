import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class DefaultProjectForm extends NavigationMixin(LightningElement) {
    projectId;

    @track isLoaded = false;
    defaultName;
    defaultType;
    defaultNotes;

    handleSuccess(event) {
        this.recordId = event.detail.id;
        console.log(this.recordId);
        this.showToast();
        this.navigateToRecordViewPage();

    }

    navigateToRecordViewPage() { 
        console.log('im here');
        this[NavigationMixin.Navigate]({
          type: 'standard__recordPage',
          attributes: {
              recordId: this.recordId,
              objectApiName: 'Project__c',
              actionName: 'view'
          },
      });
      }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Project succesfully created.',
        });
        this.dispatchEvent(event);
    }

    renderedCallback() {
        this.defaultName = 'Default ' + Date.now();
        this.defaultType = 'Educational';
        this.defaultNotes = 'Default';

        this.isLoaded = true;
    }
}