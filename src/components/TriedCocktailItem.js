import React from 'react'
import './TriedCocktailItem.css'
import placeholder from '../placeholder.jpg'

function TriedCocktailItem() {
  return (
    <div className="tried-cocktail-item-body">
      <h3>Cocktail Name</h3>
      <h3>Letter Grade</h3>
      <img id="cocktail-image" src={placeholder}></img>

    </div>
  )
}

export default TriedCocktailItem