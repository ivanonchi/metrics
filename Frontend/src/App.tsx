import {
  Center,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import MetricForm from "./MetricForm";

function App() {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"300px 1fr"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"} borderBottom="1px">
          <Center>
            <Heading>Event console</Heading>
          </Center>
        </GridItem>
        <GridItem pl="2" area={"nav"}>
          <MetricForm />
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          Main
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
