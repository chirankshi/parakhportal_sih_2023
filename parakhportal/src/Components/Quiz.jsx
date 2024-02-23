import React from 'react'
import {HStack,Text,Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Quiz = () => {
  return (
   <>
   <HStack w={"100%"} h={"70vh"} justifyContent={"center"}>
    
    <HStack w={"400px"} h={"250px"} shadow={"dark-lg"}  borderRadius={"5%"}  >

    <HStack h={"full"} w={"full"} alignItems={"center"} flexDir={"column"} justifyContent={"flex-start"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}  mt={"20px"} >PRE-ASSESSMENT TEST </Text>
        <HStack w={"full"} alignItems={"flex-start"} flexDir={"column"} justifyContent={"flex-start"} pl={"20px"} >
        <Text>Questions : 50</Text>
        <Text>Time : 100 Minutes</Text>
        <Text>Correct Answer : +1</Text>
        
        <HStack w={"full"} justifyContent={"center"} mt={"20px"}>
      <Link to={'/courseselection'}><Button colorScheme={"linkedin"} >Start Assesment</Button> </Link> </HStack> 
        </HStack>
    </HStack>

    </HStack>

   
   </HStack>
   </>
  )
}

export default Quiz