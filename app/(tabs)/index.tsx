import { IOS_CLIENT_IDS, WEB_CLIENT_IDS } from "@/keys/keys";
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

const WEB_CLIENT_ID = WEB_CLIENT_IDS;
const IOS_CLIENT_ID = IOS_CLIENT_IDS;

type AuthUser = User | null;

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });

    const checkCurrentSignIn = async () => {
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser) setUserInfo(currentUser);
      } catch {
        setUserInfo(null);
      }
    };

    checkCurrentSignIn();
  }, []);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
    } catch (err: any) {
      switch (err.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          setError('Login cancelled.');
          break;
        case statusCodes.IN_PROGRESS:
          setError('Login already in progress.');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          setError('Play Services unavailable.');
          break;
        default:
          setError('Login failed: ' + err.message);
      }
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (err: any) {
      setError('Sign out failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-2xl font-bold text-neutral-800 mb-6">Google Login</Text>

      {loading && <ActivityIndicator size="large" className="mb-4" />}

      {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}

      {userInfo ? (
        <View className="items-center bg-gray-100 rounded-2xl p-6 shadow-md w-full max-w-sm">
          {userInfo.user.photo && (
            <Image source={{ uri: userInfo.user.photo }} className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500" />
          )}
          <Text className="text-lg font-semibold text-neutral-800">{userInfo.user.name}</Text>
          <Text className="text-sm text-neutral-500 mb-4">{userInfo.user.email}</Text>
          <TouchableOpacity onPress={signOut} className="bg-red-500 px-4 py-2 rounded-full">
            <Text className="text-white font-medium">Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={loading}
        />
      )}
    </View>
  );
};

export default LoginScreen;
