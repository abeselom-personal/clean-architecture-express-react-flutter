import 'package:shared_preferences/shared_preferences.dart';

import '../../../../../core/constants/local_storage_constants.dart';
import 'abstract_auth_local_data_source.dart';

class AuthLocalDataSourceImpl implements AbstractAuthLocalDataSource {
  final SharedPreferences sharedPreferences;

  AuthLocalDataSourceImpl(this.sharedPreferences);

  @override
  Future<void> cacheJwtToken(String jwtToken) async {
    try {
      await sharedPreferences.setString(LocalStorageConstants.jwtToken, jwtToken);
    } catch (e) {
      throw Exception(e);
    }
  }

  @override
  Future<String?> fetchJwtToken() async {
    try {
      final result = sharedPreferences.getString(LocalStorageConstants.jwtToken);
      return result;
    } catch (e) {
      throw Exception(e);
    }
  }
}