import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenContainerProps = {
  children: ReactNode;
  scrollable?: boolean;
} & ScrollViewProps;

function screenContainer({ children, scrollable = false, ...scrollProps }: ScreenContainerProps) {
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      {...scrollProps}
    >
      <View className="flex-1 px-6 pb-8 pt-4">{children}</View>
    </ScrollView>
  ) : (
    <View className="flex-1 px-6 pb-8 pt-4">{children}</View>
  );

  return (
    <SafeAreaView className="flex-1 bg-mist">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.select({ ios: 'padding', default: undefined })}
      >
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ScreenContainer = screenContainer;

export { ScreenContainer, screenContainer };