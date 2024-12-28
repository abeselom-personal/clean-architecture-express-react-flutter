import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../features/auth/data/data_sources/local/auth_local_data_source_impl.dart';
import '../../features/auth/data/data_sources/remote/auth_remote_data_source_impl.dart';
import '../../features/auth/data/repositories/auth_repository_impl.dart';
import '../../features/auth/domain/repositories/abstract_auth_repository.dart';
import '../../features/auth/domain/usecases/cache_token_usecase.dart';
import '../../features/auth/domain/usecases/fetch_token_usecase.dart';
import '../../features/auth/domain/usecases/login_usecase.dart';
import '../../features/auth/domain/usecases/signup_usecase.dart';
import '../../features/auth/presentation/bloc/authentication_bloc/authentication_bloc.dart';
import '../../features/auth/presentation/bloc/login_bloc/login_bloc.dart';
import '../../features/auth/presentation/bloc/signup_bloc/signup_bloc.dart';
import '../../shared/data/data_sources/local/settings_local_data_source_impl.dart';
import '../../shared/data/repositories/settings_repository_impl.dart';
import '../../shared/domain/repositories/abstract_settings_repository.dart';
import '../../shared/domain/usecases/change_language_usecase.dart';
import '../../shared/domain/usecases/fetch_current_language_usecase.dart';
import '../../shared/presentation/bloc/language_cubit.dart';

final sl = GetIt.I;

Future<void> initAppInjections() async {
  ///local storage
  sl.registerSingleton<SharedPreferences>(await SharedPreferences.getInstance());

  ///network
  sl.registerSingleton<Dio>(Dio());

  ///data sources
  sl.registerSingleton<SettingsLocalDataSourceImpl>(SettingsLocalDataSourceImpl(sl<SharedPreferences>()));
  sl.registerSingleton<AuthLocalDataSourceImpl>(AuthLocalDataSourceImpl(sl<SharedPreferences>()));
  sl.registerSingleton<AuthRemoteDataSourceImpl>(AuthRemoteDataSourceImpl(sl<Dio>()));

  ///repositories
  sl.registerSingleton<SettingsRepositoryImpl>(SettingsRepositoryImpl(sl<SettingsLocalDataSourceImpl>()));
  sl.registerSingleton<AbstractSettingsRepository>(sl<SettingsRepositoryImpl>());
  sl.registerSingleton<AuthRepositoryImpl>(AuthRepositoryImpl(sl<AuthRemoteDataSourceImpl>(), sl<AuthLocalDataSourceImpl>()));
  sl.registerSingleton<AbstractAuthRepository>(sl<AuthRepositoryImpl>());

  ///use cases
  sl.registerSingleton<ChangeLanguageUseCase>(ChangeLanguageUseCase(sl<AbstractSettingsRepository>()));
  sl.registerSingleton<FetchCurrentLanguageUseCase>(FetchCurrentLanguageUseCase(sl<AbstractSettingsRepository>()));
  sl.registerSingleton<LoginUseCase>(LoginUseCase(sl<AbstractAuthRepository>()));
  sl.registerSingleton<SignupUseCase>(SignupUseCase(sl<AbstractAuthRepository>()));
  sl.registerSingleton<FetchTokenUseCase>(FetchTokenUseCase(sl<AbstractAuthRepository>()));
  sl.registerSingleton<CacheTokenUseCase>(CacheTokenUseCase(sl<AbstractAuthRepository>()));


  ///bloc and cubit
  sl.registerFactory<LanguageCubit>(() => LanguageCubit(sl<ChangeLanguageUseCase>(), sl<FetchCurrentLanguageUseCase>()));
  sl.registerFactory<LoginBloc>(() => LoginBloc(sl<LoginUseCase>()));
  sl.registerFactory<SignupBloc>(() => SignupBloc(sl<SignupUseCase>()));
  sl.registerFactory<AuthenticationBloc>(() => AuthenticationBloc(sl<FetchTokenUseCase>(), sl<CacheTokenUseCase>()));
}
