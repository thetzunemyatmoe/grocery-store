import { Container, Flex, HStack, Link, Text, Button, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input, Select, FormControl, FormLabel, ModalFooter, useToast } from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useGroceryStore } from "../store/grocery";

const Navbar = () => {

  const groceryObj = {
    name: '',
    unit: '',
    quantity: 0,
    category: '',
    purchasedDate: '',
    expirationDate: ''
  }
  const [grocery, setGrocery] = useState(groceryObj);

  const handleNameChange = (e) => {
    setGrocery({ ...grocery, name: e.target.value })
  }

  const handleUnitChange = (e) => {
    setGrocery({...grocery, unit: e.target.value })
  }

  const handleQuantityChange = (e) => {
    setGrocery({...grocery, quantity: e.target.value })
  }

  const handleCategoryChange = (e) => {
    setGrocery({...grocery, category: e.target.value })
  }

  const handlePurchasedDateChange = (e) => {
    setGrocery({...grocery, purchasedDate: e.target.value })
  }

  const handleExpirationDateChange = (e) => {
    setGrocery({...grocery, expirationDate: e.target.value })
  }

  // Handles adding a grocery item.
  const handleAddGrocery = async () => {
    console.log(grocery);
    
    const { success, message } = await createGrocery(grocery);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      })
    }else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true
      })
    }
    onClose();
    setGrocery(groceryObj)
  }

  // Importing hooks for modal, toast, and grocery store functionality.
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { createGrocery } = useGroceryStore()


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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Grocery</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
          <VStack spacing={4} alignItems="flex-start"> 
            {/* Name */}
            <FormControl>
              <FormLabel>Name of the item</FormLabel>
                <Input 
          placeholder="Name of the item"
          value={grocery.name}
          onChange={handleNameChange}
         />
            </FormControl>

      <HStack spacing={4} alignItems="flex-start"> 
        {/* Quantity */}
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            placeholder="Amount"
            type="number"
            value={grocery.quantity}
            onChange={handleQuantityChange}
          />
        </FormControl>

        {/* Unit */}
        <FormControl>
          <FormLabel>Unit</FormLabel>
          <Select
            placeholder="Select unit"
            value={grocery.unit}
            onChange={handleUnitChange}
          >
            <option value="grams">Grams</option>
            <option value="kilograms">Kilograms</option>
            <option value="milliliters">Milliliters</option>
            <option value="liters">Liters</option>
            <option value="pieces">Pieces</option>
            <option value="packs">Packs</option>
            <option value="bottles">Bottles</option>
            <option value="cans">Cans</option>
            <option value="boxes">Boxes</option>
            <option value="others">Others</option>
          </Select>
        </FormControl>

        {/* Category */}
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            value={grocery.category}
            onChange={handleCategoryChange}
          >
            <option value="Dairy">Dairy</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Meat">Meat</option>
            <option value="Seafood">Seafood</option>
            <option value="Grains">Grains</option>
            <option value="Legumes">Legumes</option>
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Frozen Foods">Frozen Foods</option>
            <option value="Spices">Spices</option>
            <option value="Condiments">Condiments</option>
            <option value="Oils">Oils</option>
            <option value="Bakery">Bakery</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
      </HStack>

      {/* Purchased Date */}
      <FormControl>
        <FormLabel>Purchased Date</FormLabel>
        <Input
          placeholder="Purchased Date"
          type="date"
          value={grocery.purchasedDate}
          onChange={handlePurchasedDateChange}
        />
      </FormControl>

      {/* Expiration Date */}
      <FormControl>
        <FormLabel>Expiration Date</FormLabel>
        <Input
          placeholder="Expiration Date"
          type="date"
          value={grocery.expirationDate}
          onChange={handleExpirationDateChange}
        />
      </FormControl>

    
    </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={handleAddGrocery}>Add</Button>
            <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Navbar