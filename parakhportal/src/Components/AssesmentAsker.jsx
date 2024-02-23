import React, { useState, useEffect, useRef } from 'react';
import { HStack, Text, Image, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import AICTCLOGO from '../Images/AICTE.png';
import SLALOGO from '../Images/SLALogo.png';
import { parse } from 'papaparse';
import { saveAs } from 'file-saver';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssessmentQuiz = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGroup, setUserGroup] = useState('');



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  
    parse(file, {
      header: true,
      complete: (result) => {
        const convertedQuestions = result.data.map((row) => {
          const options = [];
          for (let i = 1; i <= 4; i++) {
            options.push(row[i]);
          }
          return {
            category: row.Category,
            question: row.Question,
            options,
            answer: parseInt(row.Answer, 10),
          };
        });
  
        setQuestions({
          questions: convertedQuestions,
        });
  
        const jsonBlob = new Blob([JSON.stringify({ questions: convertedQuestions }, null, 2)], { type: 'application/json' });
  
        // Save JSON blob to a file with a specific name (e.g., quizData.json)
        saveAs(jsonBlob, 'quizData.json');
  
        // Save the file in the public folder (accessible during development)
        const filePath = `/quizData.json`;
  
        // Create a link and trigger a click to initiate the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(jsonBlob);
        a.download = 'quizData.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // You can also save the file in the public folder
        fetch(filePath, {
          method: 'PUT',
          body: jsonBlob,
        })
          .then((response) => response.json())
          .then((data) => console.log('File saved in public folder:', data))
          .catch((error) => console.error('Error saving file:', error));
      },
    });
  };
  

  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
  }, []);

  const [capturedImage, setCapturedImage] = useState(localStorage.getItem('capturedImage'));

  const [loginEmail, setLoginEmail] = useState(localStorage.getItem('email'));

  useEffect(() => {
    setLoginEmail(localStorage.getItem('email'));
  }, []);

  const handleAddFileClick = () => {
    // Open the modal
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = {
        email,
        password,
      };
  
      if (userGroup) {
        userData.userGroup = userGroup;
      } else {
        // Set a default value if userGroup is not provided
        userData.userGroup = 'user';
      }
  
      const response = await fetch('http://localhost:3001/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Successfully added user, show success toast
        toast.success('User added successfully');
      } else {
        // Handle errors and show error toast
        const data = await response.json();
        toast.error(`Error adding user: ${data.error}`);
      }
    } catch (error) {
      // Handle exceptions and show error toast
      toast.error(`Error adding user: ${error.message}`);
    }
  
    setIsModalOpen(false);
  };
  
  
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="style.css" />
      <title>Responsive Dashboard Design #2 | AsmrProg</title>
      <div className="sidebar" >
        <a href="#" className="logo">
          <i className="bx bx-code-alt" />
          <div className="logo-name">
            <span>Parakh</span>Portal
          </div>
        </a>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-dashboard" />
              Dashboard
            </a>
          </li>

          <li>
            <a href="#">
              <i className="bx bx-cog" />
              Settings
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="/" className="logout">
              <i className="bx bx-log-out-circle" />
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        <nav>
          <i className="bx bx-menu" />
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="submit">
                <i className="bx bx-search" />
              </button>
            </div>
          </form>
          <input type="checkbox" id="theme-toggle" hidden />
          <label htmlFor="theme-toggle" className="theme-toggle" hidden />
          {/* <a href="#" className="notif">
                <i className="bx bx-bell" />
                <span className="count">12</span>
            </a> */}
          <a href="#" className="profile" style={{ display: 'flex' }}>
            <img src={capturedImage} />
            <span style={{ marginTop: '9px', marginLeft: '5px' }}>{loginEmail || 'Default Name'}</span>
          </a>
        </nav>
        <main>
          <div className="header">
            <div className="left">
              <h1>Dashboard</h1>
              {/* <ul className="breadcrumb">
                        <li>
                            <a href="#">Analytics</a>
                        </li>
                        /
                        <li>
                            <a href="#" className="active">
                                Shop
                            </a>
                        </li>
                    </ul> */}
            </div>
            <div className="right">
              <button onClick={handleAddFileClick}>
                <h5>Add User</h5>
              </button>
            </div>

          </div>
          <HStack h={'120vh'} w={'full'} alignItems={'flex-start'} justifyContent={'flex-start'} flexDir={'column'}>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <Input type="email" style={{marginBottom:'25px'}} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" bgColor="#119af0" color={"white"} mt={4}>Submit</Button>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
            <HStack h={'90px'} justifyContent={'space-between'} w={'full'} >
              <Text color={'white'} pl={'15px'} fontSize={'2xl'}>
              </Text>
            </HStack>
            <HStack>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <HStack w={"100%"} justifyContent={"center"}>
                <Button bgColor="#119af0" color={"white"} as="span">
                  Upload CSV File
                </Button>
                </HStack>
              </label>
              {selectedFile && (
                <Text ml="3">Selected File: {selectedFile.name}</Text>
              )}
            </HStack>

            {questions && (
              <pre>{JSON.stringify(questions, null, 2)}</pre>
            )}
          </HStack>

        </main>
      </div>
      <ToastContainer />

    </>

  );
};

export default AssessmentQuiz;
