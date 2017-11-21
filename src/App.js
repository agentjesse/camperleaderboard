import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class App extends Component {
  constructor(props) {
    super(props);
    //set the state
    this.state = {
      data:[
        {
          name: 'Tanner Leah',
          age: 26,
          friend: { name: 'Jason Maurer',age: 23 }
        },
        {
          name: 'shader Liey',
          age: 16,
          friend: { name: 'sony tai', age: 3 }
        }
      ],
      columns:[
        {
          Header: 'Name',
          accessor: 'name' // String-based value accessors!
          // sortable: false
        },
        {
          Header: 'Age',
          accessor: 'age'
        }
      ]
    };
  }

  componentDidMount(){
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then( function(response){
        if (response.ok){ return response.json() }
        throw new Error('Request failed!');
      },function(networkError){ console.log(networkError.message) } 
    )
    .then( function(jsonResponse){
      jsonResponse.forEach(element => {


        // console.log(element.username);
      });
    });
  }

  render() {
    return (
      <div className="App">
        <ReactTable className='newColor -highlight'
                    data={this.state.data} 
                    columns={this.state.columns}
                    showPagination={false}
                    defaultPageSize={10}
                    resizable={false}
        />
      </div>
    );
  }
}

export default App;
