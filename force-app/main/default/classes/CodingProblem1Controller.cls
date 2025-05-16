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
  public static Contact createContactRecord(String contactJSON) {
    try {
      ContactWrapper contactWrapperRec = (ContactWrapper) JSON.deserialize(
        contactJSON,
        ContactWrapper.class
      );

      if (contactWrapperRec != null) {
        Contact conRec = new Contact();
        conRec.FirstName = contactWrapperRec.firstName;
        conRec.LastName = contactWrapperRec.lastName;
        conRec.Email = contactWrapperRec.email;
        conRec.AccountId = contactWrapperRec.accountId;

        insert conRec;

        return conRec;
      }
      return null;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  public class ContactWrapper {
    public String firstName;
    public String lastName;
    public String accountId;
    public String email;
  }
}
