import React, { useCallback, useRef } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { onScrollEvent } from 'react-native-redash';
import Animated from 'react-native-reanimated';

import MailList from './MailList';
import SearchBar from './SearchBar';

import ComposeButton from '@core/ComposeButton';

import { MailLabel } from '@core/types';

interface Props {
  selectedLabel: MailLabel;
}

const { Value, set, useCode, sub, onChange } = Animated;

const MailBox = ({ selectedLabel }: Props) => {
  const { navigate } = useNavigation();

  const scrollY = useRef(new Value(0)).current;
  const scrollYOffset = useRef(new Value(0)).current;
  const translationY = useRef(new Value(0)).current;

  const navigateToCompose = useCallback(() => navigate('Compose'), []);

  const handleScrollEnd = useCallback(() => {
    scrollYOffset.setValue(scrollY);
  }, [scrollYOffset, scrollY]);

  useCode(
    () => onChange(scrollY, [set(translationY, sub(scrollY, scrollYOffset))]),
    [],
  );

  return (
    <>
      <S.SafeArea />
      <S.Container>
        <SearchBar />
        <MailList
          selectedLabel={selectedLabel}
          onScroll={onScrollEvent({ y: scrollY })}
          onScrollEnd={handleScrollEnd}
        />
        <ComposeButton onPress={navigateToCompose} scrollY={translationY} />
      </S.Container>
    </>
  );
};

const S = {
  SafeArea: styled.SafeAreaView`
    background-color: ${({ theme: { colors } }) => colors.BACKGROUND};
  `,
  Container: styled.View`
    flex: 1;
    background-color: ${({ theme: { colors } }) => colors.BACKGROUND};
  `,
};

export default MailBox;
