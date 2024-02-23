import '../Css/style.css';
import quizData from '../quiz.json';
import React, { useState, useEffect, useRef } from 'react';
import { HStack, Text, Image, Button, Box, Progress, Badge } from '@chakra-ui/react';
import AICTCLOGO from '../Images/AICTE.png';
import SLALOGO from '../Images/SLALogo.png';
import { Switch } from '@chakra-ui/react';
// import * as faceapi from 'face-api.js';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import New from './new.png';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ReactApexChart from 'react-apexcharts';
import WebcamDemo from './WebcamDemo';

const AssessmentQuiz = () => {
  useEffect(() => {
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    const menuBar = document.querySelector('.content nav .bx.bx-menu');
    const sideBar = document.querySelector('.sidebar');
    const searchBtn = document.querySelector('.content nav form .form-input button');
    const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
    const searchForm = document.querySelector('.content nav form');
    const toggler = document.getElementById('theme-toggle');

    const handleLinkClick = (item) => {
      const li = item.parentElement;
      sideLinks.forEach(i => {
        i.parentElement.classList.remove('active');
      });
      li.classList.add('active');
    };

    const handleMenuBarClick = () => {
      sideBar.classList.toggle('close');
    };

    const handleSearchBtnClick = (e) => {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
          searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
          searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        sideBar.classList.add('close');
      } else {
        sideBar.classList.remove('close');
      }
      if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
      }
    };

    const handleThemeToggleChange = () => {
      if (toggler.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    sideLinks.forEach(item => item.addEventListener('click', () => handleLinkClick(item)));
    menuBar.addEventListener('click', handleMenuBarClick);
    searchBtn.addEventListener('click', handleSearchBtnClick);
    window.addEventListener('resize', handleResize);
    toggler.addEventListener('change', handleThemeToggleChange);

    return () => {
      sideLinks.forEach(item => item.removeEventListener('click', () => handleLinkClick(item)));
      menuBar.removeEventListener('click', handleMenuBarClick);
      searchBtn.removeEventListener('click', handleSearchBtnClick);
      window.removeEventListener('resize', handleResize);
      toggler.removeEventListener('change', handleThemeToggleChange);
    };
  }, []);

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
  const [isLanguage, setIsLanguage] = useState('English');
  const [onWhichQuestion, setOnWhichQuestion] = useState(0);
  const [optionChoose, setOptionChoose] = useState('1');
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6000);
  const [responses, setResponses] = useState({});
  const [questionTimes, setQuestionTimes] = useState(Array.from({ length: quizData.questions.length }, () => 0));

  const { questions } = quizData;

  const currentQuestion = questions[onWhichQuestion];

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleOpenConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirmationYes = () => {
    handleSubmitQuiz();
    handleCloseConfirmationModal();
  };


  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isSubmitted) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        setQuestionTimes((prev) => {
          const newTimes = [...prev];
          newTimes[onWhichQuestion] += 1;
          return newTimes;
        });
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, isSubmitted]);

  useEffect(() => {
    console.log("Question-wise Time:", questionTimes);
  }, [questionTimes]);

  const [capturedImage, setCapturedImage] = useState(localStorage.getItem('capturedImage'));

  const [loginEmail, setLoginEmail] = useState(localStorage.getItem('email'));

  useEffect(() => {
    setLoginEmail(localStorage.getItem('email'));
  }, []);

  const handleSaveAndNext = () => {
    setAnsweredQuestions((prev) => ({ ...prev, [onWhichQuestion]: optionChoose }));
    setSelectedAnswers((prev) => ({ ...prev, [onWhichQuestion]: optionChoose }));
    setOnWhichQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    setOptionChoose('1');
  };

  const handleSaveAndReviewLater = () => {
    setAnsweredQuestions((prev) => ({ ...prev, [onWhichQuestion]: optionChoose }));
    setSelectedAnswers((prev) => ({ ...prev, [onWhichQuestion]: optionChoose }));
    setSkippedQuestions((prev) => [...prev, onWhichQuestion]);
    setOnWhichQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    setOptionChoose('1');
  };

  const handleSkipAndAnswerLater = () => {
    setSkippedQuestions((prev) => [...prev, onWhichQuestion]);
    setOnWhichQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    setOptionChoose('1');
  };

  const handlePrevious = () => {
    setOnWhichQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    setOptionChoose(selectedAnswers[onWhichQuestion - 1] || '1');
  };

  const handleClearResponse = () => {
    setResponses((prev) => ({ ...prev, [onWhichQuestion]: undefined }));
    setOptionChoose('1');
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
  };

  const QuestionAnalysisCard = ({ correctAnswers, incorrectAnswers, skippedQuestions }) => {
    const totalQuestions = correctAnswers.length + incorrectAnswers.length + skippedQuestions.length;
  
    const chartData = [
      (correctAnswers.length / totalQuestions) * 100,
      (incorrectAnswers.length / totalQuestions) * 100,
      (skippedQuestions.length / totalQuestions) * 100,
    ];
  
    const options = {
      labels: ['Correct Answers', 'Wrong Answers', 'Skipped Answers'],
      colors: ['green', 'red', 'purple'],
    };
  
    return (
      <Box mt={8} p={4} borderRadius={8} boxShadow="md" textAlign="left" style={{ position: 'relative', left: '29rem' }}>
        <Text fontSize="xl" fontWeight="bold" mb={4} style={{ textAlign: 'center' }}>
          Question Analysis
        </Text>
        <Text fontSize="sm" fontWeight="bold" mb={4} style={{ textAlign: 'center' }}>
          🟢 Correct Answer 🔴 Wrong Answer 🟣 Skipped Answer
        </Text>
        <HStack spacing={4} style={{ justifyContent: 'center' }}>
          {Array.from({ length: totalQuestions }, (_, index) => (
            <Badge
              key={index}
              fontSize="md"
              style={{ justifyContent: 'center' }}
              colorScheme={
                index < correctAnswers.length
                  ? 'green'
                  : index < correctAnswers.length + incorrectAnswers.length
                  ? 'red'
                  : 'purple'
              }
            >
              {index + 1}
            </Badge>
          ))}
        </HStack>
        <Box mt={4}>
          <ReactApexChart options={options} series={chartData} type="pie" height={300} />
        </Box>
      </Box>
    );
  };

  const correctAnswers = Object.keys(answeredQuestions).filter(
    (index) => questions[index].answer === parseInt(answeredQuestions[index], 10)
  );
  const incorrectAnswers = Object.keys(answeredQuestions).filter(
    (index) => questions[index].answer !== parseInt(answeredQuestions[index], 10)
  );
  const skippedAnswers = skippedQuestions.filter(
    (index) => !Object.keys(answeredQuestions).includes(index.toString())
  );
  const notAttemptedQuestions = questions.length - (correctAnswers.length + incorrectAnswers.length + skippedAnswers.length);
  const categoryCounts = questions.reduce((acc, question, index) => {
    const isCorrect = correctAnswers.includes(index.toString());
    const isIncorrect = incorrectAnswers.includes(index.toString());
    const isSkipped = skippedAnswers.includes(index);

    if (isCorrect) {
      acc[question.category] = acc[question.category] || { correct: 0, incorrect: 0, skipped: 0, notAttempted: 0 };
      acc[question.category].correct++;
    } else if (isIncorrect) {
      acc[question.category] = acc[question.category] || { correct: 0, incorrect: 0, skipped: 0, notAttempted: 0 };
      acc[question.category].incorrect++;
    } else if (isSkipped) {
      acc[question.category] = acc[question.category] || { correct: 0, incorrect: 0, skipped: 0, notAttempted: 0 };
      acc[question.category].skipped++;
    } else {
      acc[question.category] = acc[question.category] || { correct: 0, incorrect: 0, skipped: 0, notAttempted: 0 };
      acc[question.category].notAttempted++;
    }

    return acc;
  }, {});



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
            <a href="/quiz">
              <i className="bx bx-store-alt" />
              Quiz
            </a>
          </li>

          <li>
            <a href="#">
              <i className="bx bx-group" />
              Users
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
              <h1>Pre Assesment Test</h1>
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
          <HStack h={'120vh'} w={'full'} bgColor={'gray.200'} alignItems={'flex-start'} justifyContent={'flex-start'} flexDir={'column'}>
            <HStack h={'90px'} justifyContent={'space-between'} w={'full'} bgColor={'blue.400'}>
              <HStack>
                <Image pl={'10px'} w={'80px'} src={AICTCLOGO} />
                <Image pl={'10px'} w={'150px'} src={SLALOGO} />
                <Text style={{ marginLeft: '125px' }} color={'white'} pl={'15px'} fontSize={'2xl'}>
                  AI BASED PRE-LEARNING ASSESSMENT
                </Text>
              </HStack>



              {/* {capturedImage && (
                                <div style={{ position: 'relative', width: '66px', height: '64px' }}>
                                    <img
                                        style={{ width: "66px", position: "relative", right: "35vh", borderRadius: "38px", height: "64px" }}
                                        src={capturedImage}
                                        alt="Captured"
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: "23px",
                                            right: "15vh",
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {loginEmail || 'Default Name'}
                                    </div>
                                </div>
                            )} */}
            </HStack>
            <HStack h={'50px'} bgColor={'white'} w={'full'} justifyContent={'space-between'}>
              <HStack>
                <Button ml={'10px'} borderRightRadius={'10px'} h={'35px'} bgColor={'purple.400'}>
                  Topics
                </Button>
                <Text color={'blue.400'} fontSize={'23px'} fontWeight={'bold'}>
                  {`>`}
                </Text>

                <Button borderRightRadius={'10px'} h={'35px'} bgColor={'green.400'}>
                  Engineering
                </Button>
              </HStack>

              <HStack mr={'20px'}>
                <Text fontSize={'17px'}>Select Language : {isLanguage}</Text>{' '}
                <Switch
                  onChange={() => {
                    setIsLanguage(isLanguage === 'English' ? 'हिंदी' : 'English');
                  }}
                  colorScheme={'orange'}
                />

                <Text fontSize={'19px'} fontWeight={'bold'} color={'green.400'}>
                  Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </Text>
              </HStack>
            </HStack>

            {!isSubmitted ? (
              <HStack w={'full'} h={'500px'} justifyContent={'center'}>
                <HStack w={'95%'} h={'full'}>
                  <HStack w={'70%'} h={'full'} flexDir={'column'} alignItems={'flex-start'}>
                    <HStack w={'100%'} mt={'20px'} flexDir={'column'} h={'300px'} bgColor={'white'} border={'2px solid #518ec4'} alignItems={'flex-start'}>
                      <HStack w={'full'} bgColor={'gray.300'} h={'40px'} p={'10px'} borderBottom={'3px solid gray'}>
                        <Text fontWeight={'bold'} fontSize={'20px'}>
                          Question : {onWhichQuestion + 1}
                        </Text>
                      </HStack>

                      <HStack w={'full'} flexDir={'column'} alignItems={'flex-start'} h={'100px'} p={'20px'}>
                        <Text fontSize={'17px'} fontWeight={'semibold'} borderBottom={'3px solid #98c5ed'}>
                          {currentQuestion.question}
                        </Text>

                        <HStack w={'100%'}>
                          <HStack w={'50%'}>
                            <RadioGroup w={'full'} onChange={(value) => setOptionChoose(value)} value={optionChoose}>
                              <Stack>
                                {currentQuestion.options.slice(0, 2).map((option, index) => (
                                  <Radio key={index} minH={'40px'} value={`${index + 1}`}>
                                    {option}
                                  </Radio>
                                ))}
                              </Stack>
                            </RadioGroup>
                          </HStack>

                          <HStack w={'50%'}>
                            <RadioGroup w={'full'} onChange={(value) => setOptionChoose(value)} value={optionChoose}>
                              <Stack>
                                {currentQuestion.options.slice(2).map((option, index) => (
                                  <Radio key={index + 2} minH={'40px'} value={`${index + 3}`}>
                                    {option}
                                  </Radio>
                                ))}
                              </Stack>
                            </RadioGroup>

                          </HStack>
                          <Button
                            fontSize={'13px'}
                            w={'150px'}
                            bgColor={'gray.500'}
                            color={'white'}
                            borderRadius={'0px'}
                            onClick={handleClearResponse}
                          >
                            Clear Response
                          </Button>
                        </HStack>

                      </HStack>

                    </HStack>


                    <HStack w={'full'} h={'80px'} mt={'20px'}>
                      <Button fontSize={'13px'} color={'white'} bgColor={'yellow.400'} w={'150px'} borderRadius={'0px'} onClick={handlePrevious}>
                        Previous
                      </Button>
                      {/* <Button fontSize={'13px'} w={'150px'} border={'1px solid blue'} borderRadius={'0px'}>
                                                Close
                                            </Button> */}
                      <Button fontSize={'13px'} color={'white'} bgColor={'red.600'} w={'170px'} borderRadius={'0px'} onClick={handleSkipAndAnswerLater}>
                        Skip & Answer Later({skippedQuestions.length})
                      </Button>
                      <Button fontSize={'13px'} color={'white'} bgColor={'yellow.500'} w={'170px'} borderRadius={'0px'} onClick={handleSaveAndReviewLater}>
                        Save & Review Later (1)
                      </Button>
                      <Button fontSize={'13px'} color={'white'} bgColor={'green.500'} w={'170px'} borderRadius={'0px'} onClick={handleSaveAndNext}>
                        Save & Next(1)
                      </Button>
                      <Button colorScheme="orange" mr={'20px'} onClick={handleOpenConfirmationModal}>
                        SUBMIT
                      </Button>
                      <Modal isOpen={isConfirmationModalOpen} onClose={handleCloseConfirmationModal}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Confirm Submission</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            Are you sure you want to submit the quiz?
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="green" mr={3} onClick={handleConfirmationYes}>
                              Yes
                            </Button>
                            <Button colorScheme="red" onClick={handleCloseConfirmationModal}>
                              No
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </HStack>
                  </HStack>

                  <HStack w={'30%'} bgColor={'white'}>
                    <Box w={'full'} h={'450px'} px={'20px'} overflowY={'scroll'}>
                      {Array.from({ length: questions.length }, (_, index) => (
                        <Button
                          key={index}
                          m={'8px'}
                          p={'0px'}
                          bgColor={
                            onWhichQuestion === index
                              ? 'purple'
                              : answeredQuestions[index]
                                ? 'green.500'
                                : skippedQuestions.includes(index)
                                  ? 'red.600'
                                  : 'yellow.400'
                          }
                          shadow={'md'}
                          color={onWhichQuestion === index ? 'white' : 'none'}
                          onClick={() => {
                            setOnWhichQuestion(index);
                            setOptionChoose(answeredQuestions[index] || '1');
                          }}
                          borderRadius={'50%'}
                        >
                          {index + 1}
                          {answeredQuestions[index] && <span style={{ color: 'green', marginLeft: '4px' }}>✔</span>}
                        </Button>
                      ))}
                    </Box>

                  </HStack>
                </HStack>

              </HStack>

            ) : (
              <>
                <QuestionAnalysisCard
                  correctAnswers={correctAnswers}
                  incorrectAnswers={incorrectAnswers}
                  skippedQuestions={skippedQuestions}
                />
                <Box w={'full'} mt={'20px'} p={'20px'} borderRadius={'8px'} boxShadow={'md'} textAlign={'center'}>
                  <Text fontSize={'24px'} fontWeight={'bold'} mb={'10px'}>
                    Results
                  </Text>
                  <Table variant="simple" colorScheme="teal" size="md">
                    <Thead>
                      <Tr>
                        <Th>Category</Th>
                        <Th>Correct Options</Th>
                        <Th>Count</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {Object.entries(categoryCounts).map(([category, counts]) => (
                        <Tr key={category}>
                          <Td fontWeight="bold" color="green.500">{`${category} - Correct Answers`}</Td>
                          <Td>{counts.correct}</Td>
                        </Tr>
                      ))}
                      {Object.entries(categoryCounts).map(([category, counts]) => (
                        <Tr key={category}>
                          <Td fontWeight="bold" color="red.500">{`${category} - Incorrect Answers`}</Td>
                          <Td>{counts.incorrect}</Td>
                        </Tr>
                      ))}
                      {Object.entries(categoryCounts).map(([category, counts]) => (
                        <Tr key={category}>
                          <Td fontWeight="bold" color="yellow.500">{`${category} - Skipped Questions`}</Td>
                          <Td>{counts.skipped}</Td>
                        </Tr>
                      ))}
                      {Object.entries(categoryCounts).map(([category, counts]) => (
                        <Tr key={category}>
                          <Td fontWeight="bold" color="gray.500">{`${category} - Not Attempted Questions`}</Td>
                          <Td>{counts.notAttempted}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </>
            )}
            <Box w={'195px'} h={'144px'} bgColor={'black'} position="relative" bottom="82px">
              <video ref={videoRef} width="100%" height="100%" autoPlay playsInline />
            </Box>
          </HStack>
        </main>
      </div>
    </>

  )
}

export default AssessmentQuiz;