public with sharing class CodingProblem1Controller {
  @AuraEnabled
  public static List<Contact> getActiveContacts(Id accountId) {
    return [
      SELECT Id, Name, Department, Email
      FROM Contact
      WHERE Active__c = TRUE AND AccountId = :accountId
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(Id accountId) {
    return [
      SELECT Id, FirstName, LastName, Email
      FROM Contact
      WHERE AccountId = :accountId
    ];
  }

  @AuraEnabled
  public static Contact createContactRecord(Contact fields) {
    try {
      insert fields;
      return fields;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static Contact updateContactRecord(Contact fields) {
    try {
      update fields;
      return fields;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static Boolean deleteContactRecord(Id contactId) {
    try {
      delete [SELECT Id FROM Contact WHERE Id = :contactId];

      return true;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
