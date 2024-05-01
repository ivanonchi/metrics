import {
  Card,
  CardBody,
  CardHeader,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  StackDivider,
} from "@chakra-ui/react";

function MetricForm() {
  const postMetric = async (event: Event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      // Now you can safely use the form element
      const form: HTMLFormElement = event.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      try {
        await fetch("http://localhost:3000/metrics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formJson),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card>
      <CardHeader>Post event</CardHeader>
      <CardBody>
        <form method="post" onSubmit={postMetric}>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Value</FormLabel>
                <Input type="number" name="value" />
              </FormControl>
            </Box>
            <Box>
              <Button type="submit">Send</Button>
            </Box>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
}

export default MetricForm;
