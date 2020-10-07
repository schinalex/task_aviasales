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
  <ul className="list">
    {props.tickets.filter((ticket, i) => i < 10).map((ticket, i) => <ListItem ticket={ticket} key={i}/>)}
  </ul>
)

const sortByPrice = tickets => tickets.slice().sort((a, b) => a.price - b.price)
const sortByDuration = tickets => tickets.slice().sort((ticket1, ticket2) => {
  const time1 = ticket1.segments.reduce((totalTime, segment) => totalTime + segment.duration, 0)
  const time2 = ticket2.segments.reduce((totalTime, segment) => totalTime + segment.duration, 0)
  return time1 - time2
})
const sort = (type, tickets) => ({ price: sortByPrice, duration: sortByDuration })[type](tickets)

const stops = ['БЕЗ ПЕРЕСАДОК', '1 ПЕРЕСАДКА', 'ПЕРЕСАДКИ']

const addTime = (date, duration) => {
  const date1 = new Date(date)
  const date2 = new Date(date1.getTime() + duration * 60 * 1000)
  return `${date2.getHours()}:${date2.getMinutes()}`
}

const ListItem = (props) => (
  <div className="list-item">
    <li>
      <div className="row"><span className="price">{props.ticket.price} Р</span> <span>Airlines Logo</span></div>
      {props.ticket.segments.map((segment, i) => (
        <div className="row" key={i}>
          <div className="column">
            <div className="upper-text">
              {segment.origin} - {segment.destination}
            </div>
            <div>
              {segment.date.slice(11, 16)} - {addTime(segment.date, segment.duration)}
            </div>
          </div>
          <div className="column">
            <div className="upper-text">
              В ПУТИ
            </div>
            <div>
              {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
            </div>
          </div>
          <div className="column">
            <div className="upper-text">
              {segment.stops.length > 1 ? `${segment.stops.length} ${stops[2]}`: stops[segment.stops.length]}
            </div>
            <div>
              {segment.stops.join(', ')}
            </div>
          </div>
        </div>
      ))}
    </li>
  </div>
)

const App = () => {
  const [allTickets, setTickets] = React.useState([])
  React.useEffect(() => { getTickets().then(setTickets) }, [])
  const tickets = allTickets || []
  return (
    <div className="content">
      <Logo/>
      <div className="container">
        <Filter/>
        <div className="list-space">
          <Tabs/>
          {tickets.length > 0 ? <List tickets={tickets}/> : 'Loading...'}
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
