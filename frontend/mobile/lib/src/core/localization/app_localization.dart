import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';

import '../../shared/domain/entities/app_language_entity.dart';

// List of supported languages
const List<AppLanguageEntity> supportedLanguages = [
  AppLanguageEntity(languageCode: "en", languageName: "English"),
  AppLanguageEntity(languageCode: "am", languageName: "አማርኛ"),
  AppLanguageEntity(languageCode: "ti", languageName: "ትግርኛ"),
  AppLanguageEntity(languageCode: "om", languageName: "Oromiffa"),
];

// AppLocalization class for managing translations
class AppLocalization {
  final Locale locale;
  late Map<String, String> _localizedValues;

  AppLocalization(this.locale);

  // Access localization instance via context
  static AppLocalization? of(BuildContext context) {
    return Localizations.of<AppLocalization>(context, AppLocalization);
  }

  // Default language code
  static const String defaultLanguageCode = "en";

  // Load language JSON file from assets
  Future<void> loadJson() async {
    final String languageFile = locale.countryCode == null
        ? locale.languageCode
        : "${locale.languageCode}-${locale.countryCode}";
    try {
      final String jsonString =
          await rootBundle.loadString('assets/languages/$languageFile.json');
      final Map<String, dynamic> mappedJson = json.decode(jsonString);

      _localizedValues =
          mappedJson.map((key, value) => MapEntry(key, value.toString()));
    } catch (e) {
      // Log or handle error; defaulting to an empty map
      _localizedValues = {};
    }
  }

  // Get translated value for a given key
  String getTranslatedValue(String key) {
    return _localizedValues[key] ?? key; // Return key if translation is missing
  }

  // Custom delegate for AppLocalization
  static const LocalizationsDelegate<AppLocalization> delegate =
      _AppLocalizationDelegate();
}

// Custom localization delegate
class _AppLocalizationDelegate extends LocalizationsDelegate<AppLocalization> {
  const _AppLocalizationDelegate();

  @override
  bool isSupported(Locale locale) {
    return supportedLanguages
        .any((lang) => lang.languageCode == locale.languageCode);
  }

  @override
  Future<AppLocalization> load(Locale locale) async {
    final AppLocalization localization = AppLocalization(locale);
    await localization.loadJson();
    return localization;
  }

  @override
  bool shouldReload(covariant LocalizationsDelegate<AppLocalization> old) {
    return false;
  }
}

// // Utility for managing app locale dynamically
// class LocaleManager extends ChangeNotifier {
//   Locale _currentLocale = const Locale(AppLocalization.defaultLanguageCode);
//
//   Locale get currentLocale => _currentLocale;
//
//   void changeLocale(String languageCode) {
//     _currentLocale = Locale(languageCode);
//     notifyListeners();
//   }
// }
