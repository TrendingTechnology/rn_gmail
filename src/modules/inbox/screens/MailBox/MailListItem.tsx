import React, { useCallback, memo } from 'react';
import styled, { css } from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';

import Text from '@core/Text';
import Icon from '@core/Icon';
import Pressable from '@core/Pressable';
import Flex from '@core/Flex';

import { Mail } from '@core/types';
import AuthorBadge from '@modules/inbox/components/AuthorBadge';

interface Props {
  mail: Mail;
  isSelected: boolean;
  setSelectedMails: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

const MailListItem = ({ mail, isSelected, setSelectedMails }: Props) => {
  const navigation = useNavigation();

  const toggleMailSelection = useCallback(() => {
    setSelectedMails((prev) => ({
      ...prev,
      [mail.id]: !prev[mail.id],
    }));
  }, []);

  return (
    <S.Container
      isSelected={isSelected}
      onPress={() => navigation.navigate('MailView')}
      onLongPress={toggleMailSelection}
    >
      <AuthorBadge
        onPress={toggleMailSelection}
        isSelected={isSelected}
        char={mail.from.name.charAt(0)}
      />

      <Flex flex={1}>
        <S.Row>
          {mail.labelIds.includes('2') && (
            <Icon name="label-variant" size="LARGE" color="QUATERNARY" />
          )}
          <S.Text style={{ flex: 1 }} type="title">
            {mail.from.name}
          </S.Text>
          <Text color="DARK" size="SMALL">
            {mail.date.toLocaleDateString()}
          </Text>
        </S.Row>

        <S.Row>
          <Flex flex={1}>
            <S.Text>{mail.subject}</S.Text>
            <S.Text>{mail.body}</S.Text>
          </Flex>
          <Icon
            onPress={() => {}}
            name={`star${mail.labelIds.includes('1') ? '' : '-outline'}`}
            size="LARGE"
            color={mail.labelIds.includes('1') ? 'QUATERNARY' : 'REGULAR'}
          />
        </S.Row>
      </Flex>
    </S.Container>
  );
};

const S = {
  Container: styled(Pressable)<{ isSelected: boolean }>`
    ${({ theme: { colors, metrics }, isSelected }) => css`
      width: 100%;
      flex-direction: row;
      margin-left: ${metrics.SMALLEST}px;
      margin-bottom: ${metrics.SMALLEST}px;
      padding: ${metrics.SMALL}px;
      border-radius: 10px;
      background-color: ${isSelected
        ? `${colors.PRIMARY}20`
        : colors.BACKGROUND};
    `}
  `,
  Row: styled.View`
    flex-direction: row;
    align-items: flex-end;
  `,
  Text: styled(Text).attrs({
    numberOfLines: 1,
    color: 'DARK',
  })`
    margin-right: ${({ theme: { metrics } }) => metrics.SMALLER}px;
  `,
};

export default memo(MailListItem);
