public with sharing class CodingProblem1Controller {
    @AuraEnabled
    public static List<Contact> getActiveContacts(Id accountId){
        return [SELECT Id, Name, Department, Email FROM Contact WHERE Active__c = True AND AccountId = :accountId];
    }
}
