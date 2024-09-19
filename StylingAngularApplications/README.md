# So, What is This?

This repository contains all code examples for the demos from my [Pluralsight](https://www.Pluralsight.com "Pluralsight") course: Styling Angular Applications. Use these files to follow along with the course or for whatever you want really.

# Styling Angular Applications

Angular revolutionizes the way that we architect CSS for modern web applications. But before we can become Angular styling ninjas we need to take a step back consider the many different ways that things can be done. In this course we explore how the framework aligns with web components and what that means for adding styles to components and apps in general. Throughout this course we develop systems geared towards organization, scale, and maintainability for HTML and CSS within Angular apps. And as we get more comfortable adding and styling components within these systems we consider component themes and the ways that we can transform their look under certain circumstances. By the end of this course we'll have a strong knowledge of how Angular processes CSS and the many different ways it can be leveraged as part of an overall design system for creating beautiful, organized, maintainable, and future proof web applications.

##### Introduction

There are many considerations when it comes to CSS and styling applications in Angular and in this module we explore, at a high level, many of the concepts we will cover in this course.

##### How Styles Work in Angular

In this module we dive into how styles work in Angular. We cover how the different view encapsulation modes work, what they mean as far as the rendered code and style scoping, and why you may want to use each of them. We explore some of the different ways that we can add styles to components, how Angular handles them, and how their priority flows through. And lastly, we dig into how Angular emulates Shadow DOM, CSS Scoping Module selectors, what they look like when rendered in the browser, and how/why we would want to use them.

##### Scalable, Maintainable CSS/SCSS Architecture in Angular

In this module we leverage the default Emulated view encapsulation mode for angular components along with the SASS preprocessor to cover concepts regarding global styles, variables, and mixins. We explore aspects regarding CSS selectors and class naming conventions both at a global app level as well as at a local component level. We develop a system for applying CSS relative units across components with reliability. And we utilize SASS variables and mixins to create relationships between styles within individual components and across multiple components making them easier to edit and maintain over time.

##### Creating Component Themes

In this module we focus on what a component theme is and on creating components that will vary their look under certain criteria. First we will look at explicitly setting component themes per instance by adding classes and properties to our components and exploring what this SCSS/CSS looks like. We then look at providing context aware themes to our components that automatically change styles based on the surroundings of the component using the :host-context selector. We use methods to determine if theme classes have been provided or if projected content exists to conditionally alter the look of components. And finally we explore the future of component theming with CSS Custom Properties.

##### It's Wrap

In this module we recap, at a high level, the core concepts and takeaways from the course and get ourselves set up to build amazing Angular applications that look great today and are easy to bring forward into the web of tomorrow.

## How to Use It

In order to work with this project here's what you'll need to do...

### Install and Set Up

1. Build the code, watch for file changes, and serve up the site locally<br />`npm start`.
2. Ng serve wont work because ssl error of old versions of nodejs.

## Styling Angular Applications

Most of the web these days is dveloped using web components. Angular provided much more than web components provide out of the box.
When using Angular we re practically building web components.
Web components are bundles of modular HTML, CSS and Javascript that represent portions of the ui in the browser. They provide a way to isolate and reuse sections of an application. This web components can be reused within the same application or across several applications.
Web components are composed of:

1. Custom elements: they allow use to use and create our own custom elements. So we create a component and just use it in HTML, by declaring the custom element where we need it.
2. HTML templates: fragments of markup that are not actually rendered to the page. Their purpose is to be reference and cloned into a specific location. The structure of the markup that it will be bundled into our component.
3. Shadow DOM: essential. It is the encapsulated DOM that we have access within our component to styling and scripting against. A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — which is rendered separately from the main document DOM — and controlling associated functionality. In this way, we can keep an element's features private, so they can be scripted and styled without the fear of collision with other parts of the document.
   Let's see as an example:

```
<div>
  <input type="range">
</div>
```

What actually gets rendered it is way more that:

```
div
- input[range]
  - bar
  - thumb
```

So the browser render way more elements than the one we put first. We cannot use javascript to access the inner elements of the input components. If the inner component have events, the raiser would be always the parent. So the latter is shadow DOM.
Back to web components, when we develop web components, out HTML, CSS and javascript inside that element will be the elements shadow DOM.

Angular components are setup to function like native web components.

View encasulation in Angular is how we control/ emulate, use shdow dom or not, or dont use any style scoping behavior at all.
We have 3 different modes, being the emulated mode the default:

1. Emulated: the default angular mode. Out of the box, Angular will add scoping attributes that we can see on the component nodes. The component gets the ngHost and the elements get the ngContent attribute (content nodes withing the component).
   ![](doc/nGContentAttribute.png)
   So how does angular keeps CSS only at the component scope? Angular inserts the styles of all of our componets at the head and tags them with the same gnContent attributes. That is how, for example, div elements can have global style, generic for div elements of the entire app, or they can have specific style within a component that not get ovveriden by the main one.
   See how the styles in the header get tagged with the ngContent:
   ![](doc/ngContentHeader.png)
2. None: we stop seeing the ngContent and host attributes. So all styles go to the header but individual component styles get overrided by the default ones. Why use this? Some use cases require that. As an example, we can set the view encapsulation to none at the app component level. The app component is a good place to put styles that will be applied globably. The styles of the app component are also the first ones to appear in the header.
3. Shadow DOM: this will use the shadow dom native capability of th browsers that actually support it. There will be no emulation. An actual shadow root will be created which will isolate the markup and css outside of the scope of the parent document. See the shadow dom in chrome:
   ![](doc/shadowroot.png)
   This would break the app in older browsers.
   Changing the view encapsulation mode can only be done per component basis, inside the component decorator.
   It is probably just better to stick with the default emulated mode.

## Component Styles

There are several ways to add styles to the component. using styles property, inserting them directly on a template, using a separate style sheet with a tradional link tag or use the styleURL of the component, inline directly on the elements (not a good idea) etc.
Angular these days just uses separate style sheets for the component with styleURL at the component level by default.

## CSS Scoping

Angular emulates the behavior using a handfull css selectors from the css scoping module. These selectors allow us to target what we consider the host element of our components using :host pseudo class. It also allows use to detect a particular context of an element using :host_context pseudo class.
We can even go through the shadow elements to style child component using the ng-deep.

### Host pseudo class

In the view encapsulation mode, every component has what is considered a host element whose shadow tree contains all of the nodes from the component view. With the css scoping mmodule we can style this host using the host pseudo class. Modern browsers support that out of the box. But the view emulated mode of Angular gives us extra support for old browsers.
So what is the benefit? Sometime we might need to check if something like a class exists before applying styles to it, so we would add that class in our component declaration in html

```
<ourcomponent class="ourClass"></ourcomponent>

// in the css file
:host(.ourClass)
```

So we only target the host, when the host has a class on it.

### host-context pseudo class

To be used when we need to style our component based on the context it is applied, for example, dependent on the container our custom component is being used:
![](doc/hostContext.png)
This css selector will scan the document tree where this component is inserted up to the root to see if any parent element matches the selection attribute. It will scan all parent elements including the host itself. So our styles will be applied if the host or any parent element match.
This can cause problems while reusing components where want different styles applied to them. Lets see the example of a component being reused inside of itself:

```
:host-context(.color-01){
  background: Red
  }

:host-context(.color-02){
  background: Yellow
  }

// template file
<ourcomponent class="color-01">
<ourcomponent class="color-02"></ourcomponent>
</ourcomponent>
```

With host-context the style applied would be the color 01 style. Because we are using host context both styles are applied but the last one wins. Changing to :host would fix the problem on this case.
So host-context should be used carefully.
It is also not so well supported by all browsers so it is recommended to use view emulative encaspulation of Angular.

### ng:deep

But what if we want to look down the tree? We can do this with the deep combinator to style nested components. We have the concept of content projection:

![](doc/componentSlots.png)

We can create _slots_ inside our components template, that we can use to display different content every time we use this component. It makes our component behave like other html elements. We basically inject content between the html tags of our element like:

```
<ourelement>
<customcontent></customcontent>
</ourelement>
```

We do that with the tag ng-content inside our custom element's template, the place where we want to display custom content. Then in the place we use our component we would just insert custom content like we see above.
The thing about this custom content is that the styles applied to the custom content will have the scope of the parent component, where ourelement is going to be used. Sometimes that is the dired behavior: think of dialogs. We want to display dynamic content and the style be determined on an individual case basis.
But sometimes, we may have a predictable structure and may not want to style on an individual basis.
This is where the deep combinator comes into play.
![](doc/ngDeep.png)
The problem is that Angular emulates the deep behavior by unscoping the anchor selectors so the styles will be applied to the entire document!!! Very careful.
It is a good idea to use host pseudo class before deep, so Angular will scope the styles (it is event recommended to scope to the parent element):
![](doc/deepTargeted.png)

Deep was deprecated in Angular.

So now with this style info, let's see how to create maintainable style architecture styles in Angular.

## CSS and SCSS maintainable architecture

Before Angular, most of the styles would be declared in a global scope of an APP and then be used on an element basis. Angular changes the game an it is recommended that most of the styles reside outside of the global scope, keeping them specific to where they are used, because as the app grows, maintaining styles can become a nightmare.
There are though things that should still reside in the global space:

1. Browser resets
2. colors
3. Typography
4. Layout
5. Media queries
6. Utilities

If we want, Angular also allows us working the old way.

## Global Styles

There are several ways of managing global styles and we will covert two:

1. Class based system
2. Global Sass variable and mixin approach.

### Class based system

It is the one more similar to the traditional approach, with the difference that we have global, widely applied styles and then individual component styles.
First, we need somewhere to put the global styles.
Because we are using Sass, we can break our style sheets up into very small modular Sass partials that can be logically grouped and organized.
One way of implementing it is to use a directory like a _scsss_ in the app root and include there the styles, with Sass partials:
![](doc/stylesGlobak.png)

It can have a name more proper to the project. It just needs to be clear that we are talking about global styles.
It is importan to establish a naming convention for the styles across the app, to protect against style conflict and collusions. We do not want names of classes in the global styles conflicting with classes present in individual styles of the components.
For example layout styles could be prefixed with _l-_: l-content, for example.
So how do we include them in our components?
On way to do it is to add them in the root styles.scss:
![](doc/importsAtStyles.png)

Another way to do is to turn view encapsulation off in the _app_ component and include them there using styles url property.
![](doc/stylesInAppComponent.png)
The main consideration here is if we need scoped styles for the app component itself. If yes, we cannot use this way. Plus, styles in our app component won't be available until our app is fully loaded. This can be a problem if we are relying on these styles for an app loading view, unlike in the first case.
Then we just need to add the global scoped classes to our elements.
Long ugly selectors everywhere like when we combine multiple classes within a same element: we can even have combinations of globaly scoped styles and individual component styles.

### Sass mixins and variables

Mixins allow us to define styles that can be reused throughout a style sheet:
![](doc/mixin.png)
So we can convert this global items in variables and mixins and then import them and use them only when needed.
Lets see an example:
![](doc/gridLayoutGlobal.png)
This is in a proper style file, SASS partial, but then we can just reuse, for example, in an individual component style sheet:
![](doc/includeMixin.png)

As a rule of thumb is better to not ovveride styles and start each individual component on a clean slate because things can get complicated as the app grows. Or almost clean. it can be a good idea to use a browser reset as a starting point for a component style
Browser reset are simply a collection of styles that are intended to normalize the inconsitencies across browsers before adding any custom app css.
This gives us the freedom to compose things as needed: we can include or not the mixins. It allows us to opt in and opt out, with minimal chage to the template.
We just remove the mixin from our selector and that is it.
Mixin completely seperates the structure from the representation, it is a more flexible approach to the global styles.
Once our SASS is processed into raw css, the code is going to be duplicated, which is ok.
