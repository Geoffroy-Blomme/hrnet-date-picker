# oc-gb-date-picker

A library generating an input that has a Date Picker pop-up on focus.

## Installation

Install the package with npm :  
`npm install oc-gb-date-picker`

## Documentation

You can find the documentation here :

> /docs/index.html

How to generate the documentation :

> npm run generate-docs

## Usage

Start by importing the component in your React component :  
`import { DatePicker } from "oc-gb-date-picker";`

Then use it :  
`<DatePicker id="exemple-id"></DatePicker>`

## Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Required</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>yes</td>
      <td>none</td>
      <td>Will be the id of the generated input. </br> 
       Should be used to get its value.</td>
    </tr>
    <tr>
      <td>yearsBackward</td>
      <td>no</td>
      <td>60</td>
      <td>How many years back the DatePicker will go.</td>
    </tr>
    <tr>
      <td>yearsForward</td>
      <td>no</td>
      <td>60</td>
      <td>How many years in the future the DatePicker will go.</td>
    </tr>
</tbody>
</table>
