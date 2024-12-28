abstract class AbstractAuthLocalDataSource {
  /// cache the jwt token
  Future<void> cacheJwtToken(String jwtToken);

  /// fetch the jwt token
  Future<String?> fetchJwtToken();
}