# Reactive forms

Reactive forms are for complex forms than template driven forms. They are better as well if our preference is to have more code driven forms instead of html driven forms.
We are going to use the same template as we did for the course of template driven forms: edit user contacts.
On a form, we usually want to track lots of flags per field:

![](doc/formfields.png)
It is a lot of flags and fields. We also need to take into account the validity of groups or the form as a whole.
Angular uses form controls and forms groups to track all of this information. Form controls track that for individual fields, form groups to groups of input fields.
Form controls and form groups constitute the form model. This is the bulk of form architecture, if we use either template or reactive forms.

## Template driven vs reactive forms

Both forms use the same type of underlying architecture:
![](doc/formSimilarities.png)

In template driven forms, these objects are created for us. In reactive forms, we are the ones creating them and working with them in our component's classes.

So what is the difference in practice?

![](doc/templateVsReactive.png)

1. Template driven forms are mostly managed inside the HTML template where as reactive forms are largely defined inside components typescript class. We can create local template variable using # and access its attribute for validation right inside the template.
2. Template driven forms use a separate data model we define where as in reactive forms the data model is managed internally by form controls
3. Template driven forms use two way bindings (mutable) and reactive form use one way binding from the component to the template. User input changes are handled with events.
4. Given the event nature, template driven froms use synch data flow and reactive forms async data flow.
5. In template, validation is handled with directives where as in reactive with functions.

Reactive forms may be better form complex forms with lots of backend logic, whereas template driven forms are more lightweight and quicker to implement.

Before diving in, we are using an Angular in memory web api. So we simulate actually http calls to the server but in memory.
When we click in a contact we navigate to the edit form. Check the Url we pass the id as the argument.

## Adding reactive forms to a project

The first step is to add the reactive forms module to an angular project.
We just need to import it in the module we want to use it or, if we use standalone components, in the component directly. In this course we just imported it in the app module:

```
import { ReactiveFormsModule } from '@angular/forms';
...
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 200 })
  ],

```

Of course, we should only import in the modules we actually need it.
Having plain html on our template file, we we will start by creating form controls for some input elements we already have. Starting with first name:

```
firstName = new FormControl();
```

This form control will be used to collect the first name value and perform validation, etc..
We wire up with the input element using a form control binding:

```
        <input [formControl] = "firstName" placeholder="First Name" />

```

The formControl binding will make angular track field value, if it is dirty or touched, valid , etc
This creates a one way binding between the component and the input element.
Then it uses the input event to update the formscontrol value when the input value changes. How does angular do that?
What is the piece in the middle that makes that happen?
![](doc/controlvalueaccessor.png)
The magic is done by a directive called ControlValueAccessor. When we use formControl binding Angular attaches a control value accessor directive to the input element.
A control value accessor has 2 key methods: writeValue (when the value on our component class changes, angular updates the input element) and onChange (when the input element changes value, we update the component class).
We can inialize form controls with default values like this:

```
firstName = new FormControl('Jimoo');
```

When we want to fetch data from an api we can use the forms control set value method like this:

```
 ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(
      (contact) => {
        if(!contact) return;
        this.firstName.setValue(contact.firstName)
      }
    )
  }
```

## Form groups

Form groups make form validation easier. It also make feeding the form with data easy too. Form groups can group form controls and can be created like this:

```
  contactForm = new FormGroup({
    firstName: new FormControl,
    lastName: new FormControl,
    dateOfBirth: new FormControl,
    favoritesRank: new FormControl,

  });
```

Now the way we access the form controls changes to this:

```
        this.contactForm.controls.firstName.setValue(contact.firstName)
```

The binding in the template changes as well. We can bind the form to our form group. When we do that each input element inside the form only needs the form control name attributte. The form control name attribute needs to match the name of the property of the form control object inside the group:

```
 <form [formGroup]="contactForm">
    <section>
      <nav>Name/Info</nav>
      <div>
        <input formControlName = "firstName" placeholder="First Name" />
```

## Submitting the form

The way we are saving so far is not correct. The proper html standard is to submit the form. Submitting the form correctly is also more accessbile to the user by allowing it to use the enter key.
For submitting the form, we use the ngSumit direct at the form level:

```
  <form [formGroup]="contactForm" ngSubmit="saveContact()">

```

The save button needs to be changed to type submit. We also do not need to bind to the save method anymore:

```
      <button class="primary" type="submit">Save</button>

```

Having a form group we can easly access all form controls with value property:

```
  saveContact() {
    console.log(this.contactForm.value);

  }
```

The value property of the form group is an javascript object with properties equivalent to the form controls defined on it:
![](doc/ngformgroup.PNG)
