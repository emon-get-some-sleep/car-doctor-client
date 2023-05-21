import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";


const BookService = () => {
    const service = useLoaderData();
  const { title, _id, price, img } = service;
  const {user} = useContext(AuthContext);

  const handleBookService = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const dueAmount = form.dueAmount.value;
    const order = {
        customerName: name,
        email,
        date,
        service: title,
        img,
        service_id: _id,
        price: dueAmount
    }
    console.log(order);
    fetch('https://car-doctor-server-zeta-eight.vercel.app/bookings', {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.insertedId){
            alert('service booked successfully');
        }
    })

  }
    return (
        <div>
        <h2 className="text-3xl text-center font-bold">Book Service: {title}</h2>
        
              <form onSubmit={handleBookService}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    defaultValue={user?.displayName}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered"
                  />
                  
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    defaultValue={user?.email}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Due Amount</span>
                  </label>
                  <input
                    type="text"
                    name="dueAmount"
                    defaultValue={'$ ' + price}
                    className="input input-bordered"
                  />
                  
                </div>
                <div className="form-control col-span-2 mt-6">
                  
                  <input className="btn btn-primary btn-block" type="submit" value="Confirm Order" />
                </div>
              </div>
              </form>
      </div>
    );
};

export default BookService;