import React, { useState } from 'react'
import {HStack,Text,Button,Box,Checkbox} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const Instruction = () => {

  const [termsAccept,setTermsAccept] = useState(0);
  return (

    <HStack flexDir={"column"} w={"100%"}>
    <HStack justifyContent={"center"} h={"70px"} w={"100%"}   bgColor={"#4082ed"} ><Text color={"white"} fontSize={"23px"} fontWeight={"bold"}>AI BASED PRE-LEARNING ASSESSMENT </Text> 
    
   
    
    </HStack>
    <HStack w={"100%"} flexDir={"column"} alignItems={"flex-start"} justifyContent={"flex-start"} > 
        <Text ml={"10px"} borderBottom={"1px solid black"} fontWeight={"bold"}>General Instructions : </Text>
       
       
       <HStack pl={"20px"} flexDir={"column"} justifyContent={"flex-start"} alignItems={"flex-start"}>
        <Text>
        1. Total duration of examination is 90 minutes
        </Text>
        <Text>
       2. The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.
        </Text>
        <Text>
        3. The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
        </Text>
           
         
           <HStack flexDir={"column"} alignItems={"flex-start"} pl={"40px"}>
           <Text> <Button  borderRadius={"50%"} p={"0px"} >1</Button>  You have not visited the question yet.</Text>
           <Text> <Button bgColor={"red"} color={"white"}  borderRadius={"50%"} p={"0px"} >1</Button> You have not answered the question.</Text>
           <Text> <Button bgColor={"green"} color={"white"}  borderRadius={"50%"} p={"0px"} >1</Button>  You have answered the question</Text>
           <Text> <Button bgColor={"yellow"} color={"white"}  borderRadius={"50%"} p={"0px"} >1</Button>  You have NOT answered the question, but have marked the question for review
      </Text>
           </HStack>

           <Text>   The Marked for Review status for a question simply indicates that you would like to look at that question again. If a question is answered and Marked for Review, your answer for that question mill be considered in the evaluation

Navigating to a Question:
      </Text>


      <Text> 4. To answer a question, do the following:</Text>
     
     <Box pl={"20px"} >
      <Text>  
      a. Click on the question number in the Question Palette to go to that question directly.
      </Text>


      
      <Text>  
      b. Select an answer for a multiple choice type question. Use the virtual numeric keypad to enter a number as answer for a numerical type question.
      </Text>

      <Text>  
     
c. Click on Save & Next to save your answer for the current question and then go to the next question.
      </Text>


      <Text>  
     
      d. Click on Mark for Review & Next to save your answer for the current question, mark it for review, and then go to the next question.
           </Text>


           <Text>  
           e. Caution: Note that your answer for the current question will not be saved, if you navigate to another question directly by clicking on its question number.
          </Text>


          <Text>  
     
            
          </Text>

          </Box>
          
          <Text> 5. You can view all the questions by clicking on the Question Paper button. Note that the options for multiple choice type questions will not be shown Answering a Question:</Text>


        
          <Text>  
          6. Procedure for answering a multiple choice type question
 
          </Text>
          <Box pl={"20px"}>
          


          <Text>  
         
         a. To select your answer, click on the button of one of the options
 
          </Text>


          <Text>  
          b. To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button
          </Text>

          <Text>  
         
          c. To change your chosen answer, click on the button of another option
          </Text>
          <Text>  
          d. To save your answer, you MUST click on the Save & Next button
          </Text>

          <Text>  
          e. To mark the question for review, click on the Mark for Review & Next button. If an answer is selected for a question that is Marked for Review, that answer will

be considered in the evaluation.

          </Text>
          </Box>
          <Text>  
          7.To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question
          </Text>

          <Text>  
          8. Note that ONLY Questions for which answers are saved or marked for review after answering will be considered for evaluation.
          </Text>


      <Text> 
      </Text>
      </HStack> 
         

      <Box w={"100%"} my={"10px"}>
        <Box>
      <Checkbox pl={"20px"} onChange={()=>{
      if(termsAccept){
        setTermsAccept(0)
      }else{
        setTermsAccept(1);
      }
      }} fontSize={"large"} fontWeight={"bold"} >I Have Read All The Instructions And I Agree </Checkbox>
      </Box>
      <HStack w={"100%"} justifyContent={"center"}>
        {(termsAccept)? <Link to={'/quiz'}> <Button  colorScheme={"linkedin"}>Continue</Button> </Link>: <Link to={'/quiz'}> <Button isDisabled colorScheme={"linkedin"}>Continue</Button> </Link>} 
      </HStack>
      
      </Box>
    

       
    </HStack>
    </HStack>
  )
}

export default Instruction