import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
  {
    'id': 1,
    'image': 'http://placeimg.com/64/64/1',
    'name': '홍길동',
    'birthday': '951003',
    'gender': '남자',
    'job': '소방관'
  },
  {
    'id': 2,
    'image': 'http://placeimg.com/64/64/2',
    'name': '고길동',
    'birthday': '960528',
    'gender': '남자',
    'job': '관리자'
  },
  {
    'id': 3,
    'image': 'http://placeimg.com/64/64/3',
    'name': '그레이트',
    'birthday': '909090',
    'gender': '남자',
    'job': '장로'
  },
]

class App extends Component {
  render(){
    return (
      <div>
        {customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })}
      </div>
    )
  }
}

export default App;
