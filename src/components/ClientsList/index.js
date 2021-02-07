import * as React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../styles';

function selectColor(value, key) {
  if(value.replace(',', '.')>0){
    if(key==0){return styles.valueClientPin}
    if(key==1){return "pushpino"}
    if(key==2){return styles.iconPin}
  }
  else {
    if(key==0){return styles.valueClientCheck}
    if(key==1){return "check"}
    if(key==2){return styles.iconCheck}
  }
}

export default function ClientsList({ data }) {
  const [open, setOpen] = React.useState(false);
  
  function selectTag() {
    let tag = data.tags[0];
    if(data.tags.length>1)
      tag = data.tags[0] + ', ' + data.tags[1];
    return tag;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ () => setOpen(true)} >
        {/*=============================TOP_ELEMENTS=========================*/}
        <View style={styles.containerElements}>
          <View style={styles.containerNameClient}>
            <Text style={styles.txtNameClient}>{data.name}</Text>
          </View>
          
          <View style={styles.containerValue}>
            <Text style={selectColor(data.value, 0)}>R$ {data.value}</Text>
          </View>
        </View>

        {/*=============================BOT_ELEMENTS=========================*/}
        <View style={styles.containerElements}>
          <View style={styles.containerTag}>
            <AntDesign name="tag" size={20} color={colors.black_pattern} style={styles.iconTag}/>
            <Text style={styles.txtTagClient}>{selectTag()}</Text>
          </View>

          <View style={styles.containerPin}>
            <AntDesign name={selectColor(data.value, 1)} size={15} style={selectColor(data.value, 2)}/>
          </View> 
        </View>
      </TouchableOpacity>


      <Modal animationType="slide" transparent={false} visible={open}>

      </Modal>
    </View>
  );
}
