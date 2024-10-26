import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const View = () => {

  const {id} = useParams()
  console.log(id);
  
  const userRecipe =useSelector(state=>state.recipeStore)
  const [recipe,setRecipe] = useState({})

  useEffect(()=>{
    if(sessionStorage.getItem("allrecipes")){
      const allrecipes = JSON.parse(sessionStorage.getItem("allrecipes"))
      setRecipe(allrecipes.find(item=>item.id==id))
    }
  },[])

  return (
    <div>
        <Header/>
        <div style={{paddingTop:'100px'}} className='flex content-center items-center mx-5'>
        <div className="grid grid-cols-2 items-center gap-6">
          <img width={'80%'} src={recipe.image} alt="" />
          <div>
          <h2 className='font-semibold text-lg'>Product ID : {recipe?.id}</h2>
          <h1 className='text-5xl font-bold mb-3'>{recipe?.name}</h1>
          <h2 className='font-bold text-lg my-5'>Rating : {recipe?.rating}/5</h2>
          <h1 className='font-bold text-xl'>Incredients : <p className='text-stone-600 p-2 px-10'>{recipe?.ingredients}</p></h1>
          <h1 className="font-bold text-xl mb-3">Instructions : <p className='text-stone-600 p-2 px-10'>{recipe?.instructions}</p></h1>
          <h4 className="font-bold text-2xl mb-3">Time Require : <span className='text-red-600'> {recipe?.cookTimeMinutes} min</span></h4>
          <h3 className='font-bold text-xl mb-3'>Style of Cooking : <span className='text-yellow-600'>{recipe?.cuisine}</span></h3>
          <h3 className='font-bold text-xl'>Calories Per Serving : <span className='text-orange-600'>{recipe?.caloriesPerServing} cal</span></h3>
        </div>
        </div>
      </div>
    </div>
  )
}

export default View