import 'package:dartz/dartz.dart';

import '../../../../core/network/errors/failures.dart';

abstract class AbstractAuthRepository {
  /// signup
  Future<Either<Failure, Map<String, dynamic>>> signup({
    required String email,
    required String password,
    required String name,
  });

  /// login
  Future<Either<Failure, Map<String, dynamic>>> login({
    required String email,
    required String password,
  });

  /// fetch jwtToken
  Future<Either<Failure, String?>> fetchJwtToken();

  /// set jwtToken
  Future<Either<Failure, void>> cacheJwtToken(String jwtToken);
}