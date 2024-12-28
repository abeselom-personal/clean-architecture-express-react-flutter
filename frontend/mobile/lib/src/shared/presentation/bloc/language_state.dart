part of 'language_cubit.dart';

sealed class LanguageState extends Equatable {
  final Locale locale;
  const LanguageState(this.locale);

  @override
  List<Object> get props => [locale];
}

final class LanguageInitial extends LanguageState {
  const LanguageInitial(super.locale);

  @override
  List<Object> get props => [locale];
}

final class LanguageLoading extends LanguageState {
  const LanguageLoading(super.locale);

  @override
  List<Object> get props => [locale];
}

///language Fetched successfully
final class LanguageFetchSuccess extends LanguageState {
  const LanguageFetchSuccess(super.locale);

  @override
  List<Object> get props => [locale];
}

final class LanguageChangeSuccess extends LanguageState {
  const LanguageChangeSuccess(super.languageCode);

  @override
  List<Object> get props => [locale];
}

final class LanguageFailure extends LanguageState {
  final String errorMessage;
  const LanguageFailure(super.locale, this.errorMessage);

  @override
  List<Object> get props => [locale, errorMessage];
}
