import React, {Component} from "react";
import {auth} from "../services/firebase";
import {db} from "../services/firebase";
import "./Chat.css";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      try {
        db.ref("chats").on("value", snapshot => {
          let arr = [];
          snapshot.forEach((snap) => {
            arr.push(snap.val());
          });
          this.setState({ chats: arr });
        });
      } catch (error) {
        this.setState({ readError: error.message });
      }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
            await db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid
            });
            this.setState({ content: '' });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    render(){
        return (
            <div className="FormChat">
              <div className="FormContentChat">
                {this.state.chats.map(chat => {
                  if(chat.uid === this.state.user.uid){
                    return <p className="MyChat" key={chat.timestamp}>{chat.content}</p>
                  }else{
                    return <p className="TheyChat" key={chat.timestamp}>{chat.content}</p>
                  }
                  // if chat.uid == this.state.userid
                
                })}
              </div>
              {/* form mess */}
              <form className="btnSend" onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.content}></input>
                {this.state.error ? <p>{this.state.writeError}</p> : null}
                <button type="submit">Send</button>
                <div>
                Login in: <strong>{this.state.user.email}</strong>
              </div>
              </form>
              
            </div>
          );
    }

}