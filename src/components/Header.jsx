import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchRecipe } from '../redux/slices/recipeSlice'

const Header = ({insideHome}) => {

  const userRecipe = useSelector(state=>state.recipeReducer)
  const dispatch = useDispatch()

  return (
    <nav className='flex bg-stone-600 w-full p-5'>
        <Link className='text-white font-bold text-2xl' to={'/'}><i class="fa-solid fa-bell-concierge"></i> Recipes</Link>
        <ul className='flex-1 text-right'>
            {
              insideHome && <li className='list-none inline-block px-5'><input onChange={e=>dispatch(searchRecipe(e.target.value.toLocaleLowerCase()))} className='rounded p-1' style={{width:'300px'}} placeholder='Search Products Here' type="text" /></li>
            }
        </ul>
    </nav>
  )
}

export default Header