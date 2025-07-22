import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import React from 'react';
const merchantId = Constants.easConfig?.plugins?.find((p) => p[0] === "@stripe/stripe-react-native")?.[1].merchantIdentifier;


if (!merchantId) throw new Error("Missing identifire")
const ExpoStripePrivider = (props: Omit<React.ComponentProps<typeof StripeProvider>, "publishableKey" | "merchantIdentifier">) => {
    return (
        <StripeProvider publishableKey="pk_test_51RnYWgCjxPvvFWVWL1GH2IIqb2cf0b3PKYrb8zt30Q6Jr2epDjCscCimJt4HrIjQfmviNw81A7r8FKDfhTxWD1EX003EcDRTQu" merchantIdentifier={merchantId} urlScheme={Linking.createURL("/")?.split(":")[0]} {...props} />
    )
}

export default ExpoStripePrivider