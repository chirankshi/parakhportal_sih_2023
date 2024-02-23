import React from 'react'

import { useEffect, useState } from 'react'
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

const ForgotPassword = () => {
    const [email,setEmail]  = useState("");
  return (
   <HStack>
    <Text>Hello </Text>
   </HStack>
  )
}

export default ForgotPassword