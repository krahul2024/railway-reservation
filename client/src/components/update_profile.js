import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext.js';
import baseUrl from './baseUrl.js';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, setProfile } = useContext(UserContext);

  console.log(location.state);
  const user = location.state.user;

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('password');
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone?.includes('+')?user.phone?.split(' ')[1]:user.phone);
  const [email, setEmail] = useState(user.email);

  const processProfileUpdateData = async (e) => {
    e.preventDefault();
    console.log('Name:', name, '\nUsername:', username, '\nPassword:', password);
    const correct = email.includes('@');
    if (!correct) alert('Invalid email format.');
    else {
      try {
        const response = await fetch(`${baseUrl}/user/update_user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            name,
            phone,
            address,
            email,
          }),
        });

        const data = await response.json();

        if (!data.success) throw new Error(data.msg);

        window.alert(data.msg);
        setProfile(data.user);
        navigate('/user/profile');
      } catch (error) {
        console.log(error.message);
        if (error.message) window.alert(error.message);
        else
          window.alert(
            'There was an error logging you in! Please try again later. Thanks.'
          );
      }
    }
  };

  const getInput = (type, key, value, set, disabled = false) => (
    <div className="p-2 w-[600px]">
      <label
        htmlFor={key}
        className="flex flex-col p-1"
      >
        <span className="p-2 text-sky-500">Your {key}</span>
        {(type === 'text' || type === 'email' )&& (
          <input
            type={type}
            id={key}
            name={key}
            value={value}
            onChange={(e) => set(e.target.value)}
            disabled={disabled}
            className={`outline-0 border-2 px-4 py-2 bg-slate-900 border-gray-700 text-indigo-400 rounded-md ${
              disabled ? 'bg-slate-800 cursor-not-allowed' : ''
            }`}
          />
        )}
        {type === 'textarea' && (
          <textarea
            id={key}
            name={key}
            value={value}
            onChange={(e) => set(e.target.value)}
            disabled={disabled}
            className={`outline-0 border-2 px-4 py-2 bg-slate-900 border-gray-700 text-indigo-400 rounded-md ${
              disabled ? 'bg-gray-300 cursor-not-allowed' : ''
            } scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-700 resize-none w-full h-24 ${
              !disabled ? 'overflow-y-auto' : ''
            } ${!disabled ? 'text-wrap' : ''}`}
            rows="4"
          />
        )}
      </label>
    </div>
  );

  return (
    <>
      <div className="flex justify-center p-2 mb-16">
        <div className="flex flex-col p-8 text-center">
          <span className="text-sky-600 text-xl font-semibold">Update profile</span>
          <span className="text-sm text-cyan-500 italic">
            Provide all the information asked as it is required for ticket booking.
            This also saves your time while ticket booking.
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-2">
        <div className="flex flex-col justify-center border border-gray-700 px-8 py-2 rounded-lg">
          <span className="flex justify-center p-4 text-sky-500 font-semibold">Enter Updated Details</span>
          {getInput('text', 'name', name, setName)}
          {getInput('text', 'username', username, setUsername, true)}
          {getInput('email', 'email', email, setEmail)}
          {getInput('text', 'phone', phone, setPhone)}
          {getInput('textarea', 'address', address, setAddress)}

          <div className="flex py-4 -mb-2 gap-2">
          	<button onClick = {(e) => processProfileUpdateData(e)}
          		title = 'All previous information will be replaced with latest information.'
          		className="flex justify-center gap-2 border border-sky-900 px-6 mx-auto py-1.5 rounded-lg text-blue-400 hover:text-gray-200 hover:bg-blue-800 hover:border-blue-800 w-1/2"
          		><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
          		Update
          		</button>
          	<button onClick = {(e) => navigate('/user/profile')}
          		title = 'All the changes made will be lost'
          		className="flex justify-center gap-2 border border-sky-900 px-6 mx-auto py-1.5 rounded-lg text-red-400 hover:text-gray-200 hover:bg-red-600 hover:border-red-600 w-1/2"
          		><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
          		Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
