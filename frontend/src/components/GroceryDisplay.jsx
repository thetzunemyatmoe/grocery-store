import PropTypes from "prop-types";
import { Box, Button, FormControl, FormLabel, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tag, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useGroceryStore } from "../store/grocery";
import { useState } from "react";

const GroceryDisplay = ({ grocery }) => {
  const colorCategory = {
    "Dairy": "blue",
    "Vegetables": "green",
    "Fruits": "pink",
    "Meat": "red",
    "Seafood": "teal",
    "Grains": "yellow",
    "Legumes": "orange",
    "Snacks": "purple",
    "Beverages": "cyan",
    "Frozen Foods": "gray",
    "Spices": "amber",
    "Condiments": "lime",
    "Oils": "brown",
    "Bakery": "beige",
    "Other": "black",
  };
  const { updateGrocery, deleteGrocery } = useGroceryStore()
  
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure()
  
  const [updatedGrocery, setUpdatedGrocery] = useState(grocery)
  const handleUpdatedGrocery = async(grocery) => {
    await updateGrocery(grocery)

    onClose();
  }
  const handleDeleteGrocery = async(id) => {
    const {success, message} = await deleteGrocery(id)
    if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
  }
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg="gray.100"
      width="200px"
      height="200px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative" // Make the box a relative container
    >
      {/* Category Tag */}
      <Tag
        size="sm"
        colorScheme={colorCategory[grocery.category]} // Choose the color scheme
        variant="solid" // Set the tag to solid color
        position="absolute"
        top="10px"
        right="10px"
        zIndex="1"
      >
        {grocery.category || "Other"}
      </Tag>

      {/* Grocery Details */}
      <Text color={"blackAlpha.900"} fontWeight={"bold"} fontSize={20} paddingTop={5}>
        {grocery.name}
      </Text>
      <Text color={"blackAlpha.900"}>
        {grocery.quantity} {grocery.unit}
      </Text>

      <Text color={"blackAlpha.700"} fontSize={14}>
        Purchased: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).  format(new Date(grocery.purchasedDate))}
      </Text>
      <Text color={"blackAlpha.700"} fontSize={14}>
        Expires: {grocery.expirationDate ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(grocery.expirationDate))
      : "N/A"}
      </Text>

      <HStack spacing={5} padding={3}>
        <IconButton icon={<EditIcon/>} colorScheme="blue" onClick={onOpen}/>
        <IconButton icon={<DeleteIcon/>} colorScheme="red" onClick={() => handleDeleteGrocery(grocery._id)}/>
        <IconButton icon={<CheckIcon/>} colorScheme="green" onClick={() => handleDeleteGrocery(grocery._id)}/>
      </HStack>

      {/* Modal for editing grocery */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              Updating grocery
            </ModalHeader>
            <ModalCloseButton/>

            <ModalBody>
              <VStack spacing={4} alignItems="flex-start">
                {/* Name */}
                <FormControl>
                  <FormLabel>Name of the item</FormLabel>
                  <Input name='name' value={updatedGrocery.name} onChange={(e) => setUpdatedGrocery({...updatedGrocery, name: e.target.value})}/>
                </FormControl>

                <HStack spacing={4} alignItems="flex-start">
                  {/* Quantity */}
                  <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <Input type="number" name="quantity" value={updatedGrocery.quantity} onChange={(e) => setUpdatedGrocery({...updatedGrocery, quantity: e.target.value})}/>
                  </FormControl>

                  {/* Unit */}
                  <FormControl>
                    <FormLabel>Unit</FormLabel>
                    <Select name="unit" value={updatedGrocery.unit} onChange={(e) => setUpdatedGrocery({...updatedGrocery, unit: e.target.value})}>
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
                      name="category"
                      value={updatedGrocery.category}
                      onChange={(e) => setUpdatedGrocery({...updatedGrocery, category: e.target.value})}
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

                <FormControl>
                  <FormLabel>
                    Purchased Date
                  </FormLabel>

                  <Input 
                    type="date"
                    value={updatedGrocery.purchasedDate ? new Date(updatedGrocery.purchasedDate).toISOString().split("T")[0] : ""}
                    onChange={(e) => setUpdatedGrocery({...updatedGrocery, purchasedDate: e.target.value })}
                  />
                </FormControl>


                <FormControl>
                  <FormLabel>
                    Purchased Date
                  </FormLabel>

                  <Input
                    type="date"
                    value={updatedGrocery.expirationDate ? new Date(updatedGrocery.expirationDate).toISOString().split("T")[0] : ""}
                    onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, expirationDate: e.target.value })}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant={"ghost"} onClick={()=>handleUpdatedGrocery(updatedGrocery)}>Update</Button>
              <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

// Props Validation
GroceryDisplay.propTypes = {
  grocery: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, // Name must be a string and is required
    quantity: PropTypes.number.isRequired, // Quantity must be a number and is required
    category: PropTypes.string, // Category is a string, but it's optional
    unit: PropTypes.string.isRequired,
    expirationDate: PropTypes.Date,
    purchasedDate: PropTypes.Date
  }).isRequired, // Entire grocery object is required
};

export default GroceryDisplay;
