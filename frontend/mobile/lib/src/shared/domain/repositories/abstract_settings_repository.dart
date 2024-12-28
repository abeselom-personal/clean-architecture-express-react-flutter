import 'package:dartz/dartz.dart';

import '../../../core/network/errors/failures.dart';

abstract class AbstractSettingsRepository {
  /// change language
  Future<Either<Failure, void>> changeLanguage(String languageCode);

  /// fetch current language
  Future<Either<Failure, String>> fetchCurrentLanguage();
}