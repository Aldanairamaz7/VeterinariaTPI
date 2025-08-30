import { Carousel, CarouselItem } from "react-bootstrap"
import imageList from "../../data/images"
import './BackgroundCarousel.css'

function BackgroundCarousel() {
    return (
        <div className="carousel-container">
            <Carousel controls={false} indicators={false} fade interval={3000} >
                {imageList.map((img, index) => (
                    <CarouselItem key={index}>
                        <img className="d-block w-100 carousel-image" src={img} alt={`slide-${index}`} />
                    </CarouselItem>
                ))}

            </Carousel>
            <div className="carousel-overlay-text">
                <h1>Cuidamos a tu mascota las 24hs</h1>
                <p>Atención veterinaria profesional en Rosario. Consultas, castraciones, medicamentos y emergencias</p>
            </div>


        </div>
    )
}

export default BackgroundCarousel