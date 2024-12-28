import '../../domain/entities/app_language_entity.dart';

class AppLanguageModel extends AppLanguageEntity {
  const AppLanguageModel({
    required super.languageCode,
    required super.languageName,
  });

  ///from entity to model
  factory AppLanguageModel.fromEntity(AppLanguageEntity entity) {
    return AppLanguageModel(
      languageCode: entity.languageCode,
      languageName: entity.languageName,
    );
  }
}
