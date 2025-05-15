public with sharing class AccountController2 {
    
  @AuraEnabled(cacheable=false)
  public static List<Account> getAccount() {
    return [SELECT Id, Name FROM Account LIMIT 10];
  }
}
