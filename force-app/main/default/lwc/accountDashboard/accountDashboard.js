import { LightningElement } from 'lwc';

export default class AccountDashboard extends LightningElement {
    selectedIndustry = 'Technology';
    selectedRating = 'Hot';

    get industryOptions() {
    return [
        { label: 'Technology', value: 'Technology' },
        { label: 'Finance', value: 'Finance' },
    ];
}

    get ratingOptions() {
        return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
        ];
    }

    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
    }

    handleRatingChange(event) {
        this.selectedRating = event.detail.value;
    }
}
