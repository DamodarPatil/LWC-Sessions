public with sharing class CarSearchFormController {
    @AuraEnabled
    public static List<Car_Type_c> getCarTypes(){
        return [SELECT Id, Name FROM Car_Type_c];
    }
}
