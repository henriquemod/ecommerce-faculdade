import { useState } from "react";
import { ImageBackground, ImageSourcePropType, View } from "react-native";
import PagerView from "react-native-pager-view";

type CarrierProps = {
  images: [ImageSourcePropType, ImageSourcePropType, ...ImageSourcePropType[]];
};

export const Carrier = ({ images }: CarrierProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = images.length;

  return (
    <View className="flex h-56 relative">
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {images.map((image, index) => (
          <View className="rounded-lg" key={index}>
            <ImageBackground
              borderRadius={6}
              className="h-full overflow-hidden"
              source={image}
              resizeMode="stretch"
            />
          </View>
        ))}
      </PagerView>
      <View className="absolute bottom-4 left-0 right-0 flex flex-row justify-center">
        {[...Array(totalPages)].map((_, index) => {
          const classNames = [
            "h-4 w-4 rounded-full mx-2",
            index === currentPage ? "bg-white" : "bg-gray-400",
          ];
          return <View key={index} className={classNames.join(" ")} />;
        })}
      </View>
    </View>
  );
};
