import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const url = `https://car-doctor-server-zeta-eight.vercel.app/bookings?email=${user?.email}`;

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
          setBookings(data)
        }
        else {
          // logout and then navigate
          navigate('/');
        }
      });
  }, [url]);

  const handleDelete = id => {
    const proceed = confirm('Are you sure you want to delete');
    if(proceed){
      fetch(`https://car-doctor-server-zeta-eight.vercel.app/bookings/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.deletedCount > 0){
          alert('deleted successfully');
          const remaining = bookings.filter(booking => booking._id !== id);
          setBookings(remaining);
        }
      })
    }
  }

  const handleBookingConfirm = id => {
    fetch(`https://car-doctor-server-zeta-eight.vercel.app/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({status: 'confirmed'})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount > 0){
        // update state
        // alert('Updated Succesfully')
        const remaining = bookings.filter(booking => booking._id != id);
        const updated = bookings.find(booking => booking._id == id);
        updated.status = 'confirmed';
        const newBookings = [updated, ...remaining];

        setBookings(newBookings);

      }
    })
  }
  return (
    <div>
      <h2 className="text-5xl text-center">Your Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Date</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                bookings.map(booking => <BookingRow key={booking._id} handleBookingConfirm={handleBookingConfirm} booking={booking} handleDelete={handleDelete}></BookingRow>)
            }
            
            
            
            
          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default Bookings;
