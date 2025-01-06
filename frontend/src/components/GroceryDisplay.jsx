import PropTypes from "prop-types";
import { Box, HStack, IconButton,  Tag, Text, useDisclosure, useToast} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useGroceryStore } from "../store/grocery";
import ManageGrocey from "./ManageGrocey";

const GroceryDisplay = ({ grocery }) => {
  // Importing hooks for modal, toast, and grocery store functionality.
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteGrocery } = useGroceryStore()
  const toast = useToast();
  
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
      <ManageGrocey onOpen={onOpen} isOpen={isOpen} onClose={onClose} currentGroceryObj={grocery}></ManageGrocey>
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
