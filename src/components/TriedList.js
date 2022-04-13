import React from 'react'
import TriedCocktailItem from './TriedCocktailItem'
import './Lists.css'

function TriedList() {
  return (
    <div className='list'>
        <TriedCocktailItem></TriedCocktailItem>
        <TriedCocktailItem></TriedCocktailItem>
        <TriedCocktailItem></TriedCocktailItem>
        <TriedCocktailItem></TriedCocktailItem>
    </div>
  )
}

export default TriedList