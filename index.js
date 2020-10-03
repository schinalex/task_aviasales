'use strict'

const e = React.createElement

const Logo = () => (
  <div id="logo"></div>
)

const Filter = () => (
  <div id="filter">Filter</div>
)

const Tabs = () => (
  <div class="tabs"></div>
)

const List = () => (
  <div class="list"></div>
)

const ListElement = () => (
  <li>
    Ticket!
  </li>
)

const list = document.querySelector('.list')
ReactDOM.render(e(ListElement), list)

console.log('It kinda works')
