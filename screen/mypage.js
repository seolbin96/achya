import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const [name, setName] = useState('김민재');
  const [imageUri, setImageUri] = useState(null);
  const [totalPlans, setTotalPlans] = useState(3);
  const [successfulPlans, setSuccessfulPlans] = useState(2);
  const [resolution, setResolution] = useState(''); // 'resolution' 상태 추가
  const goalCompletion = totalPlans > 0 ? successfulPlans / totalPlans * 100 : 0;

  const handlePhotoUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Error', '사진 접근 권한이 필요합니다.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setImageUri(pickerResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileHeader}>내 프로필</Text>
      <TouchableOpacity onPress={handlePhotoUpload} style={styles.photoUploadButton}>
        <Image
          source={{ uri: imageUri || 'https://via.placeholder.com/120' }}
          style={styles.profilePic}
        />
        <Icon name="camera-alt" size={24} color="#B5D6AB" />
      </TouchableOpacity>
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={setName}
        editable={true}
      />
      <Text style={styles.completionText}>
        목표 달성률은 {goalCompletion.toFixed(2)}% 입니다
      </Text>
      <View style={styles.progressContainer}>
        <ProgressBar
          style={styles.progress}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={goalCompletion / 100}
        />
      </View>
      <Text style={styles.progressText}>
        아직 {totalPlans - successfulPlans}개의 할 일이 남아있어요!
      </Text>
      <Text style={styles.resolutionLabel}>나의 각오</Text>
      <TextInput
      style={styles.resolutionInput}
      placeholder="나의 각오"
      value={resolution}
      onChangeText={setResolution}
      editable={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Logout', '로그아웃 기능을 여기에 추가하세요.')}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  profileHeader: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photoUploadButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '90%',
    marginBottom: 10,
  },
  completionText: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'center',
  },
  progressContainer: {
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center', // 프로그레스 바를 가운데로 정렬
  },
  progress: {
    height: 20,
    width: '100%', // 프로그레스 바 너비 100%
    borderColor: '#B5D6AB',
  },
  progressText: {
    fontSize: 18,
    marginBottom: 10,
  },
  resolutionInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B5D6AB',
    padding: 10,
    width: '90%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B5D6AB',
    padding: 12,
    borderRadius: 25,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  resolutionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // 색상은 원하는 대로 조정할 수 있습니다.
    marginBottom: 5, // 텍스트와 입력 상자 사이의 간격 조정
  },
});

export default ProfileScreen;