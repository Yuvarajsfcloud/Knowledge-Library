# API-Sourced Batch Apex Pattern

> **Type:** Architecture note — reusable pattern
> **Platform:** Salesforce Apex
> **Last updated:** 2026-06-06

---

## The Problem

Every Salesforce developer learns `Database.Batchable` through the QueryLocator pattern: the batch queries Salesforce records, processes them in chunks. But a different class of problem — pulling records **from an external API** — requires an entirely different implementation that the platform documentation surfaces less prominently.

If a developer applies the QueryLocator pattern to an inbound integration, they end up querying Salesforce for records that don't exist yet. The batch does nothing.

---

## The Two Patterns Side by Side

| | QueryLocator pattern | Iterable/Iterator pattern |
|---|---|---|
| **Data source** | Salesforce records (SOQL) | External API, file, computed list |
| **`start()` returns** | `Database.QueryLocator` | `Iterable<T>` |
| **`execute()` receives** | `List<SObject>` | `List<YourWrapper>` |
| **Callouts in execute()** | No — callouts blocked in QueryLocator batches | Yes — with `Database.AllowsCallouts` |
| **When to use** | Bulk update/delete of existing Salesforce records | Inbound sync from external system via API |
| **Example use case** | Mass-update Account owner after territory change | Nightly ERP → Salesforce account sync |

---

## The Pattern

### 1. Iterator — one HTTP call per page

```apex
public class ERPCustomerIterator implements Iterator<List<ERPCustomerWrapper>> {

    private Integer currentPage = 0;
    private final Integer pageSize;
    private Boolean hasMore = true;

    public ERPCustomerIterator(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Boolean hasNext() {
        return hasMore;
    }

    public List<ERPCustomerWrapper> next() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:ERP_API/customers?page=' + currentPage + '&size=' + pageSize);
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);

        ERPPageResponse page = (ERPPageResponse) JSON.deserialize(
            res.getBody(), ERPPageResponse.class
        );
        currentPage++;
        hasMore = !page.isLastPage;
        return page.customers;
    }
}
```

### 2. Iterable — wraps the iterator

```apex
public class ERPCustomerIterable implements Iterable<List<ERPCustomerWrapper>> {
    private final Integer pageSize;

    public ERPCustomerIterable(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Iterator<List<ERPCustomerWrapper>> iterator() {
        return new ERPCustomerIterator(pageSize);
    }
}
```

### 3. Batch class — Batchable + AllowsCallouts + Stateful

```apex
public with sharing class ERPAccountSyncBatch
    implements Database.Batchable<List<ERPCustomerWrapper>>,
               Database.AllowsCallouts,
               Database.Stateful {

    private List<String> failedERPIds = new List<String>();

    public Iterable<List<ERPCustomerWrapper>> start(Database.BatchableContext ctx) {
        return new ERPCustomerIterable(200);
    }

    public void execute(Database.BatchableContext ctx, List<List<ERPCustomerWrapper>> scope) {
        // scope contains one item — the List<ERPCustomerWrapper> from one iterator.next()
        List<ERPCustomerWrapper> customers = scope[0];
        List<String> failed = ERPAccountSyncService.upsertAccounts(customers);
        failedERPIds.addAll(failed);
    }

    public void finish(Database.BatchableContext ctx) {
        if (!failedERPIds.isEmpty()) {
            ERPSyncErrorNotifier.sendAlert(failedERPIds);
        }
    }
}
```

> **Scope = 1:** Set scope to `1` when using `Database.executeBatch(batch, 1)`. This means each `execute()` call processes one iterator result (one API page). Do not set scope higher — the platform passes one item to execute per scope count, but the iterator has already fetched the page.

### 4. Schedulable wrapper

```apex
public class ERPAccountSyncSchedulable implements Schedulable {
    public void execute(SchedulableContext ctx) {
        Database.executeBatch(new ERPAccountSyncBatch(), 1);
    }
}
```

### 5. Schedule script (run manually post-deploy)

```apex
String cronExpr = '0 0 3 * * ?'; // 3 AM daily
String jobName = 'ERP Account Sync Daily';

for (CronTrigger ct : [SELECT Id FROM CronTrigger WHERE CronJobDetail.Name = :jobName]) {
    System.abortJob(ct.Id);
}
System.schedule(jobName, cronExpr, new ERPAccountSyncSchedulable());
```

---

## Checklist — Before Generating This Pattern

- [ ] Source is an external API (not a Salesforce SOQL query) → use Iterable/Iterator
- [ ] Volume >10,000 records → Batch Apex required (R-012)
- [ ] Named Credential set up for the external system (never hardcode endpoint)
- [ ] External ID field exists on target object: Text, Unique, Indexed, named `[System]_[Object]_ID__c` (R-011)
- [ ] `Database.AllowsCallouts` added to batch class header
- [ ] `Database.Stateful` added if accumulating failures across execute() calls
- [ ] `finish()` handles partial failure notifications
- [ ] Schedulable wrapper created; `System.schedule()` script at `scripts/schedule-[batch-name].apex`
- [ ] Scope set to `1` when scheduling via `Database.executeBatch(batch, 1)`

---

## Governance Rules

| Rule | Requirement |
|---|---|
| R-011 | External ID field on every object synced from an external system |
| R-012 | >10k records → Batch Apex, scope ≤200 |
| AS-002 | All Salesforce→external callouts must route through MuleSoft or AIS; Named Credential points to middleware, not ERP directly |

---

## Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| `Database.QueryLocator` for API pull | Queries Salesforce — external records not there yet | Use `Iterable<T>` |
| Callout directly to ERP from Apex | Violates AS-002 (middleware mandate) | Route via MuleSoft Named Credential |
| Salesforce record Id as upsert key | Id is org-specific — breaks after sandbox refresh or record delete | Use External ID field |
| Missing `Database.AllowsCallouts` | Runtime exception: callouts not permitted in batch | Add to class implements clause |
| No Stateful accumulation | Partial failures are silently lost | Add `Database.Stateful`, accumulate in list |

---

## Related Case Studies

- [ERP Account Sync](../../case-studies/integration/erp-account-sync.md) — this pattern in practice, including the simulation that identified it as missing from the framework
