import 'package:equatable/equatable.dart';

class AppLanguageEntity extends Equatable {
  final String languageName;
  final String languageCode;

  const AppLanguageEntity({required this.languageCode, required this.languageName});

  @override
  List<Object> get props => [languageCode, languageName];
}