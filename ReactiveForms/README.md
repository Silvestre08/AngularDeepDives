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
