import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import PostList from './components/PostList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: 'white',
      color: 'black',
      users: [], 
      posts: [],
      displayUsers: true,
      displayPosts: true,
      validForm: true
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 5);
        data.forEach(user => {
          user.isGoldClient = false;
          user.salary = (Math.floor(Math.random() * (100000 - 1000) ) + 1000);
          user.imageLink = 'https://picsum.photos/200';
        });
        this.setState({users: data});
    });


    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        return response.json();
      }).then((posts) => {
        this.setState({posts: posts})
      })
  }

  changeColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    console.log('log color');
    this.setState({color: event.target.value});
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();

    if(this.validateForm(name, email)) {
      let salary = (Math.floor(Math.random() * (100000 - 1000) ) + 1000);
      let imageLink = 'https://picsum.photos/200'
      this.setState(prevState => {
        return {
          users: [
            ...prevState.users,
            {
              id: this.getMaxId(prevState.users) + 1,
              name,
              email,
              isGoldClient, 
              salary,
              imageLink
            }
          ]
        }
      });
    };
  }

  validateForm(name, email) {
    let valid = false;
    if((name.length > 3) && (/\S+@\S+\.\S+/.test(email))) {
      valid = true;
    } 
    this.setState({validForm: valid});
    return valid;
  }

  deleteUser(id) {
    let copyUsers = this.state.users;
    copyUsers.forEach((user, index, obj) => {
      if(user.id === id){
        obj.splice(index, 1)
      }
    })  
    this.setState({users: copyUsers});
}


  render() {
    return(
      <div className="app" style={{background: this.state.background, color: this.state.color}}>
        <div className="adminPanel">
          <h1>Admin panel - Proiectul 1</h1>
          <div className="adminPanel__button">
            <button className="regularButton" type="button" onClick={() => {this.setState({displayUsers: !this.state.displayUsers})}}>Useri</button>
            <button className="regularButton" type="button" onClick={() => {this.setState({displayPosts: !this.state.displayPosts})}}>Postari</button>
          </div>
        </div>
        <div className="layoutColumn">
          <UserAddForm submitAddForm={(event, name, email, isGoldClient) => this.submitAddForm(event, name, email, isGoldClient)} validateForm={this.state.validForm}/>
          <div className="colorPanel">
            <h2>Schimba culori</h2>
            <div className="colorPanel__control">
              <span>Schimba culoarea backgroundului</span>
              <input type="color" onChange={(event) => this.changeColor(event)}/>
            </div>
            <div className="colorPanel__control">
              <span>Schimba culoarea textului</span>
              <input type="color" onChange={(event) => this.changeTextColor(event)}/>
            </div>
          </div>
        </div>

        <div className="layoutColumn">
        {
          this.state.displayUsers === true
            ? <UserList users={this.state.users} deleteUser={(id) => this.deleteUser(id)}/>
            : null
        }
        {
          this.state.displayPosts === true 
            ? <PostList posts={this.state.posts}/>
            : null
        }
        </div>
      </div>
    );
  }
}

export default App;
