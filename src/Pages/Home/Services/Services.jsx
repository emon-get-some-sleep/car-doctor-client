import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://car-doctor-server-zeta-eight.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])
    
    return (
        <div>
            <div className="text-center mt-4">
                <h3 className="text-3xl text-orange-300 font-bold">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima itaque deleniti sapiente suscipit dolores, quis mollitia impedit! <br />Accusantium asperiores, molestias quaerat delectus aliquid sed quas perspiciatis pariatur debitis error atque.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;