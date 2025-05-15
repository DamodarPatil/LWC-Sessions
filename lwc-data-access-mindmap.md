# 🧠 LIGHTNING WEB COMPONENTS DATA ACCESS MINDMAP 🧠

```
                      ┌───────────────────────────────────────────┐
                      │      🔄 DATA ACCESS METHODS IN LWC        │
                      └──────────────────┬────────────────────────┘
                                         │
              ┌────────────────────┬─────┴────────┬───────────────────────┐
              │                    │              │                       │
              ▼                    ▼              ▼                       ▼
  ┌─────────────────────┐ ┌───────────────┐ ┌───────────────┐  ┌──────────────────┐
  │   @wire DECORATOR   │ │IMPERATIVE APEX│ │ UI RECORD API │  │LIGHTNING MESSAGE │
  └──────────┬──────────┘ └───────┬───────┘ └───────┬───────┘  │    SERVICE      │
             │                    │                 │          └──────────────────┘
             ▼                    ▼                 ▼
     ┏━━━━━━━━━━━━━━━┓    ┏━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━┓
     ┃ CHARACTERISTICS┃    ┃ CHARACTERISTICS┃  ┃ CHARACTERISTICS┃
     ┗━━━━━━━┯━━━━━━━┛    ┗━━━━━━━┯━━━━━━━┛  ┗━━━━━━━┯━━━━━━━┛
             │                    │                  │
       ┌─────┴─────┐        ┌─────┴─────┐      ┌─────┴─────┐
       ▼           ▼        ▼           ▼      ▼           ▼
┌─────────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐
│ REACTIVITY  │ │ CACHING │ │ CONTROL │ │ PROMISES │ │ NO APEX  │ │ STANDARD    │
└──────┬──────┘ └────┬────┘ └────┬────┘ └────┬─────┘ └────┬─────┘ └──────┬──────┘
       │            │           │           │            │              │
       ▼            ▼           ▼           ▼            ▼              ▼
 •━━━━━━━━━━━•  •━━━━━━━━•  •━━━━━━━━━•  •━━━━━━━━━•  •━━━━━━━━━•  •━━━━━━━━━━━•
 ❯ Automatically ❯ Results  ❯ Developer ❯ .then()  ❯ Built-in  ❯ CRUD on
   refreshes      cached     controls    .catch()    wire        standard
   when params    for perf.  when data   for error   adapters    objects
   change                    is fetched  handling                without code
 •━━━━━━━━━━━•  •━━━━━━━━•  •━━━━━━━━━•  •━━━━━━━━━•  •━━━━━━━━━•  •━━━━━━━━━━━•

╔═════════════════════════╗  ╔═════════════════════════╗  ╔═════════════════════════╗
║        @WIRE USAGE      ║  ║    IMPERATIVE USAGE     ║  ║     UI API USAGE        ║
╠═════════════════════════╣  ╠═════════════════════════╣  ╠═════════════════════════╣
║ @wire(getRecords, {     ║  ║ getRecords({            ║  ║ import { getRecord } from║
║   params: '$paramValue' ║  ║   params: this.value    ║  ║ 'lightning/uiRecordApi'; ║
║ })                      ║  ║ })                      ║  ║                         ║
║ wiredRecords;           ║  ║   .then(result => {     ║  ║ @wire(getRecord, {      ║
║                         ║  ║     this.data = result; ║  ║   recordId: '$recordId',║
║ // OR with function     ║  ║   })                    ║  ║   fields: FIELDS        ║
║ @wire(getRecords, {     ║  ║   .catch(error => {     ║  ║ })                      ║
║   params: '$paramValue' ║  ║     this.error = error; ║  ║ record;                 ║
║ })                      ║  ║   });                   ║  ║                         ║
║ wiredRecordsFunction({  ║  ║                         ║  ║ // CREATE/UPDATE        ║
║   error, data }) { }    ║  ║                         ║  ║ updateRecord(recordInput)║
╚═════════════════════════╝  ╚═════════════════════════╝  ╚═════════════════════════╝

┌───────────────────────────────────────────────────────────────────────────────────┐
│                             WHEN TO USE EACH METHOD                                │
└───────────────────────────┬───────────────────────┬───────────────────────────────┘
                            │                       │
              ┌─────────────┴─────────────┐ ┌───────┴─────────────┐
              │           @WIRE           │ │     IMPERATIVE      │
              └─────────────┬─────────────┘ └───────┬─────────────┘
                            │                       │
        ┌─────────┬─────────┼─────────┬─────────┐   ├─────────┬─────────┐
        │         │         │         │         │   │         │         │
        ▼         ▼         ▼         ▼         ▼   ▼         ▼         ▼
   ┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌────────┐┌─────────┐┌─────────┐┌─────────┐
   │Page load││ Reactive││ Simple  ││ Read-   ││ User   ││ Complex ││ Creating││ Custom  │
   │data     ││ UI needs││ queries ││ only    ││actions ││ error   ││ records ││ refresh │
   │fetching ││         ││         ││ data    ││        ││handling ││         ││ logic   │
   └─────────┘└─────────┘└─────────┘└─────────┘└────────┘└─────────┘└─────────┘└─────────┘
```

## 📝 LWC Data Access Methods Comparison

| Feature               | @wire     | Imperative     | UI Record API   | Lightning Message Service |
| --------------------- | --------- | -------------- | --------------- | ------------------------- |
| Reactivity            | ⭐⭐⭐⭐  | ⭐             | ⭐⭐⭐⭐        | ⭐⭐⭐                    |
| Control over fetching | ⭐        | ⭐⭐⭐⭐       | ⭐⭐            | ⭐⭐⭐                    |
| Error Handling        | ⭐⭐      | ⭐⭐⭐⭐       | ⭐⭐⭐          | ⭐⭐                      |
| Caching               | ⭐⭐⭐⭐  | ⭐             | ⭐⭐⭐⭐        | N/A                       |
| Performance           | ⭐⭐⭐⭐  | ⭐⭐           | ⭐⭐⭐          | ⭐⭐⭐                    |
| Methods supported     | GET only  | Any (GET/POST) | CRUD operations | Inter-component messaging |
| Data refresh          | Automatic | Manual         | Automatic       | On publish/subscribe      |
| Apex Required         | Yes       | Yes            | No              | No                        |

## 💡 Best Practices

### @wire

- Use for data that needs to be displayed immediately on component load
- Ideal for data that should reactively update when parameters change
- Combine with getters for dynamic parameter calculations
- Use with function format for data transformation before display

### Imperative

- Use for data operations triggered by user actions (clicks, inputs)
- Preferred for create/update/delete operations
- Use for operations that need more complex error handling
- Good for conditional data fetching with business logic

### UI Record API

- Use for standard object CRUD without writing Apex
- Perfect for form-based record creation and editing
- Leverages Lightning Data Service for offline support and caching
- Uses built-in toast notifications for success/error messages

### Lightning Message Service

- Use for communication between LWC, Aura, and Visualforce
- Great for decoupled component architecture
- Supports publish-subscribe communication pattern
- No server-side calls required for component communication
