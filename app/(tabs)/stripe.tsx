import { useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as Linking from "expo-linking";
const payThem = async (amount: number) => {
    return fetch("http://localhost:8081/api/payment-sheet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
    }).then((res) => res.json())
}



const stripe = () => {
    const [amount, setamount] = useState<number>(100)
    const { initPaymentSheet, presentPaymentSheet } = useStripe()
    const [loading, setLoading] = useState(false)
    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer } = await payThem(Number(amount))
        const { error } = await initPaymentSheet({
            merchantDisplayName: "DEV",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,

            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: "jon doe",
                email: "programalltest@gmail.com",
                phone: "01111111111"
            },
            returnURL: Linking.createURL("stripe-redirect")
        });
        if (!error) setLoading(true)
    }
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet()

        if (error) {
            throw new Error("payment error", error)
        } else {
            Alert.alert("Success")
            setLoading(false)
        }
    }
    return (
        <View className='flex-1'>
            <SafeAreaView className='items-center justify-center px-5 flex-1'>
                <Text>${amount}</Text>
                <TouchableOpacity className='bg-blue-700 px-20 py-4' onPress={() => {
                    initializePaymentSheet()
                    openPaymentSheet()
                }} >
                    <Text className='text-2xl text-white'>pay</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default stripe