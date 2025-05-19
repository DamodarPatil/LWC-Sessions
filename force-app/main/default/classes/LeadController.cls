public with sharing class LeadController {
  @AuraEnabled(cacheable=true)
  public static List<Lead> getLeads() {
    try {
      return [
        SELECT Id, FirstName, LastName, Name, Email, Phone, Company
        FROM Lead
        LIMIT 10
      ];
    } catch (Exception e) {
      throw new AuraHandledException('Error Fetching leads: ' + e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<Lead> getLeadDetails(Id leadId) {
    try {
      return [
        SELECT Id, FirstName, LastName, Email, Phone
        FROM Lead
        WHERE Id = :leadId
        LIMIT 1
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
