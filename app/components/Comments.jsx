// OB/ET: dead code
const io = require('socket.io-client')
const socket = io()
import React, { Component } from 'react'

export default class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {code: ''}
    socket.on('receive code', (payload) => {
      this.updateCodeFromSockets(payload)
    })
  }

  updateCodeFromSockets(payload) {
    this.setState({code: payload.newCode})
  }

  componentDidMount() {
    if (this.props.comments === undefined) {
      this.props.getComments()
    } else {
      socket.emit('comments', {article: this.props.article.id})
    }
  }

  componentWillReceiveProps(nextProps) {
    socket.emit('room', {article: nextProps.challenge.id})
  }

  componentWillUnmount() {
    socket.emit('leave room', {
      room: this.props.challenge.id
    })
  }

  updateCodeInState(newText) {
    this.setState({code: newText})
    socket.emit('coding event', {
      room: this.props.challenge.id,
      newCode: newText
    })
  }

  render() {
    return (
      <div>
        <h1>THIS IS A TEST</h1>
      </div>
    )
  }
}
