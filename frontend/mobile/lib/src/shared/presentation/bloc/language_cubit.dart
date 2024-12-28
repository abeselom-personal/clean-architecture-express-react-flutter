import 'dart:ui';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

import '../../domain/usecases/change_language_usecase.dart';
import '../../domain/usecases/fetch_current_language_usecase.dart';

part 'language_state.dart';

class LanguageCubit extends Cubit<LanguageState> {
  final ChangeLanguageUseCase changeLanguageUseCase;
  final FetchCurrentLanguageUseCase fetchCurrentLanguageUseCase;

  LanguageCubit(this.changeLanguageUseCase, this.fetchCurrentLanguageUseCase)
      : super(LanguageInitial(Locale('en'))) {
    fetchCurrentLanguage();
  }

  Future<void> changeLanguage(String languageCode) async {
    emit(LanguageLoading(Locale(languageCode)));
    final result = await changeLanguageUseCase.call(languageCode);
    result.fold(
      (failure) =>
          emit(LanguageFailure(Locale(languageCode), failure.errorMessage)),
      (_) => emit(LanguageChangeSuccess(Locale(languageCode))),
    );
  }

  Future<void> fetchCurrentLanguage() async {
    emit(LanguageLoading(state.locale));
    final result = await fetchCurrentLanguageUseCase.call(null);
    result.fold(
      (failure) => emit(LanguageFailure(state.locale, failure.errorMessage)),
      (languageCode) => emit(LanguageFetchSuccess(Locale(languageCode))),
    );
  }
}
