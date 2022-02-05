import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";

export const ParcelDetail = ({ parcelData }) => {
  return (
    <Boxed>
      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Registration Number
        </Text>
        <Text>{parcelData.REG_NUMBER}</Text>
      </Boxed>

      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Registration Date
        </Text>
        <Text>
          {parcelData.REG_DATE && moment(parcelData.REG_DATE).format("ll")}
        </Text>
      </Boxed>

      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Category
        </Text>
        <Text>{parcelData.CATEGORY}</Text>
      </Boxed>

      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Land Type
        </Text>
        <Text>{parcelData.LAND_TYPE}</Text>
      </Boxed>
      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Land Use
        </Text>
        <Text>{parcelData.LAND_USE}</Text>
      </Boxed>
      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Area
        </Text>
        <Text>
          {parcelData.Shape__Area &&
            formatCurrency(Math.round(parcelData.Shape__Area * 100) / 100)}{" "}
          sqr meter
        </Text>
      </Boxed>
    </Boxed>
  );
};
