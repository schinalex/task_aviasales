'use strict'

const e = React.createElement

const Logo = () => (
  <div id="logo"></div>
)

const changeFilters = (setFilters, filter) => setFilters(filters => filters.includes(filter)
  ? filters.filter(element => element !== filter)
  : filters.concat(filter)
)

const Filter = (props) => (
  <div id="filter">
    <div>КОЛИЧИСТВО ПЕРЕСАДОК</div>
    <div>
      <input type="checkbox" name="Все" checked={!props.filters.length} onChange={() => props.setFilters([])}/>
      <label>Все</label>
    </div>
    {
      ['Без пересадок', '1 Пересадка', '2 Пересадки', '3 Пересадки'].map((option, i) =>
        <div key={i}>
          <input type="checkbox" name={option} checked={props.filters.includes(i)} onChange={() => changeFilters(props.setFilters, i)} />
          <label>{option}</label>
        </div>
      )
    }
  </div>
)

const Tabs = (props) => (
  <div className="tabs">
    <button type="button" className={`tab left ${props.sortBy === 'price' ? 'active' : ''}`} onClick={() => props.setSort('price')}>
      САМЫЙ ДУШЕВЫЙ
    </button>
    <button type="button" className={`tab right ${props.sortBy === 'duration' ? 'active' : ''}`} onClick={() => props.setSort('duration')}>
      САМЫЙ БЫСТРЫЙ
    </button>
  </div>
)

const List = (props) => (
  <ul className="list">
    {props.tickets.filter((ticket, i) => i < 10).map((ticket, i) => <ListItem ticket={ticket} key={i}/>)}
  </ul>
)

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

const sortByPrice = tickets => tickets.slice().sort((a, b) => a.price - b.price)
const sortByDuration = tickets => tickets.slice().sort((ticket1, ticket2) => {
  const time1 = ticket1.segments.reduce((totalTime, segment) => totalTime + segment.duration, 0)
  const time2 = ticket2.segments.reduce((totalTime, segment) => totalTime + segment.duration, 0)
  return time1 - time2
})
const sort = (type, tickets) => ({ price: sortByPrice, duration: sortByDuration })[type](tickets)

const filter = (ns, tickets) => !ns.length ? tickets : tickets.filter(ticket =>
  ticket.segments.every(segment => ns.includes(segment.stops.length))
)

const App = () => {
  const [allTickets, setTickets] = React.useState([])
  React.useEffect(() => { getTickets().then(setTickets) }, [])
  const [filters, setFilters] = React.useState([])
  const [sortBy, setSort] = React.useState('price')
  const tickets = sort(sortBy, filter(filters, allTickets || []))
  return (
    <div className="content">
      <Logo/>
      <div className="container">
        <Filter filters={filters} setFilters={setFilters}/>
        <div className="list-space">
          <Tabs sortBy={sortBy} setSort= {setSort}/>
          {
            tickets.length
              ? <List tickets={tickets}/>
              : <div style={{margin: '10px'}}>Loading...</div>
          }
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(e(App), document.querySelector('#app'))

console.log('It kinda works')
