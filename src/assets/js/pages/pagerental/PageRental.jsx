import './PageRental.sass'
import { useLoaderData, useParams, Await } from 'react-router-dom'
import { Suspense } from 'react'
import Collapse from '../../components/collapse/Collapse'
import IconStar from '../../components/iconStar/IconStar'
import Carrousel from '../../components/carrousel/Carrousel'
import Portrait from '../../components/portrait/Portrait'
import RentalContent from '../../components/rentalcontent/RentalContent'
import Tag from '../../components/tag/Tag'

export default function PageRental() {
    const {rentals} = useLoaderData()
    const {id} = useParams()

    return <>
        <Suspense>
            <Await resolve={rentals}>
                {(rentals) => 
                    { 
                        const rental = rentals.find(rental => (rental.id === id))
                        if(!rental) throw new Error("id is not defined")

                        return <>
                                <Carrousel imgLinks={rental.pictures}/>
                                <div className='pageRental'>
                                    <RentalContent title={rental.title} location={rental.location}/>                                    
                                    <aside className='pageRental__aside'>
                                            <Portrait host={rental.host} />
                                            <IconStar rating={rental.rating}/>
                                    </aside>
                                    <ul className='pageRental__tags'>
                                        {(rental.tags).map((tag, index) => <li key={index}><Tag tag={tag}/></li>)}
                                    </ul>
                                </div>
                                <ul className='pageRental__collapse'>
                                    <li className='pageRental__collapse-item'><Collapse title="Description" content={rental.description}/></li>
                                    <li className='pageRental__collapse-item'><Collapse title="Equipments" content={rental.equipments}/></li>
                                </ul>
                            </>
                    }
                    
                }
                
            </Await>
        </Suspense>
    </>
}