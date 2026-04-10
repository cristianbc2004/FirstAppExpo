import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// librerias para añadir animacion
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
// librerias para drag...
import { ImageSourcePropType } from 'react-native';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  // Valor animado para controlar el tamano del sticker.
  const scaleImage = useSharedValue(imageSize);

  // Valores animados para mover el sticker en el eje X e Y.
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gesto de doble tap.
  // Si el sticker no esta al doble de tamano, lo agranda.
  // Si ya esta agrandado, lo devuelve al tamano original.
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  // Estilo animado para el tamano de la imagen.
  // withSpring hace que el cambio de tamano sea suave.
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  // Gesto de arrastre.
  // Cada vez que el dedo se mueve, actualizamos la posicion X e Y.
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // Estilo animado para mover el contenedor del sticker.
  // transform aplica el desplazamiento horizontal y vertical.
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    // Este detector escucha el gesto de arrastre.
    <GestureDetector gesture={drag}>
      {/* Animated.View se mueve segun translateX y translateY */}
      <Animated.View style={[containerStyle, { top: -350 }]}>
        {/* Este detector escucha el doble tap sobre la imagen */}
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            // imageStyle anima el tamano.
            // El segundo objeto define el tamano base inicial.
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
