import { LightningElement, track, wire } from 'lwc';
import getClauses from '@salesforce/apex/ClauseController.getClauses';
import saveClause from '@salesforce/apex/ClauseController.saveClause';

export default class ClauseManager extends LightningElement {

    @track clauses = [];
    @track showModal = false;
    @track clause = {};

    columns = [
        { label: 'Clause Name', fieldName: 'Name' },
        { label: 'Region', fieldName: 'Region__c' },
        { label: 'Role', fieldName: 'Role__c' },
        { label: 'Clause Details', fieldName: 'ClauseDetails__c' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                variant: 'brand'
            }
        }
    ];

    @wire(getClauses)
    wiredClauses({data}) {
        if(data) this.clauses = data;
    }

    handleNew() {
        this.clause = {};
        this.showModal = true;
    }

    handleRowAction(event) {
        const row = event.detail.row;
        this.clause = {...row};
        this.showModal = true;
    }
handleRowSelection(event) {
    const selectedRows = event.detail.selectedRows;
    if (selectedRows.length > 0) {
        this.selectedClauseId = selectedRows[0].Id;
    }
}

    handleChange(event){
        const field = event.target.dataset.field;
        this.clause[field] = event.target.value;
    }

    closeModal(){
        this.showModal = false;
    }

    async saveClause(){
        await saveClause({ clauseRec: this.clause });
        this.showModal = false;
        location.reload(); // simple refresh (later replace with refreshApex)
    }
}
