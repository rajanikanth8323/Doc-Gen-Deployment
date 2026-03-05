public with sharing class ClauseController {

    @AuraEnabled(cacheable=true)
    public static List<Clause__c> getClauses() {
        return [
            SELECT Id, Name, Region__c, Role__c, ClauseDetails__c
            FROM Clause__c
            ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static Id saveClause(Clause__c clauseRec) {
        upsert clauseRec;
        return clauseRec.Id;
    }
}
