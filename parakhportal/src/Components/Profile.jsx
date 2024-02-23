import '../Css/style.css';
import quizData from '../quiz.json';
import { Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react';
import { HStack, Text, Image, Button, Box, Progress } from '@chakra-ui/react';
import AICTCLOGO from '../Images/AICTE.png';
import SLALOGO from '../Images/SLALogo.png';
import { Switch } from '@chakra-ui/react';
// import * as faceapi from 'face-api.js';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import New from './new.png';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Charts from './Charts';
const Profile = () => {
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
                        <a href="#" style={{backgroundColor:"#119af0",color:"white"}}>
                            <i className="bx bxs-dashboard"  />
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
                <Charts/>
                </main>
            </div>
        </>

    )
}

export default Profile