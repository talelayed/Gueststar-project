import React from 'react'
import { Slider } from '../../components/Slider/Slider'
import { CategoriesStrip } from '../../components/CategoriesStrip/CategoriesStrip'
import './Home.css'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { ProductsList } from '../../components/ProductsList/ProductsList'
import { CategoriesList } from '../../components/CategoriesList/CategoriesList'
import { ThemesList } from '../../components/ThemesList/ThemesList'
import { Feedback } from '../../components/Feedback/Feedback'
import FeedbacksList from '../../components/FeedbacksList/FeedbacksList'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Slider/>
      <CategoriesStrip/>
      <div className='titre'>
        Meilleure vente
      </div>
      <ProductsList/>
      <div className='view-all'>
      < Link className='view-all-link' to={'/boutique/meilleure-vente'}>Voir tout</Link>
      </div>
      <div className='titre'>
        Nouvautés
      </div>
      <ProductsList/>
      <div className='view-all'>Voir tout</div>
      <div className='titre'>
        Catégories
      </div>
      <CategoriesList/>
      <div className='view-all'>Voir tout</div>
      <div className='titre'>
        Thèmes
      </div>
      <ThemesList/>
      <div className='view-all'>Voir tout</div>
      <div className='big-title'><b>Our happy customer</b></div>
      <FeedbacksList/>
    </div>
  )
}

