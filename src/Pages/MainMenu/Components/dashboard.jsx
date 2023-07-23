import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// carousel
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import LoadingScreen from "../../../Components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const [isLoadingPage, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const loginSession = useSelector((state) => state.loginSession);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const port = useSelector((state) => state.port);
  const getData = async () => {
    await fetch(`${apiUrl}/api/tenant/index`, {
      method: "GET",
      headers: {
        Authorization: `${JSON.parse(loginSession).token.token_type} ${
          JSON.parse(loginSession).token.access_token
        }`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "POST,GET",
      },
      credentials: "include",
    })
      .then(
        (response) => response.json(),
        (err) => {
          console.log("error");
          setLoading(false);
        }
      )
      .then(
        (response) => {
          setProducts(response.data.tenant);
          console.log("succes fetch data");
          setLoading(false);
        },
        (err) => {
          console.log("error");
          setLoading(false);
        }
      );
  };
  useEffect(() => {
    // setTimeout(getData, 10000);
    getData();
  }, []);
  return (
    <>
      {isLoadingPage ? <LoadingScreen /> : null}
      <div className="main-menu">
        <HStack justifyContent="space-between" alignItems="center">
          <Text as="b" fontSize="22px">
            Selamat Datang di {isLoadingPage}
          </Text>
          <LogoutIcon
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "rgb(201, 68, 86)",
            }}
            onClick={onOpen}
          />
        </HStack>

        <Text as="b" fontSize="22px" color="blue.500" marginBottom="20px">
          Reztopia POS
        </Text>

        <InputGroup backgroundColor="white" marginBottom="20px">
          <InputLeftElement children={<SearchIcon />} />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="search"
          />
        </InputGroup>

        <Swiper
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          autoplay={{
            delay: 3000,
          }}
          n
        >
          <SwiperSlide>
            <img
              style={{
                display: "block",
                borderRadius: "10px",
              }}
              src="/public/assets/carousel-1.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{
                display: "block",
                borderRadius: "10px",
              }}
              src="/public/assets/carousel-2.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{
                display: "block",
                borderRadius: "10px",
              }}
              src="/public/assets/carousel-3.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>

        <Text color="blue.500" as="b" marginTop="20px">
          Tenant
        </Text>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            paddingBottom: "70px",
            marginTop: "10px",
            justifyContent: "center",
          }}
        >
          {products.map((product) =>
            product.name
              .toLowerCase()
              .includes(searchInput.toLocaleLowerCase()) ? (
              <Link
                to={`/MainMenu/OutletMenu/${product.id}`}
                style={{
                  width: "150px",
                  marginBottom: "30px",
                  marginRight: "20px",
                }}
                key={product.id}
              >
                <img
                  src={product.image.replace("localhost", port)}
                  alt=""
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
                <Stack maxWidth="161px">
                  <Text as="b">{product.name}</Text>
                </Stack>
              </Link>
            ) : null
          )}
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <Text>Apakah anda yakin akan logout ? </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  dispatch(actions.logout());
                  navigate(0);
                }}
              >
                Logout
              </Button>
              <Button variant="ghost" onClick={onClose}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
