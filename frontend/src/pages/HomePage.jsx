import { Button, Container, HStack, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useGroceryStore } from "../store/grocery"
import { useEffect } from "react"
import GroceryDisplay from "../components/GroceryDisplay";


const HomePage = () => {
  const {fetchGrocery, groceries} = useGroceryStore();
  useEffect(() => {
    fetchGrocery();
  }, [fetchGrocery]);

  console.log(groceries)

  return (
    <Container>
      <VStack spacing={8}>
        <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>
          Your Grocery
        </Text>
        {groceries.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No grocery found {" "}</Text>
				)}
        <SimpleGrid columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={20}
					w={"full"}>
          {groceries.map((grocery) => (
            <GroceryDisplay key={grocery._id} grocery={grocery}></GroceryDisplay>
          ))}
          </SimpleGrid> 
      </VStack>
      
    </Container>
  );
  
}

export default HomePage