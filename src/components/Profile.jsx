import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import useData from '../hooks/useData';
import axios from 'axios';

export default function Profile() {
  const navigate = useNavigate();
  const [myUser, setMyUser] = useState({});
  const { loginUser, setLoginUser } = useData();

  useEffect(() => {
    axios.get('http://localhost:5000/profile')
      .then((res) => {
        const found = res.data.find((items) => items.userName === loginUser);
        if (found) {
          setMyUser(found);
        } else {
          navigate('/signin');
          alert('Login Plz');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function creatPost() {
    axios.post('http://localhost:5000/post', { userName: myUser.userName, newPost: prompt("Enter Data") })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deletePost(postIndex) {
    axios.delete('http://localhost:5000/post', {
      data: {
        userName: myUser.userName,
        postIndex: postIndex, // Pass the index or unique identifier of the post you want to delete
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editPost(postIndex) {
    axios.put('http://localhost:5000/post', {
      userName: myUser.userName,
      postIndex: postIndex, // Pass the index or unique identifier of the post you want to edit
      newPostData: prompt("Enter Update Data")
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }





  return (
    <>
      <center className='mt-3 mb-5'>
        <img src={myUser.profilURL} alt="" className='rounded-circle' style={{ width: '100px', height: '100px' }} />
        <h1 className='text-center h3'>{myUser.fullName}</h1>
        <button className='btn btn-success' onClick={creatPost}>Create Post</button>
      </center>


      <div className="d-flex justify-content-around flex-wrap">
        {Array.isArray(myUser.posts) && myUser.posts.length > 0 ? (
          myUser.posts.map((item, index) => (
            <div key={index} className='card my-2' style={{ width: '18rem' }}>
              <div className='card-body'>
                <h5 className='card-title'>{item}</h5>
                <button className='btn btn-primary' onClick={() => { editPost(index) }}>Edit</button>
                <button className='btn btn-danger' onClick={() => { deletePost(index) }}> Delete </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
}
