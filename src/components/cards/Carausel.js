import React, {useState, useEffect } from 'react';
import { getProductsByCount } from "../../functions/product";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Carausel = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProductsByCount()
        .then(res =>{
            setProducts(res.data);
            //console.log(res.data)
        })    
    }, [])
    return (
        <Carousel showArrows={true} autoPlay infiniteLoop className="mt-2">
            {products.map((product) =>(
                <div key={product._id}>
                    <img src={
                        product.images[0].url
                    }
                    alt="" />
                    <p className="bg-secondary legend info">{product.title}</p>
                </div>
            ))}   
        </Carousel>

    )
}

export default Carausel
