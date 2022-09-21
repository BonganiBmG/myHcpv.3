import nurse2 from '../../assets/nurse2.png'
import nurseb from '../../assets/nurseb.jpg'
import nursec from '../../assets/nursec.png'
import nursev from '../../assets/nursev.png'



const ServiceList=  [
    { 
        name: "Sister Sowie",
        contactNumber: "071 696 2022",
        rating: "4.7",
        avatar: nurse2,
        coord: {latitude:-26.119630 , longitude: 28.037643 ,}


    },
    {
        name: "Palesa Tshuma",
        contactNumber: "066 201 5646",
        rating: "4.6",
        avatar: nurseb,
        coord: {latitude:-26.144481, longitude: 28.041079 ,}

    },

    {
        name: "Marie van Vyk",
        contactNumber: "071 854 2489",
        rating: "4.7",
        avatar: nursec,
        coord: {latitude:-26.120208 , longitude: 28.067232 ,}

    },

    {
        name: "Martha Stevens",
        contactNumber: "067 213 4869",
        rating: "4.6",
        avatar: nursev,
        coord: {latitude:-26.148526, longitude: 28.006189 ,}

    },
];

export  default ServiceList;