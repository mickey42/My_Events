import React, {Component} from "reactn";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from "axios";
import flechee from './flechee.png';
import './Home.css';
import anime from "animejs";

export default class Home extends Component {

  constructor(){
    super();
    this.state = {
      events: [],
      categories: [],
      category : "",
      category_id: "",
      location: "",
      current_page: 1,
      events_per_page: 8,
      scroll: false
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.scrollBackTop);
}


  scrollBackTop = () => {
    if (window.pageYOffset > 0){
      this.setState({scroll: true});
    } else {
      this.setState({scroll: false});
    }
  }

  componentWillMount(){
    this.getCity();
    this.getCategories();
  }
  
  scrollTop = () => {
    document.documentElement.scrollTop = 0;
  }
  pageClick = (event) => {
    this.setState({
      current_page: Number(event.target.id)
    })  
  }
  getCategories = () => {
    var cats = []
    axios.get(this.global.api + "categories/?token="+this.global.app_key)
    .then((response) => {
      response["data"]["categories"].forEach(function(v, k){
        cats.push([v["id"], v["name"]])
      })
      this.setState({categories: cats})
    })
    .catch((error) => {
      console.log(error);
    })
  }
  handleChange = (event) => {
      if (event.target.id === "category"){
        this.setState({
          category_id: event.target[event.target.selectedIndex].id
        })
      }
      this.setState({
        [event.target.id]: event.target.value
      })
  }
  handleSubmit = (event) => {
    var events_list = [];
    event.preventDefault();
    axios.get(this.global.api + "events/search/?location.address="+this.state.location+"&categories="+this.state.category_id+"&token="+this.global.app_key)
    .then((response) => {
      response["data"]["events"].forEach(function(v,k){
        if(v["logo"]!==null){
          events_list.push([v["name"]["text"],v["description"]["text"] ,v["logo"]["url"], v["id"]]);
        }
      })
      this.setState({events: events_list});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getCity(){
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition = (position) => {
    var coords = [position.coords.latitude, position.coords.longitude];
    this.getEvents(coords);
  }

  getEvents = (coords) => {
    var events_list = []
    axios.get(this.global.api + "/events/search/?location.latitude="+coords[0]+"&location.longitude="+ coords[1]+"&token="+this.global.app_key)
    .then((response) => {
      response["data"]["events"].forEach(function(v,k){
        if(v["logo"]!==null){
            events_list.push([v["name"]["text"],v["description"]["text"] ,v["logo"]["url"], v["id"]]);
        }
      })
      this.setState({events: events_list});
    })
    .catch((error) => {
      console.log(error);
      
    })
        anime({
          targets: '.line-drawing-demo .lines path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1800,
          delay: function(el, i) { return i * 350 },
          direction: 'alternate',
          loop: true
          }); 
  }

  render() {
    const {current_page, events_per_page} = this.state;
    const indexOfLastEvent = current_page * events_per_page;
    const indexOfFirstEvent = indexOfLastEvent - events_per_page;
    const currentEvents = this.state.events.slice(indexOfFirstEvent, indexOfLastEvent);

    var cats = this.state.categories.map(function(cats, key){
      return <option id={cats[0]} key = {key}>{cats[1]}</option>
    })
    if (this.state.events.length > 0){
     var events = currentEvents.map(function(event, key){
        return <Card key={key} border="light">
          <Card.Body>
             <Card.Img variant="top" src={event[2]} />
             <Card.Title><Link to={`event/${event[3]}`}>{event[0]}</Link></Card.Title>
             <Card.Text>{event[1]}</Card.Text>
          </Card.Body>
        </Card>
      })
    }
    var numberOfPages = Math.ceil(this.state.events.length/events_per_page)-1;
    return (
      <div className="container">
        <div className="menu">
          <h4>Filtres</h4>
          <Form className="event_search" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Categories</Form.Label>
              <Form.Control as="select" id ="category" value={this.state.category} onChange={this.handleChange}>
                {cats}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" id ="location" value={this.state.location} onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="light" type="submit">Search</Button>
          </Form>
          { current_page -1 >= 1 &&
          <p className="pag prev round" id={current_page - 1} onClick={this.pageClick}>&#8249; </p>
        }
        { current_page +1 <= numberOfPages &&
        <p className="pag next round" id={current_page +1} onClick={this.pageClick}>&#8250;</p>
        }
        { this.state.scroll &&
          <button className = "fleche" onClick={this.scrollTop}><img src={flechee}></img></button>  
        }
        </div>
        <div className="body">
          <section className = "my_event">
        <div className="demo-content align-center line-drawing-demo">
                            <svg viewBox="0 0 500 100" >
                                <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="lines">
                                <path class="cls-1" d="M48.45,52.42H42V8.58L27.28,52.42H21.16L6.47,8.58V52.42H0V.88H10.23l14,43,14-43H48.45Z"/><path class="cls-1" d="M101.88.88,81.63,30.59V52.42H74.81V30.59L54.56.88h8.3l15.4,23.73L93.59.88Z"/><path class="cls-1" d="M142.38,63.74H101.81V60.15h40.57Z"/><path class="cls-1" d="M186.15,52.42H147.73V.88H185V7H154.55V22.75H183v6.12H154.55V46.3h31.61Z"/><path class="cls-1" d="M237.52.88l-20,51.54h-7L190.41.88h7.28L214,45.07,230.24.88Z"/><path class="cls-1" d="M282.2,52.42H243.77V.88H281V7H250.59V22.75H279v6.12H250.59V46.3H282.2Z"/><path class="cls-1" d="M332.26,52.42h-7l-27-40.68V52.42H291.8V.88h7l27,40.68V.88h6.5Z"/><path class="cls-1" d="M380.43,7H363.38V52.42h-6.86V7H339.61V.88h40.82Z"/><path class="cls-1" d="M407.21,53.3q-10.9,0-16.29-4.89a17.06,17.06,0,0,1-5.68-12.55h6.57q.53,5.77,4.8,8.53a18.6,18.6,0,0,0,10.32,2.76,16.25,16.25,0,0,0,9.23-2.36,7.34,7.34,0,0,0,3.5-6.4A6.52,6.52,0,0,0,416,32.2q-3.62-1.93-12.46-3.81t-12.69-5.22A11.19,11.19,0,0,1,387,14.27,12.57,12.57,0,0,1,392,4q5-4,13.31-4,8.72,0,14.06,4t5.66,11.43h-6.64q-1-9.35-12.8-9.35-5.7,0-8.82,2.14a6.6,6.6,0,0,0-3.13,5.7,5.38,5.38,0,0,0,2.51,4.85q2.51,1.62,9.39,3.13a88.56,88.56,0,0,1,10.92,3,17.47,17.47,0,0,1,6.93,4.59,11.8,11.8,0,0,1,2.88,8.35,13.76,13.76,0,0,1-5.29,11Q415.72,53.3,407.21,53.3Z"/>
                            </g>
                            </svg>
                    </div> 
                    </section>
          <h4>Events à venir</h4>
          {events}
        </div>
      </div>
      
    );
  }
  
                
}