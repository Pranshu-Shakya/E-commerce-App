import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets.js'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

    <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae dolor veniam, exercitationem accusantium quia at omnis nemo nobis assumenda autem! Suscipit eos, praesentium accusamus similique rem, architecto iure exercitationem nam eum libero laboriosam eius ad aut obcaecati fugiat doloremque nulla.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, laboriosam maiores! Nihil possimus fugit alias quia nulla magni aliquid, illo, recusandae consequatur libero blanditiis minima nostrum perspiciatis earum corrupti labore!</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores fugit fugiat consequuntur, ducimus et atque molestiae quos! Aperiam vero doloribus ab iusto amet nesciunt ad!</p>
        </div>
    </div>

    <div className='text-4xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda recusandae deserunt commodi soluta iste magni!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam beatae nesciunt sint repellat natus exercitationem facilis blanditiis architecto eius hic.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, eligendi. Provident magni inventore iusto totam mollitia doloribus!</p>
        </div>
    </div>

    <NewsletterBox />

    </div>
  )
}

export default About