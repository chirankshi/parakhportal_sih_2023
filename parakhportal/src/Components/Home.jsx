import React, { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { HStack, Text, InputLeftElement, InputGroup, Button, Image } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import { FaLock } from "react-icons/fa";
import { Icon } from '@chakra-ui/react'
import { FaUser } from "react-icons/fa";
import AICTE from '../Images/AICTE.png'
import { FaRobot } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as mdb from 'mdb-ui-kit';
import SIH from '../Images/sih-logo.png'



const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('email', email);

        toast.success(data.message);

        setTimeout(() => {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
              .then((stream) => {
                const video = document.createElement('video');
                document.body.appendChild(video);
                video.style.display = 'none';

                video.srcObject = stream;
                video.play();

                setTimeout(() => {
                  const canvas = document.createElement('canvas');
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  const context = canvas.getContext('2d');
                  context.drawImage(video, 0, 0, canvas.width, canvas.height);

                  const imageDataUrl = canvas.toDataURL('image/png');

                  localStorage.setItem('capturedImage', imageDataUrl);

                  stream.getTracks().forEach(track => track.stop());
                  document.body.removeChild(video);

                  if (data.user && data.user.userGroup === 'admin') {
                    history('/admin');
                  } else if (data.user && data.user.userGroup === 'user') {
                    history('/dashboard');
                  } else {
                    history('/');
                  }
                }, 3000);
              })
              .catch(error => console.error('Error accessing camera:', error));
          }
        }, 3000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Error during login:', error);
    }
  };


  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src={SIH}
                          style={{ width: 185 }}
                          alt="logo"
                        />
                        <h4 className="mt-3 mb-5 pb-1">We are The Mindserenade Team</h4>
                      </div>
                      <form>
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Please Enter Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example11">
                            Email-id
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example22">
                            Password
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn  btn-block fa-lg gradient-custom-2 mb-3"
                            type="button" style={{backgroundColor:"#119af0",color:'white'}}
                            onClick={handleLogin}
                          >
                            Log in
                          </button>
                          <a className="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger">
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2" style={{ backgroundColor: '#119af0' }}>
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      {/* <img
                        src={AICTE}
                        style={{ width: 185 }}
                        alt="logo"
                      /> */}
                      <h4 className="mb-4">General <span>Information</span></h4>
                      <p className="small mb-0">
                        1. Kindly login with your given username and password
                        <br />
                        2. Do not share your credential details like password with anyone.
                        <br />
                        3. Click here to go back to home  page.
                        <br />
                        4. IMPORTANT: Please raise grievance in https://css.aicte-india.org/, if OTP is not received on registered email or mobile number
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />

    </>
  )
}

export default Home