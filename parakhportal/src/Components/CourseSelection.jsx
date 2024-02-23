import React, { useState } from 'react'
import { HStack, Box, Button } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const CourseSelection = () => {
  const [capturedImage, setCapturedImage] = useState(localStorage.getItem('capturedImage'));
  const [loginEmail, setLoginEmail] = useState(localStorage.getItem('email'));
  const [course, setCourse] = useState('UG');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedField, setSelectedField] = useState('');

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  const handleGoForAssessment = () => {
    localStorage.setItem('selectedCourse', course);
    localStorage.setItem('selectedBranch', selectedBranch);
    localStorage.setItem('selectedField', selectedField);
    
    window.location.href = '/instruction';
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
            <a href="/profile">
              <i className="bx bxs-dashboard" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="/quiz">
              <i className="bx bx-store-alt" />
              Quiz
            </a>
          </li>

          <li>
            <a href="/profile">
              <i className="bx bx-group" />
              Users
            </a>
          </li>
          <li>
            <a href="/">
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
          <form action="/">
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


          </div>
          <div className="card">
            <HStack w={"100%"} h={"100vh"}  justifyContent={"center"} >

              <HStack w={"700px"} h={"300px"} bgColor={"white"} shadow={"dark-lg"}  borderRadius={"2%"} style={{marginTop:'-120px'}} justifyContent={"center"} flexDir={"column"} >
                <HStack w={"90%"}  alignItems={"center"} >
                  <Box w={"50%"} h={"100%"}  >
                    <Select placeholder='Select Course' my={"20px"} border={"2px solid black"}>
                      <option value='UG'>UG</option>
                      <option value='option2'>PG</option>
                      <option value='option3'>PHD</option>
                    </Select>

                    <Select
                      placeholder="Select Branch"
                      onChange={handleBranchChange}
                      my={'20px'}
                      border={'2px solid black'}
                    >
                      <option value="option1">AI</option>
                      <option value="option2">CSE</option>
                      <option value="option3">CIVIL</option>
                      <option value="option4">MECHANICAL</option>
                    </Select>
                  </Box>

                  <Box w={"50%"} h={"100%"} >
              

                    <Select
                      placeholder="Select Field"
                      onChange={handleFieldChange}
                      my={'20px'}
                      border={'2px solid black'}
                    >
                      <option value="Web">Web Development</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Networking">Networking</option>
                    </Select>

                    {/* <Select placeholder='Select option' my={"20px"}  border={"2px solid black"}>
<option value='option1'>Option 1</option>
<option value='option2'>Option 2</option>
<option value='option3'>Option 3</option>
</Select> */}
                  </Box>


                </HStack>

                <HStack w={"full"} justifyContent={"center"}>
                <Link to={'/instruction'}>
          <Button bgColor={"#119af0"} color={"white"} onClick={handleGoForAssessment}>
            Go For Assessment
          </Button>
        </Link>                </HStack>
              </HStack>

            </HStack>
          </div>
        </main>
      </div>
    </>
  )
}

export default CourseSelection