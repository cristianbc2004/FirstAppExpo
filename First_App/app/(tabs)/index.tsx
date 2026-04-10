import { View, StyleSheet, ImageSourcePropType } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// estas librerias se usaran para poder tener permisos y descargar cosas desde nuestra app
import { useEffect, useState, useRef} from 'react';
import * as MediaLibrary from 'expo-media-library'; // libreria para pedir permisos y guardar fotos en galeria del movil
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot'; // librerias para capturas


import Button from '@/components/button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';


const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
   const imageRef = useRef<View>(null); // se usa para guardar captura nada mas que de la foto.
  // Primer parametro ve el estado del permiso y ek segundo la funcion para pedirlo
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
  writeOnly: true,
});
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // Control if we show the buttons iniciales or the options of edition
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  // Controla si el modal del selector de emojis esta visible.
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  

  const pickImageAsync = async () => { // async, async fuction, give time to the user
    let result = await ImagePicker.launchImageLibraryAsync({ // this librery open the movil gallery
      mediaTypes: ['images'], // only photo is permit
      allowsEditing: true, // can cut the photo before insert in the page
      quality: 1, // calidad maxima permitida
    });

    if (!result.canceled) { // now is the user cancel selection
      setSelectedImage(result.assets[0].uri); // uri of the photo select
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  // Vuelve al estado inicial de la pantalla y oculta las opciones de edicion.
   const onReset = () => {
    setShowAppOptions(false);
  };

  // Abre el modal para que el usuario elija un emoji.
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  // Cierra el modal cuando el usuario pulsa cerrar o termina la seleccion.
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // con el granted nos aseguramos que tenemos ya permisos para entrar (ya viene en el propio objeto al importar esta variable)
  useEffect(() => {
  if (!permissionResponse?.granted) {
    requestPermission();
  }
}, [permissionResponse, requestPermission]);

  const onSaveImageAsync = async () => {
    try { // esto como puede fallar se pone con sus respecgtivos try-catch
      const localUri = await captureRef(imageRef, { // esta funcion hace una foto desde ese view 
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri); // esto lo guarda en la libreria del movil 
      if (localUri) { // si se obtiene la foto se avisa
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {/* Si ya estamos editando la imagen, mostramos las opciones extra.
          Si no, mostramos los botones iniciales para elegir o usar la foto. */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      {/* Mostramos el modal cuando isModalVisible es true.
          Dentro renderizamos la lista de emojis.
          Al elegir uno, guardamos el emoji y cerramos el modal.*/}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
