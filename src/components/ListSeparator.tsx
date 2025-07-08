import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
	size?: number;
}

const ListSeparator = ({ size }: Props) => {
	return <View style={{ height: size || 24 }} />;
};

export default ListSeparator;

const styles = StyleSheet.create({});
