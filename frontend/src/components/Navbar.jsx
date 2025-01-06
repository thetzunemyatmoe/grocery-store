import { Container, Flex, HStack, Link, Text, Button, useDisclosure } from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons";
import ManageGrocey from "./ManageGrocey";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  return (
    <Container maxWidth={"1140px"} px={4}>
      <Flex 
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
        >
        
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textAlign={"center"}
          textTransform={"uppercase"}
          margin={"20px"}
          >
            <Link to={'/'} style={{ textDecoration: 'none' }}>Logo</Link>
        </Text>
        <HStack>
          <Button>
            <PlusSquareIcon fontSize={30} onClick={onOpen}></PlusSquareIcon>
          </Button>
        </HStack>
      </Flex>

      <ManageGrocey onOpen={onOpen} isOpen={isOpen} onClose={onClose}></ManageGrocey>

    </Container>
  )
}

export default Navbar


