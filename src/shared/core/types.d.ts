import React from 'react';
import { TextProps as DefaultTextProps } from 'react-native';
import fonts from '@styles/fonts';
import colors from '@styles/colors';

/**
 *
 * @Components
 * Typing for core components
 */

export type Theme = typeof colors.LIGHT_THEME;

/**
 *
 * @Types
 * Types for data
 */

export interface User {
  id: string;
  name: string;
  address: string;
}

export interface MailLabel {
  id: string;
  name: string;
  mailTotal: number;
  mailUnread: number;
  cosmetic: {
    icon: string;
    textColor: string;
    backgroundColor: string;
  };
}

export interface Mail {
  id: string;
  labelIds: string[];
  date: Date;
  from: MailAuthor;
  to: MailAuthor;
  subject: string;
  body: string;
}
