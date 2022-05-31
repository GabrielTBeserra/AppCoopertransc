import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  margin: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: 'white';
`;

export const LineWithRow = styled(View)`
  margin-top: 15;
  flex-direction: 'column';
  align-items: 'center';
  justify-content: 'center';
`;

export const Line = styled(View)`
  flex-wrap: 'wrap';
  margin-top: 15;
  flex-direction: 'row';
  align-items: 'center';
  justify-content: 'space-between';
`;

export const Title = styled(View)`
  color: '#00433E';
  flex-direction: 'row';
  align-items: 'center';
  justify-content: 'space-between';
`;

export const TitleIcon = styled(View)`
  flex-direction: 'row';
  color: 'green';
`;

export const TitleText = styled(View)`
  margin-left: 5;
  color: '#00AC00';
  font-weight: 'bold';
  font-size: 14;
`;

export const TitleTextRecursed = styled(View)`
  margin-left: 5;
  color: 'red';
  font-weight: 'bold';
  font-size: 14;
`;
