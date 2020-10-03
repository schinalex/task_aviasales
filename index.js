'use strict'

const e = React.createElement

const Logo = () => (
  <div id="logo"></div>
)

const Filter = () => (
  <div id="filter">Filter</div>
)

const Tabs = () => (
  <div className="tabs"></div>
)

const List = () => (
  <div className="list"></div>
)

const ListElement = () => (
  <li>
    Ticket!
  </li>
)

const App = () => (
  <div className="content">
    <Logo></Logo>
    <div className="container">
      <Filter></Filter>
      <div className="list-space">
        <Tabs></Tabs>
        <List></List>
      </div>
    </div>
  </div>
)

ReactDOM.render(e(App), document.querySelector('#app'))

console.log('It kinda works')
