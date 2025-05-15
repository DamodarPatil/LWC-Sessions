public with sharing class CodingProblem1Controller {
    @AuraEnabled
    public static List<Account> getAccount(){
        return [SELECT Name, Industry FROM Account LIMIT 10];
    }
}
