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

View encasulation in Angular is how we control/ emulate, use shdow dom or dont use any style scoping behavior at all.
We have 3 different modes:

1. None
2. Emulated: the default. Out of the box Angular will add scoping attributes that we can see on the component nodes. The component gets the ngHost and the elements get the ngContent (content nodes withing the component). So how does angular keeps CSS only at the component scope. Angular inserts the styles of all of our componets and the head and tags them with the gncontent attributes. That is how div elements for example can have global style or specific style within a component that not get ovveriden by the main one.
3. Shadow DOM
