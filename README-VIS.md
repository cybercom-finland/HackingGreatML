# Summary
We'll go through some basic principles about making web UI's with Google Polymer components. How data binding works and how we can make charts updating in real time from server data. We'll also check Jade and Less usage.

# Instructions
Run first `bower install` which will load some Google components that can be used. Check the charts code from `public` and `components` folders. Start node server `npm start` and navigate to `http://localhost:8080/charts` which holds the boilerplate code for our session.

# About Google Polymer
[https://www.polymer-project.org/1.0/docs/start/what-is-polymer.html](https://www.polymer-project.org/1.0/docs/start/what-is-polymer.html)
- Polymer is a library for creating reusable web components
- It expands HTML DOM with new elements
- Effectively not a framework but sugar and syntax on top of web components
- Heavily thinks of the DOM as the framework and aims to leverage as much as possible from the DOM
- Each component has it's own local DOM so CSS styles won't be overlapping anymore
- Features like: templating, two-way data binding, property observation
- Sites / applications are commonly built starting from the smallest components and building towards bigger and more complex components
- Complex components are mainly a declarative collection of smaller components
- Write underlying base components once and reuse! Do not write the same thing twice
