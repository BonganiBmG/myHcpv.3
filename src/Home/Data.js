import dentist from '../../assets/dentist.png'
import nurse from '../../assets/nurse.png'
//import surgeon from '../../assets/surgeon.png'
import ear from '../../assets/ear.png'
import medical from '../../assets/medical.png'
import doctor2 from '../../assets/doctor2.png'
import medical4 from '../../assets/medical4.png'
import dietetics from '../../assets/dietetics.jpg'

const myHCPData= [
    {
       name: "Nurse",
       category: "Nurses",
       numberCompany: "80",
       image: nurse ,
       bgColor: "#7e57c2 "
    },
    {
        name: "Dentist",
        category: "Dentists",
        numberCompany: "20",
        image: dentist,
        bgColor: "#7e57c2 "
     },
     {
        name: "General Practioner",
        category: "GP's",
        numberCompany: "40",
        image:  medical,
        bgColor: "#7e57c2 "
     },
     {
        name: "Audiologist",
        category: "Specialists",
        numberCompany: "10",
        image: ear ,
        bgColor: "#7e57c2 "
     },
     {
        name: "Dietician",
        category: "Specialists",
        numberCompany: "5",
        image: dietetics ,
        bgColor: "#7e57c2 "
     },
     {
        name: "Psychiatrist",
        category: "Specialists",
        numberCompany: "7",
        image: medical4 ,
        bgColor: "#7e57c2 "
     },
     {
        name: "Social Worker",
        category: "Social Workers",
        numberCompany: "8",
        image: doctor2 ,
        bgColor: "#7e57c2 "
     },
     
]

export default myHCPData;