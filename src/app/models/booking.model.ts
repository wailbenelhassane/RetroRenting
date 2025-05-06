
export interface Booking {
  id?: string;
  userId: string;
  "booking": {
    "car": string,
    "location": string,
    "pickupDate": string,
    "returnDate": string
  },
  "driver": {
    "name": string,
    "surname": string,
    "email": string,
    "phone": string,
    "country": string
  },
}
