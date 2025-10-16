import {
  Text, View
} from 'react-native';
import Icon from './Icon';

const TabBarIcon = ({ focused, iconName, text }) => {
  return (
    <View>
      <Icon name={iconName} size={16} color={'#123'}/>
      <Text>{text}</Text>
    </View>
  )
}

export default TabBarIcon;