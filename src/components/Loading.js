import React from 'react'
import ReactLoading from 'react-loading'
import './Loading.scss'

export default function Loading () {
  return (
    <div className="loading">
      <ReactLoading type="spinningBubbles"/>
    </div>
  )
}
