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

const List = (props) => (
  <div className="list">{JSON.stringify(props.tickets.map(ticket => ticket.price))}</div>
)

const ListElement = (props) => (
  <li>
    Ticket!
  </li>
)

const App = () => {
  const [allTickets, setTickets] = React.useState([1, 2, 3])
  React.useEffect(() => getTickets().then(setTickets), [])
  let tickets = allTickets
  tickets = tickets.filter(ticket => ticket.price > 50000)
  return (
    <div className="content">
      <Logo></Logo>
      <div className="container">
        <Filter></Filter>
        <div className="list-space">
          <Tabs></Tabs>
          <List tickets={tickets}></List>
        </div>
      </div>
    </div>
  )
}

const get = url => new Promise((resolve, reject) => {
  const http = new XMLHttpRequest()
  http.open('GET', url)
  http.send()
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        resolve(http.response)
      } else {
        reject(http)
      }
    }
  }
})

const getTickets = () => {
  const searchUrl = 'https://front-test.beta.aviasales.ru/tickets'
  const keyUrl = 'https://front-test.beta.aviasales.ru/search'
  return get(keyUrl)
    .then(JSON.parse)
    .then(response => response.searchId)
    .then(searchId => `${searchUrl}?searchId=${searchId}`)
    .then(get)
    .then(JSON.parse)
    .then(response => response.tickets)
    .catch((request) => console.error(`Status: ${request.status}\n${request.response}`))
}

ReactDOM.render(e(App), document.querySelector('#app'))

console.log('It kinda works')
