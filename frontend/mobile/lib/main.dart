import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'src/core/localization/app_localization.dart';
import 'src/core/routes/routes.dart';
import 'src/core/service_locator/service_locator.dart';
import 'src/core/theme/app_theme.dart';
import 'src/core/utils/helper.dart';
import 'src/features/auth/presentation/bloc/authentication_bloc/authentication_bloc.dart';
import 'src/features/auth/presentation/bloc/login_bloc/login_bloc.dart';
import 'src/features/auth/presentation/bloc/signup_bloc/signup_bloc.dart';
import 'src/shared/presentation/bloc/language_cubit.dart';
import 'src/shared/services/notification_service.dart';

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  if (message.data.isNotEmpty) {
    // await Firebase.initializeApp();
    NotificationService.instance.showFirebaseNotification(message);
  }
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initAppInjections();

  // await Firebase.initializeApp(
  //   options: DefaultFirebaseOptions.currentPlatform,
  // );
  /// Firebase Messaging background handling
  // FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  /// Initialize local notifications
  // NotificationService.instance.initialize();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<LanguageCubit>(create: (context) => sl<LanguageCubit>()),
        BlocProvider<AuthenticationBloc>(
            create: (context) =>
                sl<AuthenticationBloc>()..add(CheckAuthentication())),
        BlocProvider<LoginBloc>(create: (context) => sl<LoginBloc>()),
        BlocProvider<SignupBloc>(create: (context) => sl<SignupBloc>()),
      ],
      child: BlocBuilder<LanguageCubit, LanguageState>(
        builder: (context, localeState) {
          return MaterialApp(
            title: 'Clean Architecture Template',
            navigatorKey: Helper.navigatorKey,
            scaffoldMessengerKey: Helper.scaffoldMessengerKey,
            theme: appTheme,
            darkTheme: darkAppTheme,
            locale: localeState.locale,
            supportedLocales: supportedLanguages
                .map((language) => Locale(language.languageCode))
                .toList(),
            localizationsDelegates: const [
              AppLocalization.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            localeResolutionCallback: (locale, supportedLocales) {
              return supportedLocales.contains(locale)
                  ? locale
                  : const Locale('en');
            },
            onGenerateRoute: Routes.onGenerateRouted,
            initialRoute: Routes.auth,
          );
        },
      ),
    );
  }
}
