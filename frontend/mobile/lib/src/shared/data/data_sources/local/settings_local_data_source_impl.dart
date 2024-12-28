import 'package:shared_preferences/shared_preferences.dart';

import '../../../../core/constants/local_storage_constants.dart';
import 'abstract_settings_local_data_source.dart';

class SettingsLocalDataSourceImpl implements AbstractSettingsLocalDataSource {
  final SharedPreferences sharedPreferences;

  SettingsLocalDataSourceImpl(this.sharedPreferences);

  @override
  Future<void> changeLanguage(String languageCode) async {
    try {
      await sharedPreferences.setString(
          LocalStorageConstants.languageCode, languageCode);
    } catch (e) {
      throw Exception(e);
    }
  }

  @override
  Future<String> fetchCurrentLanguageCode() async {
    try {
      final result =
          sharedPreferences.getString(LocalStorageConstants.languageCode);

      return result ?? 'en';
    } catch (e) {
      throw Exception(e);
    }
  }
}
