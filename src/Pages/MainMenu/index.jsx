import "../../assets/MainMenu.css"
import { HStack, IconButton, Input, InputGroup, InputLeftElement, Stack, Text,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Box, Select,Center } from '@chakra-ui/react';
import {AddIcon, MinusIcon, SearchIcon} from '@chakra-ui/icons';
import ProductImg from '../../assets/product.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Image,Button} from '@chakra-ui/react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {Table,  Thead,  Tbody,  Tfoot,  Tr,  Th,  Td,  TableCaption,  TableContainer,useDisclosure} from '@chakra-ui/react'
import { actions } from '../../store';

import {Step,StepDescription,StepIcon,StepIndicator,StepNumber,StepSeparator,StepStatus,StepTitle,Stepper,useSteps,
} from '@chakra-ui/react'

// gambar
import BaksoMercon from "../../assets/OutletMenu/BaksoMercon.png"
import Capcay from "../../assets/OutletMenu/Capcay.png"
import Churos from "../../assets/OutletMenu/Churos.png"
import MieGoreng from "../../assets/OutletMenu/MieGoreng.png"
import AyamGoreng from "../../assets/OutletMenu/AyamGoreng.png"
import BaksoKomplit from "../../assets/OutletMenu/BaksoKomplit.png"
import EmptyCart from "../../assets/EmptyCart.png"
import UcapanTerimakasih from "../../assets/UcapanTerimakasih.png"




// sessionLogin
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSessionAuth from '../../Auth/LoginSession';
import { Link, useNavigate, useParams } from 'react-router-dom'



const MainMenu = ()=>{
  const [products,setProducts] = useState(
    [
      {
        name:'kantin Gubeng',
        imgUrl: ''
      },
      {
        name:'kantin Tunjungan',
        imgUrl: ''
      },
      {
        name:'kantin Jemursari',
        imgUrl: ''
      },
      {
        name:'kantin Prapen',
        imgUrl: ''
      },
      {
        name:'kantin Panjang Jiwo',
        imgUrl: ''
      },
      {
        name:'kantin Keputih',
        imgUrl: ''
      },
      {
        name:'kantin Tambaksari',
        imgUrl: ''
      },
    ]
  )
  const url = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const [searchInput,setSearchInput] = useState('')
  
  const getTotalPayment = ()=>{
    let totalPrice = 0
    for (let item of cart) {
      totalPrice += (item.discountPrice * item.count)
    }
    return totalPrice
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
  console.log(modalPenilaian.modalPenilaianContent === 'rate')
  const  starIconSelected = [1,2,3,4,5]


  // Check sessionLogin
  const loginSession = useSelector((state)=>state.loginSession)
  useEffect(() => {
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
  }, [loginSession]);
  // }
  return(
    <>
      
      {
        (url.section === 'dashboard' || url.section === undefined) ?
          <div className="main-menu">
            <Text as='b' fontSize='22px'>Selamat Datang di</Text>
            <Text as='b' fontSize='22px' color='blue.500' marginBottom='20px'>Kedai Tangsi !</Text>

            <InputGroup backgroundColor='white'>
              <InputLeftElement children={ <SearchIcon/> } />
              <Input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='search' />
            </InputGroup>


            <Text color='blue.500'>Tenant</Text>
            <div style={{ display:'flex',justifyContent:'space-between',flexWrap:'wrap',width:'100%',paddingBottom:'70px',marginTop:'20px' }}>
              {products.map((product)=>
                product.name.toLowerCase().includes(searchInput.toLocaleLowerCase())?
                <Link to={`/MainMenu/OutletMenu/${product.name}`} style={{ marginBottom:'20px' }}>
                  <div src='' style={{ width:'105.28px',height:'171px',backgroundImage:`url(${ProductImg})`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:'20px' }} />    
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
              (item)=>
                <div style={{ display:'flex',backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'20px',boxShadow:'0px 0px 25px rgba(192, 192, 192, 0.2)' }}>
                  <Image
                    height='154px'
                    aspectRatio='1/1'
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={item.imgUrl}
                    alt='Caffe Latte'
                    borderRadius='20px'
                    alignItems='flex-start'
                    marginRight='20px'
                  />
    
                  <div style={{ display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
                      <Text fontSize='16px' as='b' >{item.name}</Text>
    
                      <Text fontSize='14px'>Rp.{item.discountPrice * item.count}</Text>
                      <InputGroup backgroundColor='white' marginBottom='10px'>
                        <InputLeftElement children={ <CreateIcon sx={{ width:'14px',color:'gray' }}/> } />
                        <Input onChange={
                          (e)=> dispatch(actions.writeNote({ id:item.id,note:e.target.value }))
                          } 
                          variant='flushed' fontSize='14px' value={item.note}  placeholder='search' />
                      </InputGroup>
    
                      <HStack justifyContent='space-between'>
                        <HStack>
                          <IconButton onClick={()=>dispatch(actions.editCount({id:item.id,count:item.count - 1}))} size='xs' colorScheme='blue' variant='outline' borderRadius='50%' icon={<MinusIcon />} />
                          <Text>{item.count}</Text>
                          <IconButton onClick={()=>dispatch(actions.editCount({id:item.id,count:item.count+1}))} size='xs' colorScheme='blue' variant='solid' borderRadius='50%' icon={<AddIcon/>} />
                        </HStack>
                        <IconButton onClick={()=>dispatch(actions.removeCart({id:item.id}))} colorScheme='red' variant='ghost'icon={<DeleteIcon/>} />
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
                      <Td isNumeric><Input  variant='flushed' textAlign='center' defaultValue='Ara' /></Td>
                    </Tr>
                    <Tr>
                      <Tr>
                        
                        <Td isNumeric>
                          <Select size='sm' width='200%'>
                            <option value='dineIn' selected>Dine In</option>
                            <option value='takeAway'>Take Away</option>
                          </Select>
                        </Td>
                      </Tr>
                    </Tr>
                    <Tr>
                      <Td>Nomor Meja</Td>
                      <Td isNumeric>
                        <InputGroup>
                          <InputLeftElement children={ <CreateIcon sx={{ color:'lightblue' }}/> } />
                          <Input type='number' variant='flushed' textAlign='center' defaultValue='26' />
                        </InputGroup>
                        
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Kantin</Td>
                      <Td isNumeric>
                        <Input  variant='flushed' textAlign='center' defaultValue='Kedai 35' />
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
                      <Td isNumeric>Rp.{getTotalPayment()}</Td>
                    </Tr>
                    
                  </Table>
                </div>
                <Button colorScheme='blue' marginBottom='80px'>Pesan</Button>
                </>

              :
              <div style={{ height:'calc(100vh - 100px)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                <img src={EmptyCart} style={{ width:'186px',objectFit:'contain' }}/>
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
                <Step key={index} width='100%'>
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
                            <StarIcon onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                  ...modalPenilaian,
                                  foodRate:index
                                }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon onClick={()=>
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
                            <StarIcon onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                serviceRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon onClick={()=>
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
                        <img src={UcapanTerimakasih} alt="" style={{ width:'100px',objectFit:'contain' }} />
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
              (item)=>
              <div style={{ backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'20px',boxShadow:'0px 0px 25px rgba(192, 192, 192, 0.2)' }}>

                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px' }}>
                  <HStack>
                    <ShoppingBagIcon sx={{ color:'#6597BF' }}/>
                    <Text as='b'>01 November 2022</Text>
                  </HStack>
                  
                  <Button colorScheme='blue' variant='ghost'>Selesai</Button>
                </div>

                <div style={{ display:'flex',marginBottom:'20px' }}>
                  <Image
                    height='71px'
                    aspectRatio='1/1'
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={MieGoreng}
                    alt='Caffe Latte'
                    borderRadius='20px'
                    alignItems='flex-start'
                    marginRight='20px'
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

                  <Link to='/MainMenu/DetailOrder/idOrder'>
                    <Button   colorScheme='blue' variant='outline'>Detail</Button>
                  </Link>
                  
                </HStack>
              </div>
            )}

          </div>
        :null
        
      }
      
      


      <div className='bottom-navigation-bar'>
        <Link to='/MainMenu/dashboard' className='link'>
          <HomeOutlinedIcon sx={{ color: (url.section === 'dashboard' || url.section === undefined)?'#6898C0':'#B7B7B7' }} />
        </Link>
        <Link to='/MainMenu/order' className='link'>
          <ContentPasteOutlinedIcon sx={{ color:(url.section === 'order')?'#6898C0':'#B7B7B7' }} />
        </Link>
        <Link to='/MainMenu/status-pesanan' className='link'>
          <RestaurantOutlinedIcon  sx={{ color:(url.section === 'status-pesanan')?'#6898C0':'#B7B7B7' }} />
        </Link>
        <Link to='/MainMenu/riwayat' className='link'>
          <HistoryOutlinedIcon  sx={{ color:(url.section === 'riwayat')?'#6898C0':'#B7B7B7' }} />
        </Link>
        
      </div>
    </>
    
  )
}
export default MainMenu;