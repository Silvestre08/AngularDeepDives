# Template driven forms

Using template driven forms is a great approach to gather user inputs. Let's see an example:
![](doc/userInputForm.png)

On a form like this one there is a lot to keep track. For each field we might want to track:

1. User input
2. Validity (if the field is not valid we want to show an adorner error messsage)
3. If the field is dirty (has a changed value)
4. If it is touched (we do not want to display errors for example the first time a screen loads and all fiedls are empty).

It is a lot to keep track, when we have lots of fields.. And we are not even taking into account the form as a whole: the validity of the form as whole, if it is dirty, etc..

This is where Angular forms come in. Angular tracks all this data for us with 2 main objects, whenever we add certain directives on our forms or input elements:

1. FormControl: A form control is created automatically when we add the ngModel Directive into a field. A form control tracks if a single control is invalid, dirty, touched plus all the inverse properties.

2. FromGroup: A form group is made up of several form controls and it tracks all of these same properties. It can be used to wrap an entire form for form-level validation or a section of a form

Both template driven forms and reactive forms use this type of architecture but in reactive forms it is on us to create this type of objects and infrastructure.

The architecture summarize: form controls can be grouped in form groups and form groups can be grouped into what is called form model:
![](doc/formModel.png)

## Template driven vs reactive forms

Both forms use the same type of underlying architecture:
![](doc/formSimilarities.png)
In template driven forms these objects are created for us. In reactive form, we are the one creating them and working with them in our component's classes.
So what is the difference in practice?

![](doc/templateVsReactive.png)

1. Template driven forms are mostly managed inside the HTML template where as reactive forms are largely defined inside components typescript class. We can create local template variable using # and access its attribute for validation right inside the template.
2. Template driven forms use a separate data model we define where as in reactive forms the data model is managed internally by form controls
3. Template driven forms use two way bindings (mutable) and reactive form use one way binding from the component to the template. User input changes are handled with events.
4. Given the event nature, template driven froms use synch data flow and reactive forms async data flow.
5. In template, validation is handled with directives where as in reactive with functions.

Reactive forms may be better form complex forms with lots of backend logic whereas template driven forms are more
lightweight and quicker to implement.

Before diving in, we are using an Angular in memory web api. So we simulate actually http calls to the server but in memory.
When we click in a contact we navigate to the edit form. check the Url we pass the id as the argument.

## Add template driven forms into a projec

1. Import the forms module. Because we are not using modules we do it inside our component directly (edit contact):

```
import {FormsModule} from '@angular/forms'

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
```

2. Define the base HTML template of our form.
3. Define the data model. We need the data model to collect user input and use data binding. In our case we have the complex type contact.model and we define that as a property in the component class file:

```
  contact: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    },
  }
```

4. Wire the the template to the newly created property using the ngModel directive. We use the ngModel directive on the fields we want to keep in sync with our model. Because we need a 2 way binding we do it like this:

```
        <input placeholder="First Name" [(ngModel)] = "contact.firstName" name="firstName" />
```

The ng model uses a name attribute behind the scenes, so that is why we have the name. For nested properties:

```
[(ngModel)] = "contact.phone.phoneNumber" name="phoneNumber"
```

When we use ngModel behind the scenes we have a control value accessor. Behind the scenes there is more than just a 2way data binding. Angular attaches a directive to the element called control value accessor. There are plenty of control value accessors like the CheckboxValueAccessor, DefaultValueAccessor.
The default one, for example, tranforms a null into an empty string before displaying it in the browser. The checkbox one converts the the checked state into a bool.
We can create our own too.

## Submit the form

According to HTML standards we should use a submit button with a submit action on our actual from element. This allows the user to click enter.
This behavior is accomplished by using the angular directive ngSubmit at the form level:

  <form (ngSubmit)="saveContact()">

And the button submit:
<button class="primary" type="submit" >Save</button>
