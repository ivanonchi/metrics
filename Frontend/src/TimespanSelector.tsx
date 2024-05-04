import { RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { useState } from "react";

export default function TimespanSelector(onChangeTimespan: {onChange: (value: string) => void}) {
  const [timespan, setTimespan] = useState("minute");

  const changeTimespan = (value: string) => {
    setTimespan(value);
    onChangeTimespan.onChange(timespan);
  }

  return (
    <RadioGroup onChange={changeTimespan} value={timespan}>
      <Stack direction="row">
        <Radio value="minute">Minute</Radio>
        <Radio value="hour">Hour</Radio>
        <Radio value="day">Day</Radio>
      </Stack>
    </RadioGroup>
  );
}
