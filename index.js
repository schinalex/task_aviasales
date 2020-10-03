'use strict'

const e = React.createElement

const ListElement = () => (
  <li>
    Ticket!
  </li>
)

const list = document.querySelector('.list')
ReactDOM.render(e(ListElement), list)

console.log('It kinda works')
