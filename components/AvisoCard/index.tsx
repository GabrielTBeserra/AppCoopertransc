import * as React from 'react';
import WebView from "react-native-webview";
import IAviso from '../../types/IAviso';
import Card from '../Card';

type Props = {
  data: IAviso
}

const AvisoCard: React.FC<Props> = ({ data }) => (
  <Card>
    <WebView
      containerStyle={{ height: 350 }}
      source={{ html: data.mensagem }}
      textZoom={200}
      scrollEnabled
    />
  </Card>
);

export default AvisoCard;
