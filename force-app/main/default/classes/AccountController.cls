public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String industry, String rating){
        return [SELECT Id, Name, Industry, Rating FROM Account WHERE Industry = :industry AND Rating = :rating LIMIT 50];
    }
}
