import React from 'react';
import { ScrollView, View } from 'react-native';
import PaginationStep from './Step';
import type { IPagination } from './type';
let gs = <View {...{ style: { paddingStart: 8 } }} />;
export default function Pagination({ steps, activeIndex = 0 }: IPagination) {
  return (
    <View
      {...{
        style: { width: '100%' },
      }}
    >
      <ScrollView
        {...{
          horizontal: true,
          showsHorizontalScrollIndicator: false,
        }}
      >
        {gs}
        {steps.map(({ id, title }, index) => (
          <View {...{ key: id }}>
            <PaginationStep {...{ title, isDone: index <= activeIndex }} />
          </View>
        ))}
        {gs}
      </ScrollView>
    </View>
  );
}
