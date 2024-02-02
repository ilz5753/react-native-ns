import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import type { TPaginationStep } from './type';
let ac = '#0079ff',
  dc = '#999999';
export default function PaginationStep({
  title,
  isDone = false,
}: TPaginationStep) {
  let c = useMemo(() => (isDone ? ac : dc), [isDone]);
  return (
    <View
      {...{
        style: {
          gap: 8,
          paddingHorizontal: 1.5,
        },
      }}
    >
      <Text
        {...{
          style: {
            fontSize: 16,
            color: c,
            paddingHorizontal: 8,
          },
        }}
      >
        {title}
      </Text>
      <View
        {...{
          style: {
            width: '100%',
            height: 4,
            borderRadius: 2,
            backgroundColor: c,
          },
        }}
      />
    </View>
  );
}
