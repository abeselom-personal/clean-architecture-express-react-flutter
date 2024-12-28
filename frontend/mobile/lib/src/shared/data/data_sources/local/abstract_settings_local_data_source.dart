abstract class AbstractSettingsLocalDataSource {
  /// change the language of the app
  Future<void> changeLanguage(String languageCode);

  /// fetch the current language code
  Future<String> fetchCurrentLanguageCode();
}