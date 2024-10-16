// // EditProfile.js
// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import './editprofile.css'; 

// const EditProfile = () => {
//   const history = useHistory();
//   const [userData, setUserData] = useState({});
//   const [newUserData, setNewUserData] = useState({
//     name: '',
//     email: '',
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('/user', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Use your authentication method
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUserData(data);
//         } else {
//           console.error('Error fetching user data:', response.status);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUserData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('/edit-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Use your authentication method
//         },
//         body: JSON.stringify(newUserData),
//       });

//       if (response.ok) {
//         // Profile edited successfully, you can redirect or show a success message
//         history.push('/about');
//       } else {
//         console.error('Error editing profile:', response.status);
//       }
//     } catch (error) {
//       console.error('Error editing profile:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Edit Profile</h1>
//       <form>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={newUserData.name || userData.name}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             value={newUserData.email || userData.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         {/* Add more input fields for other user data */}
//         <button type="button" onClick={handleEditProfile}>
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;
