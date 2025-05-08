public with sharing class accountManager {

    // @AuraEnabled(cacheable=true)
    // public static List<Account> getAccount(){
    //     try {
    //         return [SELECT Id, Name, Phone FROM Account Limit 10];
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
    @AuraEnabled
    public static List<Account> getAccount(Integer numberOfRecords){
        try {
            return [SELECT Id, Name, Phone FROM Account Limit :numberOfRecords];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
