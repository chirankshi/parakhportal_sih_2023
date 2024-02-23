import React from 'react';
import {
  ChakraProvider, theme,
} from '@chakra-ui/react';

import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup'


import ScrollToTop from './Components/Helper/ScrollToTop';
import Assesmentquiz from './Components/Assesmentquiz';
import AssesmentAsker from './Components/AssesmentAsker';
import Instruction from './Components/Instruction';
import ForgotPassword from './Components/ForgotPassword';
import CourseSelection from './Components/CourseSelection';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import AiModelQuestions from './Components/AiModelQuestions';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
    
      <ScrollToTop/>
     
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Signup/>} />
          <Route path='/quiz' element={<Assesmentquiz/>}/>
          <Route path='/admin' element={<AssesmentAsker/>}/>
          <Route path='/instruction' element={<Instruction/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/courseselection' element={<CourseSelection/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/aiadmin' element={<AiModelQuestions/>} />

          
        

         
      
        </Routes>
      </Router>
     
    </ChakraProvider>
  );
}

export default App;
