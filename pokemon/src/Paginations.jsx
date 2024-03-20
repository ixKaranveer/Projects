import React from 'react'
import './pagination.css'

function Paginations(props) {

    return (
        <div className='main'>
            <button className='paginations' onClick={props.handlePrevPage} disabled={props.currentPage === 1}>
                Previous Page
            </button>
            <span>   {props.currentPage}   </span>
            <button className='paginations' onClick={props.handleNextPage }>
                Next Page
            </button>
        </div>
    )
}

export default Paginations