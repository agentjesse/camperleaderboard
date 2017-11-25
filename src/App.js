import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    //hold data from second fetch to be used later
    this.topAllTimeEarners = [];
    this.topRecent = [];
    //set initial state
    this.state = {
      data:[],
      columns:[
        { Header: 'Name',
          accessor: 'name', // String-based value accessors!
          sortable: false
        },
        { Header: 'Recent Points',
          accessor: 'ptsInPast30', // String-based value accessors!
          sortable: false
        },
        { Header: 'All Time Points',
          accessor: 'allTimePts', // String-based value accessors!
          sortable: false
        }
      ]
    };
  }

  componentWillMount(){
    // console.log('compwillmount');
    // console.log(this);
    let accessThis = this;
    
    //fetch top earners in RECENT 30 DAYS
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then( function(response){
          if (response.ok){ return response.json() }
          throw new Error('Request failed!');
        },function(networkError){ console.log(networkError.message) } 
      )
      .then( function(jsonResponse){
        const topHundredRecent = jsonResponse.map(element => {
            return {
                      name: element.username,
                      ptsInPast30: element.recent,
                      allTimePts: element.alltime
                   }
          }
        );
        accessThis.topRecent = topHundredRecent;
        accessThis.updateMe(topHundredRecent);
      });

    //fetch top earners of all time
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then( function(response){
          if (response.ok){ return response.json() }
          throw new Error('Request failed!');
        },function(networkError){ console.log(networkError.message) } 
      )
      .then( function(jsonResponse){
        const topHundredAllTime = jsonResponse.map(element => {
            return {
                      name: element.username,
                      ptsInPast30: element.recent,
                      allTimePts: element.alltime
                   }
          }
        );
        accessThis.topAllTimeEarners = topHundredAllTime;
      });

  }
  
  updateMe(arr){
    this.setState({ data: arr });
    //----dummy data
    // this.setState({ data: [
    //   { name: 'boor shahh',non:14 },
    //   { name: 'bffdf ahh',non:44 }
    // ] });
  }

  render() {
    return (
      <div className="App">

        <header>Free Code Camp Leaderboard</header>

        <button 
                className='chooseData'
                onClick={ ()=> this.updateMe(this.topRecent) }
        >click for top campers of: <br/>past 30 days</button>

        <button 
                className='chooseData'
                onClick={ ()=> this.updateMe(this.topAllTimeEarners) }
        >click for top campers of: <br/>all time</button>

        <ReactTable className='-highlight'
                    data={this.state.data} 
                    columns={this.state.columns}
                    showPagination={true}
                    defaultPageSize={20}
                    resizable={false}
        />
      </div>
    );
  }

}

export default App;
