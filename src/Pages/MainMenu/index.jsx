"use client"
import "/public/assets/MainMenu.css"
import { HStack, IconButton, Input, InputGroup, InputLeftElement, Stack, Text,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Box, Select,Center, useToast } from '@chakra-ui/react';
import {AddIcon, MinusIcon, SearchIcon} from '@chakra-ui/icons';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Button} from '@chakra-ui/react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {Table,  Thead,  Tbody,  Tfoot,  Tr,  Th,  Td,  TableCaption,  TableContainer,useDisclosure} from '@chakra-ui/react'
import { actions } from "../../store"; 
import LogoutIcon from '@mui/icons-material/Logout';

import {Step,StepDescription,StepIcon,StepIndicator,StepNumber,StepSeparator,StepStatus,StepTitle,Stepper,useSteps,
} from '@chakra-ui/react'



// sessionLogin
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSessionAuth from "../../Auth/LoginSession";

// carousel
import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import LoadingScreen from "../../Components/LoadingScreen";
import { Link, useNavigate, useParams } from "react-router-dom";


const MainMenu = ()=>{
  const [isLoading,setIsLoading] = useState(true)
  const [products,setProducts] = useState( [] )
  const url = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const [searchInput,setSearchInput] =  useState('')
  const [nomorMeja,setNomorMeja] = useState('')
  
  // const getTotalPayment = ()=>{
  //   let totalPrice = 0
  //   for (let item of cart) {
  //     totalPrice += (item.price_after_discount * item.count)
  //   }
  //   return totalPrice
  // }
  const getOutletName = ()=> {
    let outletsName = []
    for(let item of cart){
      outletsName.push(item.id_outlet)
    }
    return JSON.stringify(outletsName)
  }

  const steps = [
    { title: 'Pesanan sedang Diantar', description: 'Atas : nama Ara - Meja no 26', time:'11.05' },
    { title: 'Pesanan sedang Dimasak', description: 'Atas : nama Ara - Meja no 26', time:'10.05' },
    { title: 'Pesanan Dikonfirmasi', description: 'Atas : nama Ara - Meja no 26', time:'09.05' },
    { title: 'Pembayaran Berhasil', description: 'Melalui QR Code, Atas : nama Ara - Meja no 26', time:'08.05' },
    { title: 'Pembayaran Menunggu Konfirmasi', description: 'Atas : nama Ara - Meja no 26', time:'07.05' },
  ]
  const [stepActive,setStepActive] = useState(5);
  const { activeStep } = useSteps({
    index: stepActive,
    count: steps.length,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalPenilaian,setModalPenilaian] = useState({
    foodRate : 3,
    serviceRate : 2,
    modalPenilaianContent:'rate'
  })
  const  starIconSelected = [1,2,3,4,5]
  const loginSession = useSelector((state)=>state.loginSession)
  const toast = useToast(
    {
      containerStyle: {
        width: '380px',
      },
    }
  )
  useEffect(() => {
    // Check sessionLogin
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
    else{

      // fetch data menu
      const resDataMenu = fetch("http://127.0.0.1:8000/api/tenant/index",{
        method:'GET',
        headers:{
          Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
        }
      })
        .then( response=> response.json() ,err=>console.log('error'))
          .then(response=> setProducts(response.data.tenant) ,err=>console.log('error')).then(()=>setIsLoading(false))

      // fetch cart
      const resCart = fetch('http://127.0.0.1:8000/api/cart/index',{
        method:'GET',
        headers:{
          Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
        }
      })
      .then(
        response => {
          if(response.status === 200){
            response.json() ,err=>console.log('error')
              .then(response => dispatch(actions.setCartValue({newDataCart:response.data})))
          }
          else{
            console.log(response.status)
            dispatch(actions.setCartValue({newDataCart:[]}))
          }
        }
      )
      
    }
    
    
  }, [loginSession]);


  
  return(
    <>
      {
        isLoading ? <LoadingScreen/> : null
      }
      
      {
        (url.section === 'dashboard' || url.section === undefined) ?
          <div className="main-menu">
            <HStack justifyContent='space-between' alignItems='center'>
              <Text as='b' fontSize='22px'>Selamat Datang di</Text>
                <LogoutIcon onClick={()=>{setIsLoading(true);dispatch(actions.logout())}} sx={{ cursor:'pointer',fontWeight:'bold',color:'rgb(201, 68, 86)' }}/>
            </HStack>
            
            <Text as='b' fontSize='22px' color='blue.500' marginBottom='20px'>Kedai Tangsi !</Text>

            <InputGroup backgroundColor='white' marginBottom='20px'>
              <InputLeftElement children={ <SearchIcon/> } />
              <Input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='search' />
            </InputGroup>

            <Swiper spaceBetween={30} loop={true} pagination={{clickable: true}}  modules={[Pagination]} className="mySwiper" >
              <SwiperSlide><img style={{ height:'168px',width:'100%',display:'block',objectFit:'cover',borderRadius:'10px' }} src='/public/assets/Carousel1.png' alt=""  /></SwiperSlide>
              <SwiperSlide><img style={{ height:'168px',width:'100%',display:'block',objectFit:'cover',borderRadius:'10px' }} src='/public/assets/BaksoKomplit.png' alt=""  /></SwiperSlide>
              <SwiperSlide><img style={{ height:'168px',width:'100%',display:'block',objectFit:'cover',borderRadius:'10px' }} src='/public/assets/MieGoreng.png' alt=""  /></SwiperSlide>
            </Swiper>


            <Text color='blue.500' as='b' marginTop='20px'>Tenant</Text>
            <div style={{ display:'flex',justifyContent:'space-around',flexWrap:'wrap',width:'100%',paddingBottom:'70px',marginTop:'10px' }}>
              {products.map((product)=>
                product.name.toLowerCase().includes(searchInput.toLocaleLowerCase())?
                  <Link to={`/MainMenu/OutletMenu/${product.id}`} style={{ marginBottom:'20px' }} key={product.id}>
                    <img src="/public/assets/BaksoMercon.png" alt="" style={{ width:'105.28px',height:'171px',objectFit:'cover',borderRadius:'20px' }} />
                    <Stack maxWidth='105.28px'><Text as='b'>{product.name}</Text></Stack>
                  </Link>
                :null
              )}
            </div>    
          </div>
        : (url.section === 'order') ?

          <div className="main-menu">
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Keranjang Order</Text>   
            </HStack>
            

            {/* cart Items */}
            {cart.map(
              (item,index)=>
                <div key={item.id_product} style={{ display:'flex',backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'20px',boxShadow:'0px 0px 25px rgba(192, 192, 192, 0.2)' }}>
                  <img
                    src='/public/assets/AyamGoreng.png'
                    alt=''
                    style={{ 
                      width:'154px',
                      height:'154px',
                      aspectRatio:'1/1',
                      objectFit:'cover',
                      borderRadius:'20px',
                      alignItems:'flex-start',
                      marginRight:'20px'
                     }}
                    
                  />
    
                  <div style={{ display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
                      <Text fontSize='16px' as='b' >{item.name}</Text>
    
                      <Text fontSize='14px'>Rp. {item.total}</Text>
                      <InputGroup backgroundColor='white' marginBottom='10px'>
                        <InputLeftElement children={ <CreateIcon sx={{ width:'14px',color:'gray' }}/> } />
                        <Input 
                          // onChange={
                          //   (e)=> dispatch(actions.writeNote({ id_product:item.id_product,id_outlet:item.id_outlet,note:e.target.value }))
                          // } 
                          variant='flushed' fontSize='14px' value={item.note}  placeholder='search' />
                      </InputGroup>
    
                      <HStack justifyContent='space-between'>
                        <HStack>
                          <IconButton size='xs' colorScheme='blue' variant='outline' borderRadius='50%' icon={<MinusIcon />} aria-label={""}
                            // onClick={() => { dispatch(actions.editCount({ id_product: item.id_product, id_outlet: item.id_outlet, count: item.count - 1 })); } } 
                          />
                          {/* <Text>{item.count}</Text> */}
                          <Text>1</Text>
                          <IconButton size='xs' colorScheme='blue' variant='solid' borderRadius='50%' icon={<AddIcon/>}  aria-label={""}
                            // onClick={() => {dispatch(actions.editCount({id_product:item.id_product,id_outlet:item.id_outlet,count:item.count+1}))}} 
                          />
                        </HStack>
                        <IconButton colorScheme='red' variant='ghost'icon={<DeleteIcon/>}  aria-label={""}
                          onClick={() => {dispatch(actions.removeCart({id_product:item.id_product,id_outlet:item.id_outlet}))}}
                        />
                      </HStack>
    
                    
                  </div>
                </div>
                
            )}
            
            {
              (cart.length >0)?
            
              <>
                <div style={{ borderRadius:'20px',backgroundColor:'rgba(159, 188, 213, 0.19)',width:'100%',padding:'16px',marginBottom:'20px' }}>
                  
                  <Table variant='simple' width='100%'>
                    <Tr>
                      <Td>Nama Pemesan</Td>
                      <Td isNumeric>{JSON.parse(loginSession).name}</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <Select size='sm'>
                          <option value='dineIn' selected>Dine In</option>
                          <option value='takeAway'>Take Away</option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Nomor Meja</Td>
                      <Td isNumeric><Input value={nomorMeja} onChange={(e)=>setNomorMeja(e.target.value)} placeholder="Nomor Meja"/></Td>
                    </Tr>
                    <Tr>
                      <Td>Kantin</Td>
                      <Td isNumeric>
                        {getOutletName()}
                      </Td>
                    </Tr>
                  </Table>
                </div>

                <div style={{ borderRadius:'20px',backgroundColor:'rgba(159, 188, 213, 0.19)',width:'100%',padding:'16px',marginBottom:'20px' }}>
                  <Table variant='simple'>
                    <Tr>
                      <Td>Total Makanan</Td>
                      <Td isNumeric><Text>{cart.length}</Text></Td>
                    </Tr>
                    <Tr>
                      <Td>Metode Pembayaran</Td>
                      <Td isNumeric>
                        <Button colorScheme='red' variant='outline'>Link Aja</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Total Pembayaran</Td>
                      {/* <Td isNumeric>Rp.{getTotalPayment()}</Td> */}
                      <Td isNumeric>total payment</Td>
                    </Tr>
                    
                  </Table>
                </div>
                <Button onClick={()=>{
                  if(nomorMeja === ''){
                    toast({
                      title: 'Error',
                      description: "Harap mengisi nomor meja~",
                      status: 'error',
                      duration: 2500,
                      isClosable: true,
                      variant:'subtle',
                      position: 'top',
                    })
                  }
                }} colorScheme='blue' marginBottom='80px'>Pesan</Button>
                </>

              :
              <div style={{ height:'calc(100vh - 100px)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                <img src='/public/assets/EmptyCart.png' alt="EmptyCart" style={{ width:'186px',height:'100px',objectFit:'contain' }} />
                <Text textAlign='center'  fontSize='24px' as='b' marginTop='20px' marginBottom='20px'>Ups Kamu belum menambah menu</Text>
                <Text textAlign='center' marginBottom='20px'>Tambah makanan dulu dong</Text>
              </div>
            }
          </div>


        // Status Pesanan
        : (url.section === 'status-pesanan')?
        
          <div className="main-menu">
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Status Pesanan</Text>   
            </HStack>

            <Stack>
              <Text as='b'>Status Pemesanan</Text>
            </Stack>
            <Stepper index={activeStep} orientation='vertical' gap='0' marginTop='20px' marginBottom='40px'  width='100%' minHeight='400px'>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink='0'>
                    <StepTitle>
                        <HStack>
                          <Text fontSize='12px'>{step.title}</Text>
                          <Text fontSize='12px' color='#7C7979'> ({step.time})</Text>
                        </HStack>
                        
                    </StepTitle>
                    <StepDescription><Text fontSize='10px'>{step.description}</Text></StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            {
              stepActive === steps.length ?
              <>
                <Button onClick={onOpen} colorScheme="blue">Beri Penilaian</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />

                  {modalPenilaian.modalPenilaianContent === 'rate' ? 
                    <ModalContent width='414px'>
                      <ModalHeader>Beri Penilaian</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>

                        <Text fontSize='14px' color='#707070'>Bagaimana Masakan Kami?</Text>

                        <HStack>
                          {starIconSelected.map(index=>
                            index <= modalPenilaian.foodRate ?
                            <StarIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                  ...modalPenilaian,
                                  foodRate:index
                                }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                foodRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                          )}
                        </HStack>

                        <hr style={{ marginBottom:'20px',marginTop:'20px' }}/>
                        <Text fontSize='14px' color='#707070'>Bagaimana Pelayanan Kami?</Text>

                        <HStack>
                          {starIconSelected.map(index=>
                            index <= modalPenilaian.serviceRate ?
                            <StarIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                serviceRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                serviceRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                          )}
                        </HStack>

                      </ModalBody>
                      <ModalFooter width='100%'>
                        <Center>
                          <Button onClick={ ()=> {
                            setModalPenilaian((modalPenilaian) => ({
                              ...modalPenilaian,
                              modalPenilaianContent:'ucapan terimakasih'
                            }))
                          } } colorScheme='blue'>Kirim Penilaian</Button>
                        </Center>
                      </ModalFooter>
                    </ModalContent>

                    :
                    <ModalContent width='414px' height='300px'>
                      <ModalCloseButton />
                      <ModalBody display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
                        <img src='/public/assets/UcapanTerimakasih'  alt="" style={{ width:'100px',height:'100px',objectFit:'contain' }} />
                        <Text fontSize='22px' as='b'>Terimakasih</Text>
                        <Text>sudah memberikan penilaian</Text>
                      </ModalBody>
                    </ModalContent>
                  }
                  

                  
                </Modal>
              </>
              :null
            }
            
          </div>




        // Riwayat
        : (url.section === 'riwayat') ?

          <div className="main-menu" style={{ paddingBottom:'70px' }}>
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Riwayat</Text>   
            </HStack>
            
            {products.map(
              (item,index)=>
              <div key={index} style={{ backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'20px',boxShadow:'0px 0px 25px rgba(192, 192, 192, 0.2)' }}>

                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px' }}>
                  <HStack>
                    <ShoppingBagIcon sx={{ color:'#6597BF' }}/>
                    <Text as='b'>01 November 2022</Text>
                  </HStack>
                  
                  <Button colorScheme='blue' variant='ghost'>Selesai</Button>
                </div>

                <div style={{ display:'flex',marginBottom:'20px' }}>
                  <img
                    src='/public/assets/MieGoreng.png'
                    alt='Caffe Latte'

                    style={{ 
                      width:'71px',
                      height:'71px',
                      aspectRatio:'1/1',
                      objectFit:'cover',
                      borderRadius:'20px',
                      alignItems:'flex-start',
                      marginRight:'20px'
                     }}
                    
                  />
                  <div >
                      <Text fontSize='16px' as='b'>Kantin 35</Text>
                      <Text>1 x Rp.15000</Text>
                      <Text color='#7C7979' fontSize='10px'>dan 3 item lainya</Text>
                  </div>
                </div>

                <HStack justifyContent='space-between'>
                  <div>
                    <Text>Total Belanja : </Text>
                    <Text as='b'>Rp.100000</Text>
                  </div>

                  <Link to='/DetailOrder' onClick={()=>setIsLoading(true)}>
                    <Button   colorScheme='blue' variant='outline'>Detail</Button>
                  </Link>
                  
                </HStack>
              </div>
            )}

          </div>
        :null
        
      }
      
      


      <div className='bottom-navigation-bar'>
          <Link to='/MainMenu/dashboard' className="link" >
            <HomeOutlinedIcon sx={{ color: (url.section === 'dashboard' || url.section === undefined)?'#6898C0':'#B7B7B7'   }} />
          </Link>
          <Link to='/MainMenu/order' className="link" >
            <ContentPasteOutlinedIcon sx={{ color:(url.section === 'order')?'#6898C0':'#B7B7B7' }} />
          </Link>
        
          <Link to='/MainMenu/riwayat' className="link" >
            <HistoryOutlinedIcon  sx={{ color:(url.section === 'riwayat')?'#6898C0':'#B7B7B7' }} />
          </Link>
      </div>
    </>
    
  )
}
export default MainMenu;