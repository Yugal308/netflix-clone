import React from 'react'
import "./List.css"
import Nav from './Nav'
import SavedShows from './SavedShows'

const List = () => {
  return (
    <>
        <Nav />
        <img className="image" src="https://pinkroom-main.s3.amazonaws.com/f75774ea-9a7c-44ea-a7c7-91d1e9df10e6.jpg" alt="background" />
        <div className='list_body' > 
            <h1 className='list_title'>My List</h1>
        </div>
        <SavedShows />
    </>
  )
}

export default List