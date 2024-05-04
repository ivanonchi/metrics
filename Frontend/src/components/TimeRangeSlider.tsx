import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Text,
} from "@chakra-ui/react";

export default function TimeRangeSlider({updateTimeRange, min, max, defaultFrom, defaultTo}) {
  return (
    <Box>
      <Text>Time range slider</Text>
      <RangeSlider
        aria-label={["from", "to"]}
        min={min}
        max={max}
        defaultValue={[defaultFrom, defaultTo]}
        onChangeEnd={updateTimeRange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
}
