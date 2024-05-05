import {
  Center,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import MetricForm from "./components/MetricForm";
import MetricsAveragesChart from "./components/MetricsAveragesChart";

function App() {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"300px 1fr"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"} borderBottom="1px">
          <Center>
            <Heading>Metrics console</Heading>
          </Center>
        </GridItem>
        <GridItem pl="2" area={"nav"}>
          <MetricForm />
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <MetricsAveragesChart />
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          <Center>&copy; {new Date().getFullYear()} Ivan Luque</Center>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
