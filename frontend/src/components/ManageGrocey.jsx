import { useState } from "react";
import { useGroceryStore } from "../store/grocery";
import {
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Select,
  FormControl,
  FormLabel,
  ModalFooter,
  useToast
} from "@chakra-ui/react";

const ManageGrocey = ({ isOpen, onClose, currentGroceryObj }) => { 

  const newGroceryObj = {
    name: '',
    unit: '',
    quantity: 0,
    category: '',
    purchasedDate: '',
    expirationDate: ''
  };
  const [grocery, setGrocery] = useState(currentGroceryObj || newGroceryObj);
  const toast = useToast();
  const { createGrocery, updateGrocery } = useGroceryStore();

  const handleNameChange = (e) => setGrocery({ ...grocery, name: e.target.value });
  const handleUnitChange = (e) => setGrocery({ ...grocery, unit: e.target.value });
  const handleQuantityChange = (e) => setGrocery({ ...grocery, quantity: e.target.value });
  const handleCategoryChange = (e) => setGrocery({ ...grocery, category: e.target.value });
  const handlePurchasedDateChange = (e) => setGrocery({ ...grocery, purchasedDate: e.target.value });
  const handleExpirationDateChange = (e) => setGrocery({ ...grocery, expirationDate: e.target.value });

  const handleAddGrocery = async () => {
    const { success, message } = await createGrocery(grocery);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true
      });
    }
    onClose();
    setGrocery(newGroceryObj);
  };

  const handleUpdatedGrocery = async(grocery) => {
    await updateGrocery(grocery)
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Grocery</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} alignItems="flex-start">
            <FormControl>
              <FormLabel>Name of the item</FormLabel>
              <Input name='name' placeholder="Name of the item" value={grocery.name} onChange={handleNameChange} />
            </FormControl>

            <HStack spacing={4} alignItems="flex-start">
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  name="quantity"
                  placeholder="Amount"
                  type="number"
                  value={grocery.quantity}
                  onChange={handleQuantityChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Unit</FormLabel>
                <Select
                  name="unit"
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

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
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

            <FormControl>
              <FormLabel>Purchased Date</FormLabel>
              <Input
                name="purchasedDate"
                placeholder="Purchased Date"
                type="date"
                value={grocery.purchasedDate}
                onChange={handlePurchasedDateChange}
              />
            </FormControl>

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

          {currentGroceryObj ? <Button variant={"ghost"} onClick={()=>handleUpdatedGrocery(grocery)}>Update</Button> : <Button variant={"ghost"} onClick={handleAddGrocery}>Add</Button>}
          
          <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ManageGrocey;
