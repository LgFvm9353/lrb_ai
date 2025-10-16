import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Icon = ({ color, name, size, style}) => (
  <Ionicons name={name} size={size} color={color} style={style}/>
)

export default Icon;