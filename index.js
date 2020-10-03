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

const searchUrl = 'https://front-test.beta.aviasales.ru/tickets?searchId=3a40w'

const get = url => new Promise((resolve, reject) => {
  const http = new XMLHttpRequest()
  http.open('GET', url)
  http.send()
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        resolve(http.response)
      } else {
        reject(http.response, http.status)
      }
    }
  }
})

get(searchUrl).then((response) => {
  console.log(JSON.parse(response))
})

ReactDOM.render(e(App), document.querySelector('#app'))

console.log('It kinda works')
