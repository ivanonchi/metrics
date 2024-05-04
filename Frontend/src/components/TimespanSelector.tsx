import { Box, RadioGroup, Stack, Radio, Text, Center } from "@chakra-ui/react";
import { useState } from "react";

export default function TimespanSelector({ onChange }) {
  const [timespan, setTimespan] = useState("minute");

  const changeTimespan = (value: string) => {
    setTimespan(value);
    onChange(value);
  };

  return (
    <Box>
      <Text>Timespan selector</Text>
      <Center>
        <RadioGroup onChange={changeTimespan} value={timespan}>
          <Stack direction="row">
            <Radio value="minute">Minute</Radio>
            <Radio value="hour">Hour</Radio>
            <Radio value="day">Day</Radio>
          </Stack>
        </RadioGroup>
      </Center>
    </Box>
  );
}
