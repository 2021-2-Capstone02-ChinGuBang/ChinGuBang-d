import * as React from 'react';
import { WebView } from 'react-native-webview';


export default function PostCode(){
  return (
  <WebView source={{ uri: "http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false"
     }} style={{ marginTop: 10 }} />
     );
}