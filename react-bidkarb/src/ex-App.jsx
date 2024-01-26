// import { Routes, Route } from "react-router-dom";
// import './App.css'
// import HomePage from "./pages/bidkarb/HomePage.jsx";
// import PaymentValidation from './pages/bidkarb/PaymentValidation.jsx'
// import Shipping from './pages/bidkarb/Shipping.jsx';
// import OpenAuction from './pages/bidkarb/OpenAuction.jsx'

// function App() {

//   function formatDateTime(date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//     const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

//     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
//   }

//   const currentDateTime = new Date();
//   const formattedDateTime = formatDateTime(currentDateTime);

//   console.log(formattedDateTime);

  
//   const buyer = {
//       id: 1,
//       email: 'narapong.131@gmail.com',
//       password: 'dasdasd',
//       firstName: 'Narapong',
//       lastName: 'Hongtha',
//       telNum: '091-014-3337',
//       rate: 0.0
//   };

//   const seller = {
//     id: 2,
//     email: 'noppharut.s@g-able.com',
//     password: 'dasdasd',
//     firstName: 'Noppharut',
//     lastName: 'Sintawanuwat',
//     telNum: '093-247-1246',
//     rate: 0.0
// };

//   const auction = {
//     id: 1,
//     productName: 'Benz',
//     productCategory: {
//         id: '1',
//         categoryName: 'Vehicle',
        
//     },
//     quality: 'Used',
//     openPrice: 2000,
//     minBid: 2000,
//     buyNow: 100000,
//     createdAt: '2024-01-15T15:32:16.692',
//     startAt: '2024-01-15T15:32:16.692',
//     endAt: '2024-01-15T15:32:16.692',
//     description: '',
//     status: 'ON_GOING',
//     buyer: buyer,
//     seller: seller,
//     bankName: 'Kasikorn',
//     bankNumber: '1223523566',
//     rating: 0.0,
// };


//   return (
//     <>
// {/* <<<<<<< HEAD
//       <Shipping></Shipping> */}
//         <Routes>
//         <Route path="/" element={<HomePage />}>
//           <Route path="/openAuction" element={<OpenAuction/>} />
//           <Route path="/payment" element={<PaymentValidation auction={auction} />} />
//         </Route>
//       </Routes>
//     </>
//   );
//   }

// export default App
