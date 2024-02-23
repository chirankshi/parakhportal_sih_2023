import React, { useState } from 'react'
import {HStack,Text,Textarea,Button,Box} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: "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", // This is the default and can be omitted
    dangerouslyAllowBrowser: true 
  });
  
const AiModelQuestions = () => {
const [text,setText] = useState("");
const [questions,setQuestions] = useState(null);
const [loader,setLoader] = useState(false);

const setQuiz = ()=>{
    localStorage.setItem("quizai", questions)
}
    
const genrateQuestion = async()=>{
    setLoader(true)
    const query = text+"genrate 5 mcqs using that huge text mcqs have 4 options and should have answer with mcqs  and defficulty level of question like easy, mediem , hard and type of question like analitical etc and should have id attribue which start from 0 . should give answer in json format output should be like {questions:[{id:0,question:what ... ,type:fact-based,difficulty:easy,options:[option1,option2,option2,option4],answer:option1}]}   "
    console.log("I am called.")
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: query }],
        model: 'gpt-3.5-turbo',
      });

     const data = chatCompletion.choices[0]?.message.content
     const jsonData = JSON.parse(chatCompletion.choices[0]?.message.content);
    console.log(jsonData)
     // Extract and set the questions array to state
     setQuestions(jsonData.questions);
     setLoader(false);
    
}
  return (

    <>
    <HStack  justifyContent={"center"}    >
        <Text color={"#119af0"} fontWeight={"bold"} fontSize={"x-large"}>AI Based Questions</Text>

    </HStack>
    
    <HStack justifyContent={"center"}>
    <HStack w={"90%"} >
        <Textarea  value={text} onChange={(e)=>{
            setText(e.target.value)
        }} h={"400px"}  border={"2px solid black "}  placeholder='Enter Your Text Here For Questions :  ' >

        </Textarea>

      
    </HStack>
    </HStack>
    <HStack justifyContent={"center"} mt={"10px"}>
    <Button colorScheme={"linkedin"} onClick={genrateQuestion}>Genrate Questions</Button>
    </HStack>
    <hr />

   {loader&&<Box >
        <Text color={"blue.500"} textAlign={"center"} fontSize={"x-large"} >AI Is Genrating Questions Please Wait A Minute .</Text>
        <Text color={"blue.500"} textAlign={"center"} fontSize={"x-large"}>It Can Take 3-5 Minutes.</Text>
    <HStack justifyContent={"center"} h={"400px"}>
       
    <Spinner h={"200px"} w={"200px"} color='blue.500' />

    </HStack>
    </Box>} 
    {questions && questions.map((question,index)=>{
       return  <Box key={question.id} >
   
       <Text px={"10px"} fontWeight={"semibold"} >{index+1}. {question.question}</Text>
       <HStack px={"30px"} justifyContent={"space-between"}>
           <Text fontWeight={"semibold"} color={"red"}>Type : {question.type}</Text>
       <Text fontWeight={"semibold"} color={"red"}>Difficulty : {question.difficulty}</Text>
       </HStack>
       <Text px={"30px"} m={"2px"} >1. {question.options[0]} </Text>
       <Text px={"30px"} m={"2px"} >2. {question.options[1]} </Text>
       <Text px={"30px"} m={"2px"} >3. {question.options[2]} </Text>
       <Text px={"30px"} m={"2px"} >4. {question.options[3]} </Text>
       <Text px={"30px"} color={"#2cff21"} fontWeight={"semibold"}  >Answer : {question.answer}</Text>
       <hr />
     
   </Box>
    })}


   {questions&&<HStack justifyContent={"center"}>
        <Button onClick={setQuiz} colorScheme={"linkedin"}>Create Quiz</Button>
    </HStack>
   } 


    
    </>


  )
}

export default AiModelQuestions